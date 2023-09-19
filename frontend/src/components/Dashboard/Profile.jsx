import React, { useState } from "react";
import { useAuth } from "../../utils/useAuth";
import { useEffect } from "react";
import PasswordModal from "./Password Modal";

function Profile() {
  const { auth } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    current_password: "",
  });

  const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false);

  const openPasswordModal = () => {
    setPasswordModalIsOpen(true);
  };

  const closePasswordModal = () => {
    setPasswordModalIsOpen(false);
  };

  console.log(auth.user.email);
  console.log(auth.user.id);

  const handleEditClick = () => {
    setEditing(true);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const jwtToken = auth.token;

      try {
        const response = await fetch(`/api/users/${auth.user.id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          // Handle error when fetching profile data
          console.error("Error fetching profile data", response.status);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    if (auth.isAuthenticated) {
      fetchProfileData();
    }
  }, [auth.isAuthenticated, auth.user.id]);

  const handleUpdate = () => {
    const jwtToken = auth.token;

    const updatedData = {
      username: updatedProfile.username,
      email: updatedProfile.email,
      password: updatedProfile.password,
    };

    console.log("Updated Data:", updatedData);

    fetch(`/api/users/${auth.user.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
        setProfileData(data);
        setEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div>
      <div>
        {editing ? (
          <div>
            <h2>Edit Your Profile</h2>
            <form onSubmit={handleUpdate}>
              <label>
                Username:
                <input
                  className="text-black"
                  type="text"
                  value={auth.user.username}
                  onChange={(e) =>
                    setUpdatedProfile({
                      ...updatedProfile,
                      username: e.target.value,
                    })
                  }
                />
              </label>
              <br />
              <label>
                Email:
                <input
                  className="text-black"
                  type="text"
                  value={auth.user.email}
                  onChange={(e) =>
                    setUpdatedProfile({
                      ...updatedProfile,
                      email: e.target.value,
                    })
                  }
                />
              </label>
              <br />
              <br />
              <button type="submit">Update</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </form>
          </div>
        ) : (
          <div>
            <h2>Welcome to your profile, {auth.user.username}!</h2>
            <p>Email: {auth.user.email}</p>
            <button onClick={handleEditClick}>Edit My Profile</button>
            <button onClick={openPasswordModal}>Change password</button>
          </div>
        )}
        <PasswordModal
          isOpen={passwordModalIsOpen}
          onRequestClose={closePasswordModal}
        />
      </div>
    </div>
  );
}

export default Profile;

import { useAtom } from "jotai";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode"; // Import jwt-decode

import { authAtom } from "./authAtom";

export const useAuth = () => {
  const [auth, setAuth] = useAtom(authAtom);

  const jwtToken = Cookies.get("token");

  if (jwtToken && !auth.isAuthenticated) {
    try {
      const decodedToken = jwt_decode(jwtToken);

      fetch(`/api/users/${decodedToken.sub}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          setAuth({
            isAuthenticated: true,
            user: userData,
            token: jwtToken,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  }

  const handleLogout = () => {
    const authToken = Cookies.get("token");
    const jwtToken = authToken ? authToken.split(" ")[1] : null;

    if (jwtToken) {
      fetch("/api/users/sign_out", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then(() => {
          Cookies.remove("token");
          setAuth({
            isAuthenticated: false,
            user: null,
            token: null,
          });
        })
        .catch((error) => {
          console.error("Error logging out:", error);
        });
    } else {
      setAuth({
        isAuthenticated: false,
        user: null,
        token: null,
      });
    }
  };

  return {
    auth,
    handleLogout,
    setAuth,
  };
};

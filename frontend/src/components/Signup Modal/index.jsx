import Modal from "react-modal";
import SignupForm from "./SignupForm";
import { RiCloseCircleLine } from "react-icons/ri";

const SignupModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Signup Modal"
      className="custom-modal"
    >
      <SignupForm onSignupSuccess={onRequestClose} />
      <div className="modal-actions">
        <button
          onClick={onRequestClose}
          className="hover:underline decoration-accent mt-2 cursor-pointer bouncey mb-3"
          style={{ fontSize: "22px" }}
        >
          <RiCloseCircleLine />
        </button>
      </div>
    </Modal>
  );
};

export default SignupModal;

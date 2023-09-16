import Modal from "react-modal";
import LoginForm from "./LoginForm";

const LogInModal = ({ isOpen, onRequestClose }) => {
  const handleLoginSuccess = () => {
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login/Signup Modal"
      className="ReactModal__Body--open"
    >
      <LoginForm onLoginSuccess={handleLoginSuccess} />
      <div className="modal-actions">
        <button
          onClick={onRequestClose}
          className="bg-secondary dark:bg-primary text-white dark:text-black border border-black font-bold text-sm py-2 px-4 rounded-xl"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default LogInModal;

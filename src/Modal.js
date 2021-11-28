const Modal = ({ wpm, closeModal }) => {
  return (
    <div className="result-modal">
      <div className="overlay" />
      <div className="result-modal-content">
        <h3>{`You typed at ${wpm.toFixed(2)} WPM`}</h3>
        <button className="close-modal" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};
export default Modal;

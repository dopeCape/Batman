import React, { useState } from "react";

const PopupButton: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      {showPopup && (
        <div className="popup">
          <p>This is a popup!</p>
          <button onClick={() => setShowPopup(false)}>Close the button</button>
        </div>
      )}
      <style jsx>{`
        .popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          border: 1px solid gray;
        }
      `}</style>
    </div>
  );
};

export default PopupButton;

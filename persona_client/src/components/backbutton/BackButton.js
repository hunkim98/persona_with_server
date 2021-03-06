import React from 'react';
import './BackButton.css';

function BackButton({ goToBack }) {
  return (
    <>
      <div className="button_container">
        <div onClick={goToBack}>
          <svg
            className="back_button"
            xmlns="http://www.w3.org/2000/svg"
            width="136.75"
            height="109.89"
            viewBox="0 0 136.75 109.89"
          >
            <path d="M.37,53.06a5.18,5.18,0,0,0-.17.56,5.37,5.37,0,0,0-.17,1c0,.12,0,.24,0,.37s0,.24,0,.36a5.37,5.37,0,0,0,.17,1,5.18,5.18,0,0,0,.17.56c0,.07.08.14.11.21a5.38,5.38,0,0,0,.36.67s0,0,0,0,.14.16.2.24.26.34.42.5a4.83,4.83,0,0,0,.49.41c.09.06.16.14.25.2l0,0h0L76.45,109a5,5,0,0,0,7.35-6.2L64.55,60h67.2a5,5,0,0,0,0-10H65.52L83.84,7A5,5,0,0,0,76.45.85L2.27,50.76h0l0,0A1.78,1.78,0,0,0,2,51a3.56,3.56,0,0,0-.48.39,4.84,4.84,0,0,0-.42.5c-.06.09-.14.16-.2.24v0a5.38,5.38,0,0,0-.36.67C.45,52.92.4,53,.37,53.06ZM42.68,35.63,49.1,50H21.39ZM21.39,60h29L43.92,75.1Zm31,20.83L57.52,68.7,67.52,91Zm4.91-37L51.1,30,68,18.58Z" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default BackButton;

import React from 'react';

const SpinnerElement = props => {
  let spinnerStyle = {
    width: "4rem",
    height: "4rem"
  };

  if (props.show) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" style={spinnerStyle} role="status">
          <span className="sr-only">Cargando...</span>
        </div>
      </div>
    );
  } else {
    return "";
  }
};

export default SpinnerElement;

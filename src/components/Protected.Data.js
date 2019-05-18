/**
 * Este archivo será usado para buscar las preguntas guardadas previamente.
 */

import React from "react";

const CardData = props => {
  let typeText = "";
  if (props.type === "open") {
    typeText = "Pregunta Abierta";
  } else if (props.type === "yes_no") {
    typeText = "Pregunta Si/No";
  }

  let className = typeof props.className !== "undefined" ? props.className : "";

  return (
    <div className="col-md-4 my-3">
      <div className={className + " card"}>
        <h5 className="card-header">{typeText}</h5>
        <div className="card-body">
          <h5 className="card-title text-muted">{props.text}</h5>
        </div>
        <div className="card-footer text-muted d-flex justify-content-between">
          <button className="btn btn-primary btn-sm">
            <i className="fas fa-edit" />
          </button>
          <button className="btn btn-danger btn-sm ">
            <i className="fas fa-trash-alt" />
          </button>
        </div>
      </div>
    </div>
  );
};

function ProtectedData(props) {
  return (
    <React.Fragment>
      <div className="row">
        {props.formData.map((data, index) => {
          return (
            <CardData
              key={index}
              className="border-success"
              text={data.text_field}
              type={data.type_field}
            />
          );
        })}
        {props.savedFormData.map((data, index) => {
          return (
            <CardData
              key={index}
              text={data.text_field}
              type={data.type_field}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default ProtectedData;

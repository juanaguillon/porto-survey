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
    <div className="col-md-4">
      <div className={className + " card"}>
        <h5 className="card-header">{props.text}</h5>
        <div className="card-body">
          <h5 className="card-title text-muted">{typeText}</h5>
          <button className="btn btn-primary btn-sm">&#10005;</button>
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
              text={data.text_field}
              type={data.type_field}
            />
          );
        })}
        {props.savedFormData.map((data, index) => {
          return (
            <CardData
              key={index}
              className="border-success"
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

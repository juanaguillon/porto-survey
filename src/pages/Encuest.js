import React from "react";
import HttpClass from "../services/Http";
import * as $ from "jquery";

import "./Encuest.css";

const LiItem = props => {
  return (
    <li className="list-group-item">
      <span className="text-dark">{props.keyVal.replace(/-/g, " ")}</span>
      <span className="text-muted">{props.valVal}</span>
    </li>
  );
};

const SingleQuestion = props => {
  /** Preguntas / Respuestas Estáticas */
  let staticQ = props.dataEncuest;
  /** Preguntas / Respuestas Dinámicas */
  let dynamicQArr = staticQ.data_encuest;
  let dynamicQHTML = [staticQ.data_encuest];

  let fullName = staticQ.full_name + " " + staticQ.full_lastname;

  // Obtener el tipo de medio usado.
  let medio = "";
  switch (staticQ.full_medio) {
    case "red_social":
      medio = "Red Social";
      break;
    case "referido":
      medio = "Referido";
      break;
    case "publicidad":
      medio = "Publicidad";
      break;

    default:
      medio = staticQ.full_medio;
      break;
  }

  for (let keyDynamic in dynamicQArr) {
    dynamicQHTML.push(
      <LiItem keyval={keyDynamic} valVal={dynamicQArr[keyDynamic]} />
    );

  }

  return (
    <React.Fragment>
      <div className="card">
        <a
          className="collapsed no-underline"
          aria-expanded="false"
          aria-controls="collapseOne"
          href="#collapseOne"
          onClick={props.handleCollapse.bind(null, staticQ.id)}
        >
          <div className="card-header d-flex justify-content-between">
            <h5 className="mb-0 text-success">{fullName}</h5>
            <span className="text-muted font-2">{staticQ.created_at}</span>
          </div>
        </a>

        <div id={"collapse_" + staticQ.id} className="collapse">
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="text-dark">Email: </span>
                <span className="text-muted">{staticQ.full_email}</span>
              </li>
              <li className="list-group-item">
                <span className="text-dark">Teléfono: </span>
                <span className="text-muted">{staticQ.full_phone}</span>
              </li>
              <li className="list-group-item">
                <span className="text-dark">Residencia: </span>
                <span className="text-muted">{staticQ.full_address}</span>
              </li>
              <li className="list-group-item">
                <span className="text-dark">Medio: </span>
                <span className="text-muted">{medio}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

/**
 * Mostrar todas las encuestas creadas.
 */

class EncuestData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      // Se guardarán las preguntas dinámicas.
      strucureQuestions: []
    };
  }

  componentDidMount() {
    let http = new HttpClass();
    http.get("question/all").then(all => {
      this.setState({
        data: all
      });
    });

    http.get("structure/all").then(response => {
      this.setState({ strucureQuestions: response });
    });
  }

  handleCollapse = data => {
    $("#collapse_" + data).toggleClass("show");
  };

  render() {
    return (
      <React.Fragment>
        <section className="section">
          {this.state.data.map(singleQuestion => {
            return (
              <SingleQuestion
                key={singleQuestion.id}
                dataEncuest={singleQuestion}
                handleCollapse={this.handleCollapse.bind(this)}
              />
            );
          })}
        </section>
      </React.Fragment>
    );
  }
}

export default EncuestData;

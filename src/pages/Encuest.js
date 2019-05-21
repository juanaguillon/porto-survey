import React from "react";
import HttpClass from "../services/Http";
import * as $ from "jquery";

import "./Encuest.css";

// Componentes
import SpinnerElement from "../components/General/Spinner.Element";
import AlertElement from "../components/General/Alert.Element";

const LiItem = props => {
  let valueProp = "";
  if (props.valVal === "true" || props.valVal === "false") {
    valueProp = props.valVal === "true" ? "Si" : "No";
  } else {
    valueProp = props.valVal;
  }
  return (
    <li className="list-group-item">
      <span className="text-dark text-capitalize">
        {props.keyVal.replace(/-/g, " ")}:{" "}
      </span>
      <span className="text-muted">{valueProp}</span>
    </li>
  );
};

const SingleQuestion = props => {
  /** Preguntas / Respuestas Estáticas */
  let staticQ = props.dataEncuest;
  /** Preguntas / Respuestas Dinámicas */
  let dynamicQArr = staticQ.data_encuest;
  /** HTML a ser mostrado */
  let dynamicQHTML = [];

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
      <LiItem keyVal={keyDynamic} valVal={dynamicQArr[keyDynamic]} />
    );
  }

  return (
    <React.Fragment>
      <div className="card my-1">
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
              {dynamicQHTML}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

/**
 * Class: Mostrar todas las encuestas creadas.
 */
class EncuestData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      notFound: false
    };
  }

  componentDidMount() {
    let http = new HttpClass();
    http.get("question/all").then(all => {
      console.log(all);
      if (all.length < 1) {
        this.setState({
          notFound: true
        });
      }
      this.setState({
        loading: false,
        data: all
      });
    });
  }

  handleCollapse = data => {
    $("#collapse_" + data).toggleClass("show");
  };

  render() {
    return (
      <React.Fragment>
        <section className="section">
          <SpinnerElement show={this.state.loading} />
          <AlertElement show={this.state.notFound} >
            No se han encontrado preguntas.
          </AlertElement>

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

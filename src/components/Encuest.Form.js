/**
 * Formulario de encuesta
 * RUTA: /create
 */
import React from "react";
import HttpClass from "../services/Http";
import "./Encuest.Form.css";

// Componentes
import AlertElement from "./General/Alert.Element";
import ModalElement from "./General/Modal.Element";

import logo from "../images/logo_porto.svg";

import StarRatingComponent from "react-star-rating-component";

/** Mostrar la estructura de una pregunta única guardada en la base de datos.
 * Debe ser necesario pasar el prop typeQuestion ( Si es abierta o cerrada la pregunta) y textQuiestion (El texto que será mostrado en el label).
 */
const SingleEncuest = props => {
  return (
    <React.Fragment>
      <div className="form-group">
        <label className="text-white">{props.textQuestion}</label>
        {props.typeQuestion === "yes_no" ? (
          <React.Fragment>
            <div className="custom-control custom-radio">
              <input
                type="radio"
                id={props.idQuestion + "yes"}
                name={props.textQuestion.replace(/ /g, "-").toLowerCase()}
                className="custom-control-input"
                onChange={props.change}
                value="true"
              />
              <label
                className="custom-control-label text-white"
                htmlFor={props.idQuestion + "yes"}
              >
                Si
              </label>
            </div>
            <div className="custom-control custom-radio">
              <input
                type="radio"
                id={props.idQuestion + "no"}
                name={props.textQuestion.replace(/ /g, "-").toLowerCase()}
                className="custom-control-input"
                onChange={props.change}
                value="false"
              />
              <label
                className="custom-control-label text-white"
                htmlFor={props.idQuestion + "no"}
              >
                No
              </label>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <input
              type="text"
              name={props.textQuestion.replace(/ /g, "-").toLowerCase()}
              className="form-control"
              onChange={props.change}
            />
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

class EncuestForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      text_alert: "",
      // Comprobar valores correctos del formulario
      show_alert: false,
      // Tipo de alerta, success si se envia, danger si hay problema con la comprobacion de valores en el formulario
      alert_type: "danger"
    };
  }

  componentWillMount() {
    this.__getStructureQuestionsFromDatabase().then(data =>
      // Guardando las estructuras en la variable de estado "Questions"
      this.setState({ questions: data })
    );
  }



  /**
   * Obtener todas las estructuras de preguntas desde la base de datos.
   * */
  async __getStructureQuestionsFromDatabase() {
    let http = new HttpClass();
    return await http.get("structure/all").then(response => response);
  }

  handleChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCloseModal = e => {
    this.setState({ show_alert: false });
  };

  /**
   * Actuar cuando se haga submit en el formulario de encuesta
   */
  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.full_name || this.state.full_name === "") {
      this.setState({
        show_alert: true,
        text_alert: "El nombre es requerido."
      });
    } else if (!this.state.full_lastname || this.state.full_lastname === "") {
      this.setState({
        show_alert: true,
        text_alert: "El apellido es requerido."
      });
    } else if (!this.state.full_email || this.state.full_email === "") {
      this.setState({
        show_alert: true,
        text_alert: "El email es requerido"
      });
    } else if (!this.state.full_phone || this.state.full_phone === "") {
      this.setState({
        show_alert: true,
        text_alert: "El Teléfono es requerido"
      });
    } else if (this.state.full_phone && this.state.full_phone.length < 7) {
      this.setState({
        show_alert: true,
        text_alert: "El número de teléfono no es correcto."
      });
    } else if (
      !this.state.full_medio ||
      this.state.full_medio === "" ||
      this.state.full_medio === "null"
    ) {
      this.setState({
        show_alert: true,
        text_alert:
          "Por favor, escoja un medio por el cual, ha llegado al porto."
      });
    } else {
      let http = new HttpClass();

      http.post("question/create", this.state).then(response => {
        console.log(response);
        if (response) {
          this.setState({
            show_alert: true,
            text_alert:
              "Se ha guardado correctamente. Gracias por responder esta encuesta.",
            alert_type: "success"
          });

          document.getElementById("encuest_form").reset();
        } else {
          this.setState({
            show_alert: true,
            text_alert: "Error al guardar la encuesta, intente nuevamente",
            alert_type: "danger"
          });
        }
      });
    }
  };

  handleStart(e, f, n){
    console.log(e, f, n)
    this.setState({
      [n]: e
    });
  }

  render() {
    return (
      <React.Fragment>
        <ModalElement
          close={this.handleCloseModal}
          id="modal_alert"
          show={this.state.show_alert}
        >
          <AlertElement
            id="alerting_show"
            show={this.state.show_alert}
            type={this.state.alert_type}
          >
            {this.state.text_alert}
          </AlertElement>
        </ModalElement>

        <section className="section" id="section_encuest_form">
          <div className="form-container">
            <div className="logo_container">
              <img src={logo} alt="Logo Porto" className="logo_porto" />
            </div>
            <form id="encuest_form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label className="text-white" htmlFor="full_name">
                  Nombres
                </label>
                <input
                  onChange={this.handleChangeInput}
                  type="text"
                  name="full_name"
                  id="full_name"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="text-white" htmlFor="full_lastname">
                  Apellidos
                </label>
                <input
                  onChange={this.handleChangeInput}
                  type="text"
                  name="full_lastname"
                  id="full_lastname"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="text-white" htmlFor="full_email">
                  Email
                </label>
                <input
                  onChange={this.handleChangeInput}
                  type="email"
                  name="full_email"
                  id="full_email"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="text-white" htmlFor="full_phone">
                  Teléfono
                </label>
                <input
                  onChange={this.handleChangeInput}
                  type="number"
                  name="full_phone"
                  id="full_phone"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="text-white" htmlFor="full_address">
                  Barrio donde Reside
                </label>
                <input
                  onChange={this.handleChangeInput}
                  type="text"
                  name="full_address"
                  id="full_address"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="text-white" htmlFor="full_medio">
                  Medio por el cual llegó al Porto
                </label>
                <select
                  className="custom-select"
                  name="full_medio"
                  id="full_medio"
                  onChange={this.handleChangeInput}
                >
                  <option value="null">Seleccione...</option>
                  <option value="red_social">Redes Sociales</option>
                  <option value="referido">Referido</option>
                  <option value="publicidad">Publicidad de Empresa</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label className="text-white">
                  Califique el porto de 1 a 5. Siendo 1 menor calificación y
                  5 la mayor calificación.
                </label>
                <StarRatingComponent
                  name="rating"
                  emptyStarColor="#fff5e8"
                  onStarClick={this.handleStart.bind(this)}
                />
              </div>
              {this.state.questions.map(question => {
                return (
                  <SingleEncuest
                    idQuestion={question.id}
                    key={question.id}
                    typeQuestion={question.type_field}
                    textQuestion={question.text_field}
                    change={this.handleChangeInput.bind(this)}
                  />
                );
              })}
              <div className="form-group">
                <input
                  type="submit"
                  id="submit_encuest_form"
                  value="Enviar"
                  className="btn btn-porto"
                />
              </div>
            </form>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default EncuestForm;

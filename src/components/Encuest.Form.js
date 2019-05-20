import React from "react";
import HttpClass from "../services/Http";
import './Encuest.Form.css';

/** Mostrar la estructura de una pregunta única guardada en la base de datos.
 * Debe ser necesario pasar el prop typeQuestion ( Si es abierta o cerrada la pregunta) y textQuiestion (El texto que será mostrado en el label).
 */
const SingleEncuest = props => {
  return (
    <React.Fragment>
      <div className="form-group">
        <label>{props.textQuestion}</label>
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
                className="custom-control-label"
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
                className="custom-control-label"
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
      questions: []
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

  /**
   * Actuar cuando se haga submit en el formulario de encuesta
   */
  handleSubmit = e => {
    e.preventDefault();
    let http = new HttpClass();

    delete this.state.questions;

    http.post("question/create", this.state).then(f => console.log(f));
  };

  render() {
    return (
      <section className="section" id="section_encuest_form">
        <div className="form-container">
          <form id="encuest_form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="full_name">Nombre Completo</label>
              <input 
                onChange={this.handleChangeInput}
                type="text"
                name="full_name"
                id="full_name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="full_lastname">Apellidos Completos</label>
              <input 
                onChange={this.handleChangeInput}
                type="text"
                name="full_lastname"
                id="full_lastname"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="full_email">Email</label>
              <input 
                onChange={this.handleChangeInput}
                type="email"
                name="full_email"
                id="full_email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="full_phone">Teléfono</label>
              <input 
                onChange={this.handleChangeInput}
                type="number"
                name="full_phone"
                id="full_phone"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="full_address">Barrio donde Reside</label>
              <input 
                onChange={this.handleChangeInput}
                type="text"
                name="full_address"
                id="full_address"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="full_medio">
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
                value="Guardar encuesta"
                className="btn btn-success"
              />
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default EncuestForm;

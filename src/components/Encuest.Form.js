import React from "react";
import HttpClass from "../services/Http";

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
                name={"response_" + props.idQuestion}
                className="custom-control-input"
                onChange={props.change}
              />
              <label className="custom-control-label" htmlFor={props.idQuestion + "yes"}>
                Si
              </label>
            </div>
            <div className="custom-control custom-radio">
              <input
                type="radio"
                id={props.idQuestion + "no"}
                name={"response_" + props.idQuestion}
                className="custom-control-input"
                onChange={props.change}
              />
              <label className="custom-control-label" htmlFor={props.idQuestion + "no"}>
                No
              </label>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <input
              type="text"
              name={"response_" + props.idQuestion}
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
      this.setState({ questions: data })
    );
  }

  async __getStructureQuestionsFromDatabase() {
    let http = new HttpClass();
    return await http.get("structure/all").then(response => response);
  }

  handleChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state)
  }

  render() {
    return (
      <section className="section" id="section_encuest_form">
        <form id="encuest_form" onSubmit={this.handleSubmit}>
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
      </section>
    );
  }
}

export default EncuestForm;

import React from "react";

// Componentes
import AlertElement from "./General/Alert.Element";

class ProtectedForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text_field: "",
      type_field: "",
      // Texto de alerta
      text_alert: "",
      // Comprobación de campos correctos
      errorSubmit: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.text_field === "") {
      this.setState({
        error: true,
        text_alert: "El texto de pregunta no puede ser vacio."
      });
    } else if (
      this.state.type_field === "not_selected" ||
      this.state.type_field === ""
    ) {
      this.setState({
        error: true,
        text_alert: "El tipo de pregunta no puede ser vacio."
      });
    } else {
      this.setState({
        error: false
      });
      let data = {
        text_field: this.state.text_field,
        type_field: this.state.type_field
      };
      // Ver Pages/protected para el comportamiento de esta función
      this.props.formData(data);
    }
  };

  handleInputChange = e => {
    let name = e.target.name;
    let val = e.target.value;
    this.setState({
      [name]: val
    });
  };

  render() {
    return (
      <section className="section">
        <AlertElement type="danger" show={this.state.error}>
          {this.state.text_alert}
        </AlertElement>
        <h3>Agregar Pregunta</h3>
        <form id="form_questions" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="question_text">Texto de pregunta</label>
            <input
              type="text"
              className="form-control"
              id="question_text"
              name="text_field"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="question_type">Tipo de pregunta</label>
            <select
              id="question_type"
              name="type_field"
              className="custom-select"
              onChange={this.handleInputChange}
              defaultValue="not_selected"
            >
              <option value="not_selected">(Vacio)</option>
              <option value="open">Abierta</option>
              <option value="yes_no">Si / No</option>
            </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Guardar" className="btn btn-success" />
          </div>
        </form>
        <h3>Preguntas actuales</h3>
      </section>
    );
  }
}

export default ProtectedForm;

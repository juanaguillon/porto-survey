import React from 'react';

class ProtectedForm extends React.Component {

  constructor( props ){
    super(props);

    this.state = {
      text_field: "",
      type_field: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.formData(this.state);
  }


  handleInputChange = e => {

    let name = e.target.name;
    let val = e.target.value;
    
    this.setState({
      [name]: val
    })
  }
  

  render(){
    return (
      <section className="section">
        <h3>Agregar Pregunta</h3>
        <form id="form_questions" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="question_text" />
            <input
              type="text"
              className="form-control"
              id="question_text"
              name="text_field"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="question_type" />
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
            <input
              type="submit"
              value="Guardar"
              className="btn btn-success"
            />
          </div>
        </form>

        <h3>Preguntas actuales</h3>
      </section>
    );
  }
  
}

export default ProtectedForm;
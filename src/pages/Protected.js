import React from "react";
import ProtectedData from "../components/Protected.Data";
import ProtectedForm from "../components/Protected.Form";

import HttpClass from "../services/Http";

class Protected extends React.Component {
  state = {
    formData: [],
    savedFormData: []
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    /**
     * Este proceso será lanzado para mostrar los guardados anteriormente.
     * */
    this.__getStructureQuestionsFromDatabase().then(data => {
      this.setState({
        savedFormData: data
      });
    });
  }

  /**
   * Obtener la estructura de preguntas desde la base de datos.
   */
  async __getStructureQuestionsFromDatabase() {
    let http = new HttpClass();
    return await http.get("structure/all").then(response => response);
  }

  /**
   * Obtener la informacion de el formumario protected y guardarla en la base de datos por medio de API.
   * @param data Serán los datos que se envian desde el formulario Protected
   */
  saveFormData(data) {
    let http = new HttpClass();
    http
      .post("structure/create", data)
      .then(response => {
        if (
          typeof response.status !== "undefined" &&
          response.status === "success"
        ) {
          let currentFormData = this.state.formData;
          currentFormData.unshift(response.last_saved);
          this.setState({
            formData: currentFormData
          });
        } else {
          alert(response);
        }
      })
      .catch(erro => {
        console.log(erro);
      });
  }

  render() {
    return (
      <React.Fragment>
        <ProtectedForm formData={this.saveFormData.bind(this)} />
        <ProtectedData
          savedFormData={this.state.savedFormData}
          formData={this.state.formData}
        />
      </React.Fragment>
    );
  }
}

export default Protected;

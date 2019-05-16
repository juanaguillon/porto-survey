import React from "react";
import ProtectedData from "../components/Protected.Data";
import ProtectedForm from "../components/Protected.Form";

import HttpClass from "../services/Http";

class Protected extends React.Component {
  state = {
    formData: {}
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  /**
   * Obtener la informacion de el formumario protected y guardarla en la base de datos por medio de API.
   * @param data Serán los datos que se envian desde el formulario Protected
   */
  saveFormData(data) {
    let http = new HttpClass();
    http.post("structure/create", data).then(response => {
      if (
        typeof response.status !== "undefined" &&
        response.status === "success"
      ) {
        this.setState({
          formData: response
        });
      } else {
        console.log(response);
      }
    })
    .catch( erro => {
      console.log( erro );
    })
  }

  render() {
    return (
      <React.Fragment>
        <ProtectedForm formData={this.saveFormData.bind(this)} />
        <ProtectedData formData={this.state.formData} />
      </React.Fragment>
    );
  }
}

export default Protected;

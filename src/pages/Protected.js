import React from "react";
import ProtectedData from "../components/Protected.Data";
import ProtectedForm from "../components/Protected.Form";

import HttpClass from "../services/Http";

import ModalElement from '../components/General/Modal.Element';

class Protected extends React.Component {
  state = {
    formData: [],
    savedFormData: [],

    // Editando una estructura de pregunta
    modalBehavior: {
      showModalEdit: false,
      IDInEdit: null,

      // Datos que se enviará
      submitData: {
        type_field: "",
        text_field:""
      }
    }
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

  handleSubmitEdition = e => {
    e.preventDefault();


    let dataSend = this.state.modalBehavior.submitData;
    dataSend.id = this.state.modalBehavior.IDInEdit;
    let http = new HttpClass();
    http.post("structure/edit", dataSend )
    .then( res => {
      if ( res.error === false ){
        return http.get("structure/all");
      }else{
        return Promise.reject("Error al editar la estructura. Intente nuevamente")
      }
    })
    .then( res => {

      let preState = this.state;
      preState.savedFormData = res;
      this.setState(preState);
    })

    e.target.reset();
  }

  /** Comportamiento cuando se oprima el boton de editar estructura de pregunta */
  handleOpenEdition = id => {
    this.setState({
      modalBehavior: {
        showModalEdit: true,
        IDInEdit: id,
        submitData:{}
      }
    });
  };

  /** Comportamiento cuando se cierre el modal de edicion */
  handleCloseEdition = () => {
    this.setState({
      modalBehavior: {
        showModalEdit: false
      }
    });

    document.getElementById("modal_edition_form").reset()
  };

  /**
   * Comportamiento que tomará cuando cada input cambie.
   */
  handleInputChangeEdition = e => {
    // Obtener los valores actuales del modalBehavior
    let prev = this.state.modalBehavior;
    // Añadir el valor que se está modificando actualmente
    prev.submitData[e.target.name] = e.target.value;
    this.setState({
      modalBehavior: prev
    });
  };

  render() {
    return (
      <React.Fragment>
        <ModalElement
          id="modal_edition"
          close={this.handleCloseEdition}
          show={this.state.modalBehavior.showModalEdit}
        >
          <form id="modal_edition_form" onSubmit={this.handleSubmitEdition}>
            <h3>Editar pregunta</h3>
            <div className="form-group">
              <label htmlFor="text_field">Texto de pregunta</label>
              <input
                type="text"
                name="text_field"
                id="text_field"
                className="form-control"
                onChange={this.handleInputChangeEdition}
              />
            </div>
            <div className="form-group">
              <label htmlFor="type_field">Tipo de pregunta</label>
              <select
                id="question_type"
                name="type_field"
                className="custom-select"
                onChange={this.handleInputChangeEdition}
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
                value="Editar"
                className="btn btn-success"
              />
            </div>
          </form>
        </ModalElement>
        <ProtectedForm formData={this.saveFormData.bind(this)} />
        <ProtectedData
          savedFormData={this.state.savedFormData}
          formData={this.state.formData}
          openEdit={this.handleOpenEdition}
        />
      </React.Fragment>
    );
  }
}

export default Protected;

import React from 'react';
import ProtectedData from '../components/Protected.Data';
import ProtectedForm from '../components/Protected.Form';



class Protected extends React.Component{

  state = {
    formData: {}
  }
    
  constructor( props ){
    super(props);
    this.props = props;
  }
  
  /**
   * Obtener la informacion de el formumario protected.
   * @param data Serán los datos que se envian desde el formulario Protected
   */
  setFormData(data){
    this.setState({
      formData: data
    })
    console.log("Desde Protected" , data)
  }

  render( ){
    return (
      <React.Fragment>
        <ProtectedForm formData={this.setFormData.bind(this)} />
        <ProtectedData formData={this.state.formData} />
      </React.Fragment>
    );
  }
  
}

export default Protected;
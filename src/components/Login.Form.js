import React from "react";
import HttpClass from '../services/Http';

class LoginForm extends React.Component {

  constructor( props ){
    super( props );

    this.state = {
      email : "",
      password: ""
    }

  }

  handleSubmit = e => {
    e.preventDefault();
    let http = new HttpClass('http://localhost:80');
    http.post('user/login', this.state ).then( f => {
      if ( typeof f.token !== "undefined"){
        localStorage.setItem( "token_id", f.token)
      }
    });  
  }

  /** Comando al cambiar un  */
  handleInputChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }
  
  
  render() {
    return (
      <div>
        <h3>Ingresar Usuario</h3>
        <form action="" onSubmit={this.handleSubmit} id="form_login">
          <div className="form-group">
            <label htmlFor="login_email" />
            <input
              className="form-control"
              type="text"
              name="email"
              id="login_email"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="login_password" />
            <input
              className="form-control"
              type="password"
              name="password"
              id="login_password"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Ingresar" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;

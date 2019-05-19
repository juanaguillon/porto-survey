import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import './style.css';

import "jquery";
import "popper.js";
import 'bootstrap/dist/js/bootstrap';
import FormLogin from "./components/Login.Form";
import Protected from './pages/Protected';
import EncuestForm from './components/Encuest.Form';
import "bootstrap/dist/css/bootstrap.min.css";

// const PrivateRouter = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={props => {
//         return localStorage.getItem("token_id") !== null ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/" />
//         );
//       }}
//     />
//   );
// };

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={FormLogin} />
          <Route path="/protected" component={Protected} />
          <Route path="/create" component={EncuestForm} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

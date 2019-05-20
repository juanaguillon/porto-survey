import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import './style.css';

import "jquery";
import "popper.js";
import 'bootstrap/dist/js/bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

import Protected from './pages/Protected';
import EncuestForm from './components/Encuest.Form';
import Encuest from './pages/Encuest';

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
          {/* <Route exact path="/" component={FormLogin} /> */}
          <Route exact path="/" component={Protected} />
          <Route exact path="/create" component={EncuestForm} />
          <Route exact path="/questions" component={Encuest} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

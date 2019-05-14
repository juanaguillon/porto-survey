import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from './pages/Layout';

import $ from 'jquery';
import Popper from 'popper.js';
import FormLogin from './components/Login.Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter >
      <Layout>
        <Switch>
          <Route exact path="/" component={FormLogin}></Route>
        </Switch>
      </Layout>
    </BrowserRouter>
    );
}

export default App;

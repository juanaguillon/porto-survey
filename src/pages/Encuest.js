import React from "react";
import HttpClass from "../services/Http";
import * as $ from "jquery";

import "./Encuest.css";

// Componentes
import SpinnerElement from "../components/General/Spinner.Element";
import AlertElement from "../components/General/Alert.Element";

const LiItem = props => {
  let valueProp = "";
  if (props.valVal === "true" || props.valVal === "false") {
    valueProp = props.valVal === "true" ? "Si" : "No";
  } else {
    valueProp = props.valVal;
  }
  return (
    <li className="list-group-item">
      <span className="text-dark text-capitalize">
        {props.keyVal.replace(/-/g, " ")}:{" "}
      </span>
      <span className="text-muted">{valueProp}</span>
    </li>
  );
};

const SingleQuestion = props => {
  /** Preguntas / Respuestas Estáticas */
  let staticQ = props.dataEncuest;
  /** Preguntas / Respuestas Dinámicas */
  let dynamicQArr = staticQ.data_encuest;
  /** HTML a ser mostrado */
  let dynamicQHTML = [];

  let fullName = staticQ.full_name + " " + staticQ.full_lastname;

  // Obtener el tipo de medio usado.
  let medio = "";
  switch (staticQ.full_medio) {
    case "red_social":
      medio = "Red Social";
      break;
    case "referido":
      medio = "Referido";
      break;
    case "publicidad":
      medio = "Publicidad";
      break;

    default:
      medio = staticQ.full_medio;
      break;
  }

  for (let keyDynamic in dynamicQArr) {
    dynamicQHTML.push(
      <LiItem keyVal={keyDynamic} valVal={dynamicQArr[keyDynamic]} />
    );
  }

  return (
    <React.Fragment>
      <div className="card my-1">
        <div
          className="collapsed pointer"
          aria-expanded="false"
          aria-controls="collapseOne"
          onClick={props.handleCollapse.bind(null, staticQ.id)}
        >
          <div className="card-header d-flex justify-content-between">
            <h6 className="mb-0 text-success">{fullName}</h6>
            <span className="text-muted font-2">{staticQ.created_at}</span>
          </div>
        </div>

        <div id={"collapse_" + staticQ.id} className="collapse">
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="text-dark">Email: </span>
                <span className="text-muted">{staticQ.full_email}</span>
              </li>
              <li className="list-group-item">
                <span className="text-dark">Teléfono: </span>
                <span className="text-muted">{staticQ.full_phone}</span>
              </li>
              <li className="list-group-item">
                <span className="text-dark">Residencia: </span>
                <span className="text-muted">{staticQ.full_address}</span>
              </li>
              <li className="list-group-item">
                <span className="text-dark">Medio: </span>
                <span className="text-muted">{medio}</span>
              </li>
              {dynamicQHTML}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

/**
 * Class: Mostrar todas las encuestas creadas.
 */
class EncuestData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      notFound: false
    };
  }

  componentDidMount() {
    let http = new HttpClass();
    http.get("question/all").then(all => {
      if (all.length < 1) {
        this.setState({
          notFound: true
        });
      }
      this.setState({
        loading: false,
        data: all
      });
    });
  }

  handleCollapse = data => {
    $(".collapse").removeClass('show');
    $("#collapse_" + data).toggleClass("show");
  };

  JSONToCSVConvertor = () => {
    var JSONData = this.state.data;
    var ReportTitle = "preguntas_" + new Date().getTime();
    var ShowLabel = "true";
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;

    var CSV = "sep=," + "\r\n\n";

    //This condition will generate the Label/Header
    if (ShowLabel) {
      var row = "";

      //This loop will extract the label from 1st index of on array
      for (var index in arrData[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ",";
      }

      row = row.slice(0, -1);

      //append Label row with line break
      CSV += row + "\r\n";
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
      var row = "";

      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }

      row.slice(0, row.length - 1);

      //add a line break after each row
      CSV += row + "\r\n";
    }

    if (CSV == "") {
      alert("Invalid data");
      return;
    }

    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = "data:text/csv;charset=utf-8," + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  render() {
    return (
      <React.Fragment>
        <section className="section">
          <SpinnerElement show={this.state.loading} />
          <AlertElement show={this.state.notFound}>
            No se han encontrado preguntas.
          </AlertElement>

          {this.state.data.map(singleQuestion => {
            return (
              <SingleQuestion
                key={singleQuestion.id}
                dataEncuest={singleQuestion}
                handleCollapse={this.handleCollapse.bind(this)}
              />
            );
          })}

          {!this.state.loading && (
            <button
              onClick={this.JSONToCSVConvertor}
              className="btn btn-primary"
            >
              <i className="fas fa-download" />
              Descargar Excel
            </button>
          )}
        </section>
      </React.Fragment>
    );
  }
}

export default EncuestData;

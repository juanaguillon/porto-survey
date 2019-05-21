import React from 'react';

const AlertElement = prop => {

  let typeOfWarning = "info"
  if ( typeof prop.type !== "undefined"){
    typeOfWarning = prop.type;
  }
  
  if ( prop.show ){

    return (
      <div className={"alert alert-" + typeOfWarning} role="alert">
        {prop.children}
      </div>
    );
  }else{
    return "";
  }
  
}

export default AlertElement;
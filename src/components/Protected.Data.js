/**
 * Este archivo será usado para buscar las preguntas guardadas previamente.
 */

import React from 'react';

function ProtectedData ( props ){
  
  return(
    <React.Fragment>
      Esto es:
      <pre>
        { 
          typeof props.formData !== "undefined" 
          ? JSON.stringify( props.formData)
          : ""
        
        }
      </pre>
    </React.Fragment>
  )
  
}

export default ProtectedData;
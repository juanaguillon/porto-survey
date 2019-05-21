import React from 'react';

const ModalElement = props => {

  /**
   * PROPS DE ESTE COMPONENTE
   * @param {Boolean} show Si se desea el modal o no.
   * @param {CallBack} close Funcion a ejecutar cuando se intente cerrar el modal}
   * @param {String} id Atributo ID del actual modal
   */

  let isShowing = "modal fade";
  if ( props.show ){
    isShowing += " show";
  }
  
  return (
    <div id={props.id} className={isShowing} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Información</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={props.close.bind(this)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={props.close.bind(this)}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default ModalElement;
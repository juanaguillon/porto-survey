import React from 'react';

function Layout( props ){

  return ( 
    <div className="container">
      <div className="nav-bar">
        {props.children}
      </div>
    </div> 
  )
  
}

export default Layout;
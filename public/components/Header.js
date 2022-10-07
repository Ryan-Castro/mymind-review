import React from "react";

export default function Header(props){
    return(
    <div className="header">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            <div className="menu">
                <span className="material-symbols-outlined" onClick={props.show}>
                    menu
                </span>
                <h2>Início</h2>
            </div>
            <hr/>
    </div>
    )
}
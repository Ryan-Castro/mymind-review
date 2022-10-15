import React from "react";

export default function Card(props){
    return(
        <div className="card">
            <h1>{props.h1}</h1>
            <p dangerouslySetInnerHTML={{__html: props.resumo}}></p>
        </div>

    )
}
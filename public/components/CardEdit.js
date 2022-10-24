import React from "react";

export default function CardEdit(props){
    return(
        <div className="card">
            <h1>{props.h1}</h1>
            <p dangerouslySetInnerHTML={{__html: props.resumo}}></p>
            <a href={`./creat?id=`+props.h1+"&numType="+props.numType+"&numGenres="+props.numGenres}>Editar</a>
        </div>

    )
}
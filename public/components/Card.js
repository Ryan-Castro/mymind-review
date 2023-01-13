import React from "react";

export default function Card(props){
    // agora é para ir
    return(
        <div className="card">
            <h1>{props.h1}</h1>
            <div dangerouslySetInnerHTML={{__html: props.resumo}}></div>
            <a href={`./reading?id=`+props.h1+"&type="+props.numType}>Ler</a>
        </div>
        
    )
}
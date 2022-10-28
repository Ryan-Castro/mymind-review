import React, { useState } from "react";
import ModalDelet from "./ModalDelete";

export default function CardEdit(props){

    const [show, setShow] = useState(false)


    function showModal(){
        setShow(true)
    }

    function hideModal(e){
        let target = e.target
        if(target.id == "modal" || target.id == "cancel"){
            setShow(false)
        }
    }

    return(
        <div className="card">
            <h1>{props.h1}</h1>
            <p dangerouslySetInnerHTML={{__html: props.resumo}}></p>
            <a href={`./creat?id=`+props.h1+"&numType="+props.numType+"&numGenres="+props.numGenres}>Editar</a>
            <input type="button" value="Apagar" id="delet" onClick={showModal}/>
            <ModalDelet display={show} setShow={setShow} hideModal={hideModal} numType={props.numType} id={props.h1}/>
        </div>

    )
}
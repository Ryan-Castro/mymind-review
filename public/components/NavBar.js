import React, { useEffect, useRef } from "react"

export default function navBar(props) {

    const elementSelect = useRef()

    useEffect(()=>{
        for(let i = 0; i <= 3; i++){
            elementSelect.current.children[i].style.backgroundColor = "#1d1e1f"
        }
        elementSelect.current.children[props.barNum].style.backgroundColor = "#848484"
    },[props.handleUpdate])
    
    return(
        <div className="navbar">
            <ul style={{display: `${props.navBar}`}} ref={elementSelect}>
                <li onClick={props.handleUpdate} id="livros" key={0}>Livros</li>
                <li onClick={props.handleUpdate} id="manhwa" key={1}>Manhwa</li>
                <li onClick={props.handleUpdate} id="filmes" key={2}>Filmes</li>
                <li onClick={props.handleUpdate} id="musicas" key={3}>Musica</li>
            </ul>
        </div>
    )
};

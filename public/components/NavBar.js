import React from "react"

export default function navBar(props) {

    return(
        <div className="navbar">
            <ul style={{display: `${props.navBar}`}}>
                <li>Manhwa</li>
                <li>Livros</li>
                <li>Filmes</li>
                <li>musica</li>
            </ul>
        </div>
    )
};

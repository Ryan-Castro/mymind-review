import Editor from "../public/components/Editor"
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { useState } from "react";


export default function Creat(){
    const firebaseConfig = {
        apiKey:                                 "AIzaSyCSCby8YQNNIbzAuij_VOwQ5e2-Qf2HUck",
        authDomain:                             "mymind-review.firebaseapp.com",
        projectId:                              "mymind-review",
        storageBucket:                          "mymind-review.appspot.com",
        messagingSenderId:                      "714026345647",
        appId:                                  "1:714026345647:web:7c6c9d4ed967b0cef3205a",
        measurementId:                          "G-3G8E71P1X5"
    };

    const app   =                               initializeApp(firebaseConfig);
    const db    =                               getFirestore(app);
    let titulo = ""
    const [resumo, setResumo] =                 useState("") 
    const [text, setText] =                     useState("") 
    const [selected, setSelected] =             useState("")
    

    async function enviar(){
        let optionSelected = selectedselected.target.options[selected.target.selectedIndex].value
        if (optionSelected == ""){
            alert("Escolha que tipo de conteudo é")
        } else {
            console.log(optionSelected)
            console.log(titulo)
            await setDoc(doc(db, optionSelected, titulo),{
                resumo,
                text
        }) 
    }
    }

    return(
        <div id="creat">            
            <div className="bar">
                <button><a href="./">voltar</a></button>
                <select onInput={(e) =>{setSelected(e)}}>
                    <option value="">Escolha um Conteudo</option>
                    <option value="livros">livros</option>
                    <option value="manhwa">manhwa</option>
                </select>
                <input type="button" value="Enviar" onClick={enviar}/>
            </div>
            <div id="creatContainer">
                <h1>Título</h1>
                <input type='text' id="titulo" onInput={(e)=>titulo = e.target.value} />
                <h1>Sinopse / Resumo</h1>
                <Editor handleState={setResumo}></Editor>
                <h1>Option</h1>
                <Editor handleState={setText}></Editor>
            </div>

        </div>
    )

}
import Editor                                               from "../public/components/Editor"
import { initializeApp }                                    from "firebase/app";
import { getFirestore, setDoc, doc }                        from "firebase/firestore";
import { useState }                                         from "react";
import React                                                from 'react'
import dynamic                                              from 'next/dynamic';
import Link                                                 from "next/link";


const Select =                                              dynamic(() => import('react-select'), {
	                                                            ssr: false
                                                            })




export default function Creat(){
    const firebaseConfig = {
        apiKey:                                             "AIzaSyCSCby8YQNNIbzAuij_VOwQ5e2-Qf2HUck",
        authDomain:                                         "mymind-review.firebaseapp.com",
        projectId:                                          "mymind-review",
        storageBucket:                                      "mymind-review.appspot.com",
        messagingSenderId:                                  "714026345647",
        appId:                                              "1:714026345647:web:7c6c9d4ed967b0cef3205a",
        measurementId:                                      "G-3G8E71P1X5"
    };

    const app   =                                           initializeApp(firebaseConfig);
    const db    =                                           getFirestore(app);
    let titulo = ""
    const [resumo, setResumo] =                             useState("") 
    const [text, setText] =                                 useState("") 
    const [selected, setSelected] =                         useState("")
    const [genres, setGenres] =                             useState([])
    

    async function enviar(){
        let selTarg = selected.target
        let optSel = selTarg.options[selTarg.selectedIndex].value
        if (optSel == "" || titulo == ""){
            alert("Reveja os dados cadastrados")
        } else {
            await setDoc(doc(db, optSel, titulo),{
                resumo,
                text,
                genres
            }) 
        }
    }

    const options = [
        { value: 'Ação', label: 'Ação' },
        { value: 'Romance', label: 'Romance' },
        { value: 'Comédia', label: 'Comédia' }
      ]

    async function breakGenres(genresArrey){
        let itemArray = []
        await genresArrey.map(genre=>{
            itemArray.push(genre.value)  
            
        })
        setGenres(itemArray)
    }

    return(
        <div id="creat">            
            <div className="bar">
                
                <button>
                    <Link href="/admin">
                        <a>voltar</a>
                    </Link>
                </button>


                <select onInput={(r) =>{setSelected(r)}} id="itens">
                    <option value="">Escolha um Conteudo</option>
                    <option value="livros">livros</option>
                    <option value="manhwa">manhwa</option>
                </select>
                
                <Select 
                    isMulti
                    name="colors"
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(a)=>{breakGenres(a)}}
                    id="genres"
                    />
                
                <input type="button" value="Enviar" onClick={enviar}/>
            </div>

            <div id="creatContainer">
                <h1>Título</h1>
                <input type='text' id="inputTitulo" onInput={(e)=>{  titulo = e.target.value
                                                                console.log(titulo)
                                                                }} />
                <h1>Sinopse / Resumo</h1>
                <Editor handleState={setResumo}></Editor>
                <h1>Option</h1>
                <Editor handleState={setText}></Editor>
            </div>

        </div>
    )

}
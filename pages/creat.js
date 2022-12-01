import Editor                                               from "../public/components/Editor"
import { initializeApp }                                    from "firebase/app";
import { getFirestore, setDoc, doc, getDoc}                 from "firebase/firestore";
import { useEffect, useState }                              from "react";
import React                                                from 'react'
import dynamic                                              from 'next/dynamic';
import Link                                                 from "next/link";

import Router, {useRouter} from 'next/router'



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

    const  {query}  =                                       useRouter()
    const app   =                                           initializeApp(firebaseConfig);
    const db    =                                           getFirestore(app);
    const [title,           setTitle] =                     useState("")
    const [resumo,          setResumo] =                    useState("") 
    const [text,            setText] =                      useState("") 
    const [selected,        setSelected] =                  useState([])
    const [genres,          setGenres] =                    useState([])
    const [defGenres,       setDefGenres] =                 useState([])
    const [numGenresArrey,  setNumArrey] =                  useState([])
    const [backgroundImg, setBackgrondImg]=                 useState("")
    let data =                                              new Date()

    useEffect(()=>{
        if(query.id){
            setTitle(query.id)
            setSelected(optionsTypes[query.numType])
            setNumArrey(query.numGenres.split(","))
            breakGenres(numGenresArrey.map(num=> optionsGenres[num]))
        }
        
    },[query])

        
    async function breakGenres(genresArrey){
        let itemArray = []
        let numGenre = []
        await genresArrey.map(genre=>{
            itemArray.push(genre)  
            numGenre.push(genre.numGenre)
        })
        setGenres(itemArray)
        setDefGenres(numGenre)
    }      


  async function enviar(){
        let numType = selected.numType  
        let genresitems = numGenresArrey.map(num=>{return optionsGenres[num]})
        console.log(backgroundImg)
        if ((numType == "" && numType != 0) || title == ""  || resumo == "" || text == "" ){
            alert("Reveja os dados cadastrados")
        } else {
            await setDoc(doc(db, `${selected.value}`, `${title}`),{
                resumo,
                text,
                genres: genres !="" ? genres : genresitems,
                numType,
                defGenres,
                backgroundImg,
                data
            }).then(()=>{Router.push('/admin')}) 

        }
    }


    const optionsGenres = [
        {value: 'Ação', label: 'Ação', numGenre: 0},
        {value: 'Romance', label: 'Romance', numGenre: 1},
        {value: 'Comédia', label: 'Comédia', numGenre: 2}
    ]


    const optionsTypes = [
        { value: 'livros', label: 'livros', numType:0},
        { value: 'manhwa', label: 'manhwa', numType:1},
        { value: 'filmes', label: 'filmes', numType:2},
        { value: 'musicas', label: 'musicas', numType:3},
    ]

    function setInputText(e){
        setTitle(e.target.value)
    }


    return(
        <div id="creat">            
            <div id="barCreate">
                
                <button className="btnAdmin">
                    <Link href="/admin">
                        Admin
                    </Link>
                </button>

                <Select 
                    defaultValue={[optionsTypes[query.numType]]}
                    options={optionsTypes}
                    className="basic-multi-select selectCustom"
                    classNamePrefix="select"
                    onChange={(b)=>{setSelected(b)}}
                    id="tipes"
                    />

                <Select 
                    defaultValue={numGenresArrey.map(num=>{return optionsGenres[num]})}
                    isMulti
                    name="colors"
                    options={optionsGenres}
                    className="basic-multi-select selectCustom"
                    classNamePrefix="select"
                    onChange={(a)=>{breakGenres(a)}}
                    id="genres"
                    />
                
                <input type="button" value="Enviar" onClick={enviar} className="btnAdmin"/>
            </div>

            <div id="creatContainer">
                <div id="creatContent">
                    <h1>Título</h1>
                    <input type='text' id="inputTitulo" onChange={(e)=>{setInputText(e)}} value={title} />
                    <h1>Sinopse / Resumo</h1>
                    <Editor handleState={setResumo} id={query.id} type={optionsTypes} input="resumo"></Editor>
                    <h1>Texto</h1>
                    <Editor handleState={setText} id={query.id} type={optionsTypes}></Editor>
                    <h1>Imagem de fundo</h1>
                    <input type='text' placeholder='Link da imagem de fundo' onInput={(i)=>{setBackgrondImg(i.target.value)}}/>
                </div>
            </div>

        </div>
    )

}
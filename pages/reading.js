import { useRouter} from 'next/router'
import { doc, getDoc, getFirestore} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useEffect, useRef, useState } from 'react';
import Head                                  from "next/head";


export default function reading(){

    const firebaseConfig = {
        apiKey:                                             "AIzaSyCSCby8YQNNIbzAuij_VOwQ5e2-Qf2HUck",
        authDomain:                                         "mymind-review.firebaseapp.com",
        projectId:                                          "mymind-review",
        storageBucket:                                      "mymind-review.appspot.com",
        messagingSenderId:                                  "714026345647",
        appId:                                              "1:714026345647:web:7c6c9d4ed967b0cef3205a",
        measurementId:                                      "G-3G8E71P1X5"
    };

    const   app                 =                                     initializeApp(firebaseConfig);
    const   db                  =                                     getFirestore(app);
    const  {query}  = useRouter()
    const [docSnap, setDocSnap] = useState({resumo:""})
    const page = useRef()

    const optionsTypes = [
        { value: 'livros', label: 'livros', numType:0},
        { value: 'manhwa', label: 'manhwa', numType:1},
        { value: 'filmes', label: 'filmes', numType:2},
        { value: 'musicas', label: 'musicas', numType:3},
    ]


    
    async function init(path){
        if(path.id){
        const docRef = doc(db, `${optionsTypes[path.type].value}`, `${path.id}`); 
        getDoc(docRef)
            .then(res=>{
                if(res.data()){
                    setDocSnap(res.data());
                    page.current.style.backgroundImage = `url(${res.data().backgroundImg})`
                } else {
                    alert("Não encontrado")
                }
        })
            
    }
    }
    
    

    useEffect(()=>{
        init(query)
    },[query])


    return(
        <div>
            <Head>
                <title>mymind-review</title>
            </Head>
            <div id='reading' ref={page}>
                
                <h1 dangerouslySetInnerHTML={{__html: query.id}}></h1>
                <div className='readText'>
                    <h2>Sinopse</h2>
                    <p dangerouslySetInnerHTML={{__html: docSnap.resumo}}></p>
                </div>
                <div className='readText'>
                    <h2>Análise</h2>
                    <p dangerouslySetInnerHTML={{__html: docSnap.text}}></p>
                </div>
            </div>
        </div>
        
)}






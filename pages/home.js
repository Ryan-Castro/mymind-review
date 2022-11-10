import { useEffect, useState, useRef }       from "react";
import Head                                  from "next/head";
import Header                                from "../public/components/Header";
import NavBar                                from '../public/components/NavBar';
import Card                                  from "../public/components/Card";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {  initializeApp }                    from "firebase/app";
import { useRouter } from "next/router";



export default function home(){
    const firebaseConfig = {
        apiKey:                                             "AIzaSyCSCby8YQNNIbzAuij_VOwQ5e2-Qf2HUck",
        authDomain:                                         "mymind-review.firebaseapp.com",
        projectId:                                          "mymind-review",
        storageBucket:                                      "mymind-review.appspot.com",
        messagingSenderId:                                  "714026345647",
        appId:                                              "1:714026345647:web:7c6c9d4ed967b0cef3205a",
        measurementId:                                      "G-3G8E71P1X5"
    };

    const   [navBar, setnavBar] =                                     useState("flex")
    const   app                 =                                     initializeApp(firebaseConfig);
    const   db                  =                                     getFirestore(app);
    let     [cards, setCards]   =                                     useState([])
    let itens = []
    let [barNumType, setBarNumType] = useState("livros")
    let query = useRouter()
    
    let contentElement = useRef()

    function show(){
        if(navBar == "flex" ){
            contentElement.current.style.width = "100%"
            setnavBar("none")
        } else {
            setnavBar("flex")
            contentElement.current.style.width = "calc(100% - 100px)"
        }
    } 

    async function init(type){
        if(type != "livros"){
            type = type.target? type.target.id:type
            setBarNumType(type)
            
        }
    await getDocs(collection(db, type))
            .then((snapshot)=>{
                snapshot.docs.map((doc, i)=>{
                            itens.push([ doc.id, doc.data().resumo, doc.data().text, i, doc.data().numType ]) 
                        })
                    })
        setCards(itens) 
    }

    useEffect(()=>{
        if(query.query.genre){
            init(query.query.genre)
        }else{
        init("livros")
        }
    },[query])

    return(
        <div id="home">
            <Head>
                <title>mymind-review</title>
            </Head>
            <Header show={show}></Header>
            <NavBar navBar={navBar} handleUpdate={init} barNum={barNumType}></NavBar>
            <div className="content" ref={contentElement}>
                {cards.map(card=><Card key={card[3]} h1={card[0]} resumo={card[1]} numType={card[4]}></Card>)}
                

            </div>
        </div>
    )
}
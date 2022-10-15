import { useEffect, useState }                                                  from "react";
import Head                                                                     from "next/head";
import Header                                                                   from "../public/components/Header";
import NavBar                                                                   from '../public/components/NavBar';
import Card                                                                     from "../public/components/card";
import { getFirestore, collection, getDocs }                                    from "firebase/firestore";
import {  initializeApp }                                                       from "firebase/app";



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
    
    
    function show(){
        if(navBar == "flex" ){
            setnavBar("none")
        } else {
            setnavBar("flex")
        }
    } 

    async function init(){
        await getDocs(collection(db, "livros"))
                            .then((snapshot)=>{
                                snapshot.docs.map((doc, i)=>{
                                            itens.push([
                                            doc.id,
                                            doc.data().resumo,
                                            doc.data().text,
                                            i
                                            ]) 
                                        })
                                    })
        setCards(itens)
        console.log(itens)
    }

    useEffect(()=>{
        init()
    },[])

    return(
        <div>
            <Head>
                <title>mymind-review</title>
            </Head>
            <Header show={show}></Header>
            <NavBar navBar={navBar}></NavBar>
            <div className="content">
                {cards.map(card=><Card key={card[3]} h1={card[0]} resumo={card[1]}></Card>)}
                

            </div>
        </div>
    )
}
import { useEffect, useState } from "react";
import TextBox from "../public/components/TextBox"
import { getFirestore, collection, getDocs }                                    from "firebase/firestore";
import { initializeApp }                                                       from "firebase/app";
import Card                                  from "../public/components/Card";
import Link from "next/link";
import { useRef } from "react";




export default function index(){
    const firebaseConfig = {
        apiKey:                                             "AIzaSyCSCby8YQNNIbzAuij_VOwQ5e2-Qf2HUck",
        authDomain:                                         "mymind-review.firebaseapp.com",
        projectId:                                          "mymind-review",
        storageBucket:                                      "mymind-review.appspot.com",
        messagingSenderId:                                  "714026345647",
        appId:                                              "1:714026345647:web:7c6c9d4ed967b0cef3205a",
        measurementId:                                      "G-3G8E71P1X5"
    };

    let genres              =                                     ["livros", "manhwa", "filmes", "musicas"]
    const   app                 =                                     initializeApp(firebaseConfig);
    const   db                  =                                     getFirestore(app);
    let     [cardsEdit, setCardsEdit]   =                             useState([])
    let     itens               =                                     []
    let     background                  =                               useRef()
    async function update(genre){
        await getDocs(collection(db, genre))
                            .then((snapshot)=>{
                                snapshot.docs.map((doc, i)=>{
                                            itens.push([
                                            doc.id,
                                            doc.data().resumo,
                                            doc.data().text,
                                            `${doc.id}-${i}`,
                                            doc.data().numType,
                                            doc.data().defGenres,
                                            doc.data().data.seconds
                                            ]) 
                                        })
                                    })
        itens.sort((a,b)=>{return a[6] < b[6]})
        setCardsEdit([itens[0], itens[1]])

    }



    useEffect(()=>{
        genres.map(genre=>update(genre))
        getDocs(collection(db, "config")).then((snapshot)=>{
            background.current.style.backgroundImage = `url(${snapshot.docs[0].data().background})`
        })
    },[])
    
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
        <div id="main" ref={background}>
            <TextBox showModal={showModal}></TextBox>
            {cardsEdit.map(card=><Card key={card[3]} h1={card[0]} resumo={card[1]} numType={card[4]}></Card>)}
            <div id="modal" onClick={hideModal} className={show? "": "hideModal"}>
                <div id="contentModalGenres">
                    <ul>
                        {genres.map((genre, i)=><Link href={`/home?genre=${genre}`}><li key={i}>{genre}</li></Link>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}
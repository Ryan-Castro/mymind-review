import { useEffect, useState }                                                  from "react";
import Link from "next/link"
import { getFirestore, collection, getDocs }                                    from "firebase/firestore";
import { initializeApp }                                                       from "firebase/app";
import CardEditor from "../public/components/CardEdit"
import dynamic                                              from 'next/dynamic';

const Select =                                              dynamic(() => import('react-select'), {
    ssr: false
})


export default function admin(){
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
    let     [cardsEdit, setCardsEdit]   =                             useState([])
    let     itens               =                                     []
    let     genres              =                                     ["livros", "manhwa", "filmes", "musicas"]
    const options = [
        { value: 'livros', label: 'livros' },
        { value: 'manhwa', label: 'manhwa' },
        { value: 'filmes', label: 'filmes' },
        { value: 'musicas', label: 'musicas' }
      ]
    
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
                                            doc.data().defGenres
                                            ]) 
                                        })
                                    })
        setCardsEdit(itens)
    }



    useEffect(()=>{
        genres.map(genre=>update(genre))
        
    },[])

    return(
        <div id="admin">
            <div id="navbarAdmin">
                <button className="btnAdmin">
                    <Link href="/">
                        <a>Pagina Inicial</a>
                    </Link>
                </button>
                <Select 
                    options={options}
                    onChange={(a)=>{update(a.value)}}
                    id="classes"
                    className="selectCustom"
                    />
                <button className="btnAdmin">
                    <Link href="/creat">
                        <a>Criar Resumo</a>
                    </Link>
                </button>
            </div>
            <div id="contentEdit">
                {cardsEdit.map(card=><CardEditor key={card[3]} h1={card[0]} resumo={card[1]} numType={card[4]} numGenres={card[5]}></CardEditor>)}
            </div>
            </div>
    )
}
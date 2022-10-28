import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { getFirestore }                                    from "firebase/firestore";
import { initializeApp }                                                       from "firebase/app";

export default function ModalDelet(props){

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

    const optionsTypes = [
        { value: 'livros', label: 'livros', numType:0},
        { value: 'manhwa', label: 'manhwa', numType:1},
        { value: 'filmes', label: 'filmes', numType:2},
        { value: 'musicas', label: 'musicas', numType:3},
    ]

    async function delet(){
        let numType = props.numType ? props.numType : 0
        await deleteDoc(doc(db, `${optionsTypes[numType].value}`, `${props.id}`)).then(()=>{
            props.setShow(false)
            window.location.reload();
        });

    }

    return(
        <div id="modal" onClick={props.hideModal} className={props.display? "": "hideModal"}>
            <div id="contentModal">
                <h1>Quer mesmo apagar?</h1>
                <div id="contentModalBtn">
                    <input type="button" value="Cancelar" id="cancel" className="btn" />
                    <input type="button" value="Apagar" id="delet" className="btn" onClick={delet}/>
                </div>          
                </div>
        </div>

    )
}
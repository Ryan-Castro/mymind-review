import { useState } from "react"
import { useRef } from "react"
import { initializeApp }                                    from "firebase/app";
import { getFirestore, setDoc, doc, getDoc}                 from "firebase/firestore";

export default function config(){

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

    const img = useRef()
    const [inputImg, setInputImg] = useState("")
    function updateImg(e){
        img.current.style.backgroundImage = `url(${e.target.value})`
        setInputImg(e.target.value)
    }

    function updateBackground(){
        if(inputImg != ""){
            setDoc(doc(db, "config", "main"),{
                background: inputImg
            })
        }
    }

    return(
        <>
            <div id="configBackground">
                <div id="divBackground" ref={img}>
                    Preview
                </div>
                <div id="configBackgroundInputs">
                    <input type={"text"} onInput={updateImg} placeholder="Link da imagem"/>
                    <input type={"button"} onClick={updateBackground} value="Atualizar"/>
                </div>
            </div>
        </>
    )
}
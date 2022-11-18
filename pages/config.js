import { useState } from "react"
import { useRef } from "react"

export default function config(){

    const img = useRef()
    const [inputImg, setInputImg] = useState("")
    function updateImg(e){
        img.current.style.backgroundImage = `url(${e.target.value})`
        setInputImg(e.target.value)
    }

    function updateBackground(){
        if(inputImg != ""){
            
        }
    }

    return(
        <>
        <div id="divBackground" ref={img}>
        </div>
        <input type={"text"} onInput={updateImg}/>
        <input type={"button"} onClick={updateBackground} value="Atualizar"/>
        </>
    )
}
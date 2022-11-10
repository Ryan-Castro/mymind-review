import { useRef } from "react"
import { useEffect, useState} from "react"


export default function TextBox(props){

    const [numDialog, setNumDialog] = useState(0)
    const txtDialog = useRef()
    const imgDialog = useRef()
    const interactionsDialog = useRef()

    useEffect(()=>{
        txtDialog.current.innerHTML = dialogos[numDialog]
        hideButton(2)
        hideButton(3)
        hideButton(4)
    },[])

    const dialogos = [
        "Olá, bem vindo ao meu site, sintasse a vontade",
        "Aqui é um site onde eu escrevo sobre das coisa que eu consumo, e queria dividir com os outros",
        "Você pode escolhe sobre o que vc quer ler, ou vc pode ver as ultimas postagens ai em cima"
    ]

    const ignorado = "Ah, deixa então, faz o que você quiser"

    const imgIgnorado = "http://pm1.narvii.com/7303/c981e0d920f373099599b27c6d4f3ed3d5b9b411r1-720-612v2_00.jpg"

    const imgArray = [
        "https://i.pinimg.com/236x/93/2a/a1/932aa18b2a21d0190ee0f3695202cd96.jpg",
        "https://pbs.twimg.com/profile_images/1207749524615286792/9k0G7O8b_400x400.jpg"
    ]

    function skip(){
        txtDialog.current.innerHTML = ignorado
        imgDialog.current.src = imgIgnorado
        hideButton(0)
        hideButton(1)
        showButton(2)
        showButton(3)
        showButton(4)

        
    }

    function next(){
        setNumDialog(numDialog + 1)
        if(dialogos[numDialog + 1]){
            txtDialog.current.innerHTML = dialogos[numDialog + 1]
        } else {
            txtDialog.current.innerHTML = "o que vc deseja fazer?"
            imgDialog.current.src = "http://pm1.narvii.com/7303/e3d47289c0c900bbbf9744ac51f80c0375309411r1-714-816v2_uhq.jpg"
            hideButton(1)
            hideButton(0)
            showButton(3)
            showButton(4)
        }
        if(imgArray[numDialog + 1]){
            imgDialog.current.src = imgArray[numDialog + 1]
        }
    }

    function restart(){
        setNumDialog(-1)
        imgDialog.current.src = "https://i.pinimg.com/736x/ea/eb/58/eaeb5814538707164bae16905d92ded6.jpg"
        txtDialog.current.innerHTML = "Espero que isso não se repita..."
        hideButton(2)
        hideButton(3)
        showButton(1)
        
    }

    function goTo(){
        window.location.pathname = "home"
    }

    function hideButton(num){
        interactionsDialog.current.children[num].style.display = "none"
    }

    function showButton(num){
        interactionsDialog.current.children[num].style.display = "inline-block"
    }


    return(
        <div id="textBox">
            <img src="https://i.pinimg.com/236x/93/2a/a1/932aa18b2a21d0190ee0f3695202cd96.jpg" ref={imgDialog}/>
            <p ref={txtDialog}>Só um minuto</p>
            <div id="interactionsDialog" ref={interactionsDialog}>
                <input type="button" value="Pular" onClick={skip}/>
                <input type="button" value="Próximo" onClick={next}/>
                <input type='button' value='Recomeçar' onClick={restart}/>
                <input type='button' value='Ir para o site' onClick={goTo}/>
                <input type='button' value='Categorias' onClick={props.showModal}/>
                
            </div>
        </div>
    )
}
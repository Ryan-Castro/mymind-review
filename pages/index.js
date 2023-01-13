import { useEffect, useState }                  from "react";
import TextBox                                  from "../public/components/TextBox"
import { getFirestore, collection, getDocs }    from "firebase/firestore";
import { initializeApp }                        from "firebase/app";
import Card                                     from "../public/components/Card";
import Link                                     from "next/link";
import { useRef }                               from "react";
import Head                                     from "next/head";

export async function getStaticProps(){

    const firebaseConfig = {
        apiKey: "AIzaSyCSCby8YQNNIbzAuij_VOwQ5e2-Qf2HUck",
        authDomain: "mymind-review.firebaseapp.com",
        projectId: "mymind-review",
        storageBucket: "mymind-review.appspot.com",
        messagingSenderId: "714026345647",
        appId: "1:714026345647:web:7c6c9d4ed967b0cef3205a",
        measurementId: "G-3G8E71P1X5"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    let itens = []
    let genres = ["livros", "manhwa", "filmes", "musicas"]
    let background = ''
    
    genres.map((genre) => update(genre))
    await getDocs(collection(db, "config")).then((snapshot) => {
        background = snapshot.docs[0].data().background
    })
    
    async function update(genre) {
        await getDocs(collection(db, genre))
            .then((snapshot) => {
                snapshot.docs.map((doc, i) => {
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
        itens.sort((a, b) => { return a[6] < b[6] })
    }

    return{
        props: {
            background,
            itens,
            genres
        },
        revalidate: 600
    }
}

const Index = (props) => {

    let background = useRef()
    const [show, setShow] = useState(false)


    function showModal() {
        setShow(true)
    }

    function hideModal(e) {
        let target = e.target
        if (target.id == "modal" || target.id == "cancel") {
            setShow(false)
        }
    }
    useEffect(()=>{
        background.current.style.backgroundImage = `url(${props.background})`
    },[])
    return (
         <>
            <Head>
                <title>mymind-review</title>
            </Head>
            <div id="main" ref={background}>
                <TextBox showModal={showModal}></TextBox>
                {props.itens.map((card, i) => <Card key={i} h1={card[0]} resumo={card[1]} numType={card[4]}></Card>)}
                <div id="modal" onClick={hideModal} className={show ? "" : "hideModal"}>
                    <div id="contentModalGenres">
                        <ul>
                            {props.genres.map((genre, i) => <Link href={`/home?genre=${genre}`} key={i}><li key={i}>{genre}</li></Link>)}
                        </ul>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default Index
import React, { useState, useRef, useEffect } 						from 'react';
import { initializeApp }                                    		from "firebase/app";
import { getFirestore, setDoc, doc, getDoc, queryEqual}                        	from "firebase/firestore";
import dynamic from 'next/dynamic';
import { useRouter} from 'next/router'
const JoditEditor = dynamic(() => import('jodit-react'), {
	ssr: false
})

export default function Editor(props){
	const firebaseConfig = {
        apiKey:                                             "AIzaSyCSCby8YQNNIbzAuij_VOwQ5e2-Qf2HUck",
        authDomain:                                         "mymind-review.firebaseapp.com",
        projectId:                                          "mymind-review",
        storageBucket:                                      "mymind-review.appspot.com",
        messagingSenderId:                                  "714026345647",
        appId:                                              "1:714026345647:web:7c6c9d4ed967b0cef3205a",
        measurementId:                                      "G-3G8E71P1X5"
    };
	const editor = useRef(null);
	const [content, setContent] = useState('');
	const app   =                                           initializeApp(firebaseConfig);
    const db    =                                           getFirestore(app);
	const  {query}  = useRouter()
	const config = {
			readonly: false,
			heigth: 400,
		}

	useEffect(()=>{
		if(query.numType && props.type[query.numType]){
			load(props.id, props.type[query.numType].value)
		}
	},[query])

	async function load(linkId, linkGenre){
        const docRef = doc(db, `${linkGenre}`, `${linkId}`);
        let itemInput = ""
        await getDoc(docRef)
            .then(res=>{
                itemInput = props.input == "resumo" ? res.data().resumo : res.data().text
            }) 
		setContent(itemInput)
		props.handleState(itemInput)
    } 
	return (
		<JoditEditor
			ref={editor}
			value={content}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => 
				{props.handleState(newContent)}
			}
			onChange = {newContent => {}}
		/>
	);
};
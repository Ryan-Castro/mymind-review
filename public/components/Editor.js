import React, { useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), {
	ssr: false
})

export default function Editor(props){
	const editor = useRef(null);
	const [content, setContent] = useState('');

	const config = {
			readonly: false, // all options from https://xdsoft.net/jodit/doc/,
			heigth: 400,
		}

	return (
		<JoditEditor
			ref={editor}
			value={content}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => 
				{
					console.log(newContent.split(' '))
					//props.handleState(newContent)
				}
			}
			onChange = {newContent => {}}
		/>
	);
};
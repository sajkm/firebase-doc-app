import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import ReactQuill from 'react-quill';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import {updateDoc,collection,doc,onSnapshot} from 'firebase/firestore';
export default function EditDocs({database}) {
    const collectionRef = collection(database, 'docs')
    let params = useParams();
    const [documentTitle, setDocumentTitle] = useState('')
    const [Value, setValue] = useState('');
    const getQuillData = (value) => {
        setValue(value)
    }
    
    const  modules  = {
      toolbar: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script:  "sub" }, { script:  "super" }],
          ["blockquote", "code-block"],
          [{ list:  "ordered" }, { list:  "bullet" }],
          [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
          ["link", "image", "video"],
          ["clean"],
      ],
  };
        const handleSave = () => {
            const document = doc(collectionRef, params.id)
            updateDoc(document, {
                Value: Value
            })
                .then(() => {
                    toast.success('Saved')
                })
                .catch(() => {
                    toast.error('Cannot Save')
                })
        }
        
 

    const getData = () => {
        const document = doc(collectionRef, params.id)
        onSnapshot(document, (doces) => {
            setDocumentTitle(doces.data().title)
            setValue(doces.data().Value);
        })
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='container mt-5'>
            <h1>{documentTitle}</h1>

            <ReactQuill value={Value} onChange={getQuillData} modules={modules}/>
            <Button onClick={handleSave}>Save</Button>
            <Link to={'/'}><Button>Back</Button></Link>
            <ToastContainer
        position='top-center'
        theme='colored'
        autoClose={2000}
        />
        </div>
        
    )
}
import React, { useState ,useEffect} from 'react'
import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Typography,Button,Modal,Box,TextField, Alert} from '@mui/material'
import { createSvgIcon } from '@mui/material/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';


function Home({database}) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      const PlusIcon = createSvgIcon(
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>,
        'Plus',
      );
      let navigate = useNavigate();
      const getID = (id) => {
        navigate(`/quill/${id}`)
}
      const[title,setTitle]= useState("");
      const [docu,setDocu] = useState([]);

      const [open, setOpen] = useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

      const collectionRef = collection(database,'docs');

      const handleSubmit = () =>{
        
        addDoc(collectionRef, {
          title: title
      })
      .then(() => {
          toast.success('Data Added')
      })
      .catch(() => {
          toast.error('Cannot add data')
      })
      }

    const getFirebaseData = ()=>{
      onSnapshot(collectionRef, (data)=>{
          setDocu(data.docs.map((doc) => {
              return {...doc.data(), id: doc.id}
          }))
      })
    }
    const handleDelete = (id)=>{
      deleteDoc(doc(database,"docs",id)).then(()=>{
           toast.info('Deleted Successfully!')
    })
  }
    useEffect(()=>{
      getFirebaseData()
    },[])
  return (
    <>
    <div className='d-flex flex-column justify-content-center align-items-center mt-5 '>
    <Typography variant="h2" component="h2" style={{textShadow:'2px 2px 4px #000000'}}>DOC APP</Typography>

    <Button className='border rounded bg-white' onClick={handleOpen}><span className='me-2'><PlusIcon /></span> ADD A DOCUMENT</Button>
    </div>
    <Modal
      open={open}
      onClose={handleClose}
      title={title}
      setTitle={setTitle}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box  className='border rounded d-flex flex-column' sx={style}>
      <TextField id="outlined-basic" label="Add Title" variant="outlined" value={title} onChange={(e)=> setTitle(e.target.value)}/>
      <Button sx={{ mt: 2 }} className='border rounded' onClick = {(e)=>handleSubmit(e.target.value)}>ADD</Button>
      </Box>
    </Modal>
    <div>
    <div className='container'>
        <div className='row m-3' style={{marginTop:'100px'}}>
          <div className='col' sm={4} md={4} lg={4} xl={4}>
          {docu.map((doc) => {
                    return (
              <Card className='mt-4'>
           <CardContent>
            <Typography variant="h5" sx={{mb: 2}} color="text.primary">
            {doc.title}
            </Typography>
            <Typography variant="body2">
              <div dangerouslySetInnerHTML={{__html:doc.Value}}/>
            </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => getID(doc.id)}><CreateIcon/></Button>
              <Button size="small" onClick={(e)=>handleDelete(doc.id)}><DeleteIcon/></Button>
            </CardActions>
          </Card>
          )
        })}
          </div>
        </div>
      </div>
    </div>
    <ToastContainer
        position='top-center'
        theme='colored'
        autoClose={2000}
        />
    </>

  )
}

export default Home
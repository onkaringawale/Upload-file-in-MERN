import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
const [file, setFile] = useState();
const [images, setImages] = useState([]);
const handleUpload=()=>{
  const formData = new FormData();
  formData.append('file',file)
  axios.post('http://localhost:3001/upload',formData)
  .then(result=> console.log(result))
  .catch(err => console.log(err))
}

const handleDelete=(id)=>{debugger;
  axios.delete('http://localhost:3001/deleteImage/'+id)
  .then((res)=> console.log(res))
  .catch(err => console.log(err))
}

useEffect(()=>{
  axios.get('http://localhost:3001/getImage')
  .then((res)=> setImages(res.data))  
  .catch(err => console.log(err))
},[])

  return (
    <div className="App">
      <input type="file" name="" id="" onChange={(e)=> setFile(e.target.files[0])} />
      <button onClick={handleUpload}> upload</button>

      <br />
      { console.log(images)}
      {
        
        images.map((obj,index)=>(
          <>
          <ul>
            <li key={index}>
            <img src={`http://localhost:3001/Images/${obj.image}`} alt="" />
            <button type="button" onClick={()=>handleDelete(obj._id)}> Delete</button>
            </li>
          </ul>
          </>
        ))
      }
    </div>
  );
}

export default App;

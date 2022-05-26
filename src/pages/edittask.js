import React, { useEffect, useState } from 'react'
import { Button, Container, FormControl, InputGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/axios';
const EditTask = () => {
  const [type,setType] = useState('');
  const [typeOld,setTypeOld] = useState('');
  const [id,setId] = useState('');
  const params = useParams()
  const nav = useNavigate()
  useEffect(()=>{
    axios.get('/tasks',{params:{id:params.id}})
    .then(res=>{
      if(res.data.length>0){
          setId(res.data[0]._id);
          setTypeOld(res.data[0]._id);
          setType(res.data[0].task);
      }
    })
    .catch(err=>{
      console.log(err)
    })
  },[])
  const updateTask = ()=>{
    if(typeOld!==type){
      axios.patch(`/tasks/${id}`,{id,task:type})
      .then(res=>{
        console.log(res)
        if(res.data!==''){
          nav('/')
        }else{
          alert('lỗi')
        }
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
  return (
    <Container>
      <InputGroup className='mt-5'>
        <FormControl value={type} onChange={(e)=>{
        setType(e.target.value)
        }}/>
        <Button variant="info" onClick={()=>{
        updateTask()
        }}>Cập Nhật</Button>
        <Button onClick={()=>{
         nav('/')
        }}>Quay Về</Button>
    </InputGroup>
    </Container>
  )
}

export default EditTask
import React, { useEffect, useState } from 'react'
import { Button, Container, FormControl, InputGroup, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
const ViewTask = () => {
  const [type,setType] = useState('');
  const [task,setTask] = useState([]);
  const [taskComp,setTaskComp] = useState([]);
  const nav = useNavigate();
  useEffect(()=>{
    axios.get('/tasks')
    .then(res=>{
        setTask([...res.data])
      })
      .catch(err=>{
        console.log(err)
      })
  },[])
  const deleteTask = (id)=>{
      axios.delete(`/tasks/${id}`)
      .then(res=>{
        console.log(res)
        let id = res.data;
        let result = [];
        let taskList = [...task];
        result = taskList.filter(el=>el._id!==id);
        setTask(result)
      })
      .catch(err=>{
        console.log(err)
      })
  }
  const editTask = (id)=>{
      nav(`/edit/${id}`)
  }
  const addTask = ()=>{
      if(type===''){
        alert('vui lòng nhập')
        return;
      }
      axios.post('/tasks',{task:type})
      .then(res=>{
        let el = res.data[0];
        let taskList = [...task];
        taskList.push(el)
        setType('')
        setTask(taskList)
      })
      .catch(err=>{
        console.log(err)
      })
  }
  useEffect(()=>{
    let comp_arr = [];
    task.forEach((el,index)=>{
        comp_arr.push(<tr key={`task${el._id}`}>
          <td>{index+1}</td>
          <td>{el.task}</td>
          <td className='text-center'>
            <Button onClick={()=>{
              deleteTask(el._id);
            }}className='mr-1' variant="danger"><i className="fa-solid fa-trash-can"></i></Button>
            <Button onClick={()=>{
              editTask(el._id);
            }}variant="info"><i className="fa-solid fa-pen-to-square"></i></Button>
          </td>
        </tr>
        )
      })
      setTaskComp(comp_arr)
  },[task])
  return (
    <Container>
        <div>
        <InputGroup className='mt-5'>
            <FormControl value={type} onChange={(e)=>{
            setType(e.target.value)
            }}/>
            <Button onClick={()=>{
            addTask()
            }}>Thêm</Button>
        </InputGroup>
        </div>
        <Table striped bordered hover size="sm" className='mt-4'>
            <thead>
              <tr>
                <th width="15%">STT</th>
                <th width="70%">Task</th>
                <th widht="15%">Control</th>
              </tr>
            </thead>
            <tbody>
              {taskComp}
            </tbody>
          </Table>
    </Container>
  )
}

export default ViewTask;
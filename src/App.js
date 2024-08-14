import logo from './logo.svg';
import './App.css';
//import { BUTTON } from '@blueprintjs/core/lib/esm/common/classes';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { EditableText, InputGroup, Toaster } from '@blueprintjs/core';



const AppToaster = Toaster.create({
  position: "top"
})
function App() {
  const [users, setUsers]=useState([]);
  const [newName, setnewName] = useState("");
  const [newEmail, setnewEmail] = useState("");
  const [newWebsite, setnewWebsite] = useState("");

  useEffect(()=>{
      fetch('https://jsonplaceholder.typicode.com/users')
      .then((response)=>response.json())
      .then((json)=>setUsers(json))
  },[])
  function addUser(){
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();
    if(name && email && website){
      fetch('https://jsonplaceholder.typicode.com/users',
      {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          website
        }),
        headers: {
        "Content-Type": "application/json; charset=UTF-8 "
        }


      }
    )
    .then((response)=> response.json())
    .then(data=>{
      setUsers([...users, data]);
       AppToaster.show({
        message:"Users added sucessfully",
        intent: "success",
        timeout: 3000

       })
       setnewName("");
       setnewEmail("");
       setnewWebsite("");
    })
    }
  }
  function onChangehandler(id, key, value){
    setUsers((users)=>{
       return users.map(user=>{
          return user.id== id ?{...user, [key]:value} : user;
        })
    })
  }
  function Updateuser(id){
    const user= users.find((user)=>user.id == id);
    fetch(`https://jsonplaceholder.typicode.com/users/10`,
      {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
        "Content-Type": "application/json; charset=UTF-8 "
        }


      }
    )
    .then((response)=> response.json())
    .then(data=>{
      //setUsers([...users, data]);
       AppToaster.show({
        message:"Users update sucessfully",
        intent: "success",
        timeout: 3000

       })
       setnewName("");
       setnewEmail("");
       setnewWebsite("");
    })
  }
  function deteteUser(id){
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "DELETE",
       
        

      }
    )
    .then((response)=> response.json())
    .then(data=>{
      setUsers((users)=>{
          return  users.filter(user=> user.id !== id);
      })
      //setUsers([...users, data]);
       AppToaster.show({
        message:"Users DELETE sucessfully",
        intent: "success",
        timeout: 3000

       })
      
    })
  }
  return (
    <div className="App">
     <table>
      <thead>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Website</th>
        <th>Action</th>
      </thead>
      <tbody>
        {users.map(users=>
        <tr key={users.id}>
          <td>{users.id}</td>
          <td>{users.name}</td>
          <td><EditableText onChange={value=>onChangehandler(users.id, 'email', value)} value={users.email} /></td>
          <td><EditableText onChange={value=>onChangehandler(users.id, 'website', value)}  value={users.website} /></td>
          <td>
              <Button variant='contained' color='primary' onClick={()=>Updateuser(users.id)}>Update</Button>
              <Button variant='contained' color='error' onClick={()=>deteteUser(users.id)}>Delete</Button>
          </td>
        </tr>
        )}
      </tbody>
       <tfoot>
        <tr>
          <td></td>
          <td>
            <InputGroup
             value={newName}
             onChange={(e)=>setnewName(e.target.value)}
             placeholder='Enter Name'
            />
             </td>
            <td>
              <InputGroup
              value={newEmail}
              onChange={(e)=>setnewEmail(e.target.value)}
              placeholder='Enter Email'
              />
           
          </td>
          <td>
              <InputGroup
              value={newWebsite}
              onChange={(e)=>setnewWebsite(e.target.value)}
              placeholder='Enter Website'
              />
           
          </td>
          <td>
            <Button variant='contained' color='success' onClick={addUser}>Add User</Button>
          </td>
          
        </tr>
       </tfoot>
     </table>
    </div>
  );
}

export default App;

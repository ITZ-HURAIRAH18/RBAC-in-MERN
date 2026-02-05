import React from 'react';
import  Input from './input.jsx';
import Button from './button.jsx';
function Form() {
  function sub(e){
    e.preventDefault();
    alert("Form Submitted");
  }
  const [name,setName]=React.useState("");
  const [email,setEmail]=React.useState("");
  return (
    <>
    <form onSubmit={sub}>
    <h1>Form</h1>
<label variant="heading-6">Name:</label>
    <Input value={name} onChange={e => setName(e.target.value)} />
    <br />
    <label>Email:</label>
    <Input value={email} onChange={e => setEmail(e.target.value)}   />
    <br />
   <    Button/>
   </form>
   <br />
   <h1>Live Data</h1>
   <p>Name: {name}</p>
   <p>Email: {email}</p>
    </>

  )
}

export default Form

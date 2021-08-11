import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { auth } from './firebase';
const Signup = ({user}) => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            await auth.createUserWithEmailAndPassword(email,password);
  
          window.M.toast({html: 'Succesfully Signup', classes: 'rounded blue'});
        }
        catch(err){
          window.M.toast({html: `${err.message}`, classes: 'rounded red'});

        }
    }
    if(user){
        // console.log(user)
        return <Redirect to="/" />
    }

    return (
        <div className="center container" style={{maxWidth:"500px"}}  >
        <h4>Signup</h4>    
        <form className="input-field" onSubmit={handleSubmit} >
          
           <input placeholder="Email" type="email"  value={email} onChange={e=>setemail(e.target.value)}/>
          <input placeholder="Password"  type="password" value={password} onChange={(e=>setpassword(e.target.value))} />
          <button className="waves-effect waves-light btn" >Signup</button>

           </form>
    
       
       
       </div>
    )
}

export default Signup

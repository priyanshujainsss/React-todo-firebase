import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { auth } from "./components/firebase";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Todo from "./components/Todo";

const App = () => {
  const [isuser, setisuser] = useState(null);
  useEffect(() => {
    const unsubscribe=auth.onAuthStateChanged(user=>{
      // console.log(user)
      if(user) setisuser(user)
      else setisuser(null)
    })
    return()=>{
      unsubscribe();
    }
  }, [])

  if(isuser){
  <Redirect to="/" />
  }
  return (
    <BrowserRouter>
      <Navbar user={isuser} />
      <Switch>
        <Route exact path="/" component={()=>{
          return (<Todo user={isuser} />)
        }}  />
        <Route exact path="/login"  component={()=>{ return (<Login user={isuser} />)}} />
        <Route exact path="/signup" component={()=>(<Signup user={isuser} />)}/>
               </Switch>
    
    </BrowserRouter>
  );
};

export default App;

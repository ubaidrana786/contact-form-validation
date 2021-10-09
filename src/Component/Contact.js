import React, { useState,useEffect, useRef } from "react";

import {auth, signInWithEmailAndPassword} from "./firebase";
import {useAuthState} from "react-firebase-hooks/auth";
function Contact() {
  const emailRef = useRef();
  const passRef = useRef();

  const [email, setEmail] = useState("");
  const [emailClass, setEmailClas] = useState("");
  const [emailError,setEmailError] = useState('');
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    const val = emailRef.current.value;
   console.log(val);
}, [emailRef, passRef]);

console.log("Component Rerendered ");
console.log(emailRef)
const validateEmail =(email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
 const emailHandler = (e)=>{
   const val = emailRef.current.value;
    
   if(val.length < 3) {
    setEmailError(' email length must be greater than 3 characters.');
    setEmailClas('error')
   }
   else if(val.length > 20) {
    setEmailError(' email length must be less than 10 characters.');
    setEmailClas('error')
   }
   else if(!validateEmail(val)){
    setEmailError('Invalid email');
    setEmailClas('error')
   }else{
    setEmailClas('')
    setEmailError('');
   }
 }
  // const getUserData = (event) => {};
  // const postData = async (e) => {
  //   e.preventDefault();
  //   // const { name, email, message } = user;
  //   // if (name && email && message) {
  //   //   const res = await fetch(
  //   //     "https://contactform-1e7ec-default-rtdb.firebaseio.com/ContctFormData.json",
  //   //     {
  //   //       method: "POST",
  //   //       headers: {
  //   //         "Content-Type": "applicaiton/json",
  //   //       },
  //   //       body: JSON.stringify({
  //   //         name,
  //   //         email,
  //   //         message,
  //   //       }),
  //   //     }
  //   //   );
  //   //   if (res) {
  //   //     setuser({
  //   //       name: "",
  //   //       email: "",
  //   //       message: "",

  //   //     });
  //   //     alert("Data is Successfully submit")
  //   //   } else {
  //   //     alert("fill data")
  //   //   }
  //   // }
  // };
  return (
    <div>
      <div className="wrapper">
        <div className="inner">
          <form method="POST">
            <h3 style={{ marginBottom: "25px" }}>Contact Us</h3>

            <label className="form-group">
              <input
                type="email"
                ref={emailRef}
                className={'form-control '+ emailClass}
                name="email"
                
                 
                placeholder="Email"
                required
              />
              <span style={{color:'red'}} className="error-message">{emailError}</span>
              
              <span className="border"></span>
              
            </label>
            
            <label className="form-group">
              <textarea
                name="password"
                id=""
                ref={passRef}
                className="form-control"
                name="password"
                 
                onChange={(e) => setPassword(e.target.value)}
                required
              ></textarea>
              <span htmlFor="">Your Message</span>
              <span className="border"></span>
            </label>

            <button onClick={() => signInWithEmailAndPassword(email, password)}>
              Submit
              <i className="zmdi zmdi-arrow-right"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;

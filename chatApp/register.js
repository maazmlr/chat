import { auth,db } from "./fire.js";
import {createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { onAuthStateChanged } from "./profile.js";

let reg_btn=document.querySelector(".reg-btn");
console.log(reg_btn)
reg_btn && reg_btn.addEventListener("click",(e)=>{
  e.preventDefault()
  let reg_name=document.querySelector(".reg-name");
  let reg_email=document.querySelector(".reg-email");
  let reg_pass=document.querySelector(".reg-pass");
  createUserWithEmailAndPassword(auth, reg_email.value, reg_pass.value)
.then(async(userCredential) => {
  const user = userCredential.user;
  try{
  await setDoc(doc(db, "users", user.uid), {
      

      
      fullname: reg_name.value,
      email: reg_email.value,
      password: reg_pass.value
    });
     Swal.fire({
      icon: 'success',
      title: 'User Registered Successfully',
    })
    location.href='profile.html'
    localStorage.setItem("uid",user.uid)
  }
  catch(error){
      console.log(error)

  }
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  // ..
  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errorMessage,
    })

});


});
let login_link=document.querySelector('.login-link')
login_link.addEventListener('click',()=>{
 location.href='login.html'
})
onAuthStateChanged()
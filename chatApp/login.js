import { auth } from "./fire.js";
import { signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { onAuthStateChanged } from "./profile.js";
const login_btn=document.querySelector(".login-btn")
 console.log(login_btn)
login_btn && login_btn.addEventListener("click",(e)=>{
    e.preventDefault()
    let login_email=document.querySelector(".login-email");
    let login_pass=document.querySelector(".login-pass");


    signInWithEmailAndPassword(auth, login_email.value, login_pass.value)
  .then(async(userCredential) => {
    const user = userCredential.user;

    // ...
    Swal.fire({
        icon: 'success',
        title: 'User login Successfully',
        timer: 1500});
        location.href='profile.html'
      localStorage.setItem("uid",user.uid)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      })
  });
 });
onAuthStateChanged()
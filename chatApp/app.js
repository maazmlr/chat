import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth ,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore,doc, setDoc ,getDoc,updateDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDssB1GnXNoqOBJIoFZU6Mt2lSdY-6bkvY",
    authDomain: "chat-app-b630e.firebaseapp.com",
    projectId: "chat-app-b630e",
    storageBucket: "chat-app-b630e.appspot.com",
    messagingSenderId: "1025472916860",
    appId: "1:1025472916860:web:bb9d1a91b34867cb3e48f9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage();


  const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        const mountainsRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(mountainsRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    })
}
const getUserData = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
      let fullName = document.querySelector(".fullName")
      let email = document.querySelector(".email")
      console.log("Document data:", docSnap.data());
      fullName.value = docSnap.data().fullName;
      email.value = docSnap.data().email;
      userProfile.src = docSnap.data().picture
  } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
  }
}

onAuthStateChanged(auth, (user) => {
  let uid=localStorage.getItem("uid")
  console.log(uid)
  if (user && uid ) {


  getUserData(user.uid)    
      if(location.pathname !=='/profile.html')
      {
        location.href='profile.html'
      }}
      else{
        if(location.pathname!=='/register.html' && location.pathname!=="/login.html")
        {
          location.href='login.html'
        }
      }
});

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
        showConfirmButton: false,
        timer: 1500
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


 const login_btn=document.querySelector(".login-btn")
 console.log(login_btn)
login_btn && login_btn.addEventListener("click",(e)=>{
    e.preventDefault()
    let login_email=document.querySelector(".login-email");
    let login_pass=document.querySelector(".login-pass");


    signInWithEmailAndPassword(auth, login_email.value, login_pass.value)
  .then(async(userCredential) => {
    const user = userCredential.user;

      Swal.fire({
        icon: 'success',
        title: 'User login Successfully',
        showConfirmButton: false,
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

 const logoutBtn = document.querySelector(".logout-btn")

logoutBtn && logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        localStorage.clear()
        location.href = "register.html"
    }).catch((error) => {
        // An error happened.
    });

})


const updateProfile = document.querySelector(".update-btn");

updateProfile && updateProfile.addEventListener("click", async () => {
    let uid = localStorage.getItem("uid")
    let fullName = document.querySelector(".fullName")
    let email = document.querySelector(".email")
    const imageUrl = await uploadFile(fileInput.files[0])
    const washingtonRef = doc(db, "users", uid);
    await updateDoc(washingtonRef, {
        fullName: fullName.value,
        email: email.value,
        picture: imageUrl
    });
    Swal.fire({
        icon: 'success',
        title: 'User updated successfully',
    })
})
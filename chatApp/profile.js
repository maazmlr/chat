import { auth,db,storage } from "./fire.js";
import { onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

import { getFirestore,doc, setDoc ,getDoc,updateDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";


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
let userProfile=document.querySelector(".img")
console.log(userProfile)
var em=null;
var full=null
const getUserData = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
      let fullName = document.querySelector(".fullname")
      let email = document.querySelector(".email")
      console.log("Document data:", docSnap.data());
         full=docSnap.data().fullname
         em=docSnap.data().email;
      fullName.value = full;
      email.value = em;
      if (docSnap.data().picture){
      userProfile.src = docSnap.data().picture}
      else{
        userProfile.src = 'user,img.png'
      }
  } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
  }
  console.log(em,full)
  return [em,full]
}

onAuthStateChanged(auth, (user) => {
  let uid=localStorage.getItem("uid")
  console.log(uid)
  if (user && uid ) {


  getUserData(user.uid)    
      if(location.pathname !=='/profile.html' && location.pathname !== '/chat.html')
      {
        location.href='profile.html'
      }}

    else{
        if(location.pathname!=='/index.html' && location.pathname!=="/login.html")
        {
          location.href='index.html'
        }
      }
});
const logoutBtn = document.querySelector(".logout-btn")

logoutBtn && logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        localStorage.clear()
        location.href = "index.html"
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
let chatImg=document.querySelector(".chat-img")
chatImg && chatImg.addEventListener('click',()=>{
    location.href='chat.html'

})

export{
    onAuthStateChanged
}
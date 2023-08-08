import{db} from './fire.js'
import { onAuthStateChanged } from "./profile.js";
import { doc,getDoc,collection,onSnapshot, query, where,orderBy, getDocs,serverTimestamp,addDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
let name=document.querySelector("h4")
const a=async () => {
     onAuthStateChanged()}
    a
let uid=localStorage.getItem("uid")

const getUsername= async()=>{
    const docRef = doc(db, "users", uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  name.innerHTML=docSnap.data().fullname
  let email=docSnap.data().email;
  getAllData(email)
  
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
}
const userList=document.getElementById('list-user')
getUsername()

let userId
const getAllData=async(email)=>{


const q = query(collection(db, "users"), where("email", "!=", email));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  userList.innerHTML+=`
  <li onclick="select('${doc.data().fullname}','${doc.id}')" class="list-group-item d-flex justify-content-between align-items-start">
  <div class="ms-2 me-auto">
      <div class="fw-bold">${doc.data().fullname}</div>
      <div class="fw">${doc.data().email}</div>
      
  </div>
</li>
  `
});}

const select=(name,use)=>{
    userId=use
    let cur=localStorage.getItem('uid')

    let chatId;
    if (cur < userId){
        chatId=cur+userId
    }
    else{
        chatId=userId+cur;
    }
    console.log(chatId)
    getAllmessages(chatId)
    let sel=document.querySelector('.sname');
    sel.innerHTML=name
    console.log(name)
    console.log(userId)
}


window.select=select

let msgInp=document.getElementById('msg-inp')

msgInp.addEventListener('keydown',async(e)=>{
if(e.keyCode==13){
    
    let cur=localStorage.getItem('uid')

    let chatId;
    if (cur < userId){
        chatId=cur+userId
    }
    else{
        chatId=userId+cur;
    }
    console.log(chatId)
    const docRef = await addDoc(collection(db, "messages"), {
        ID: chatId,
        message: msgInp.value,
        timestamp: serverTimestamp(),
        sender:cur,
        receiver:userId

      });
      msgInp.value=''
      console.log("Document written with ID: ", docRef.id);
}
})


const getAllmessages=(chatID)=>{
    let cur=localStorage.getItem('uid')

    const chatbox=document.getElementById('chat-box')
    const q = query(collection(db, "messages"),orderBy('timestamp'), where("ID", "==", chatID));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
     });
     chatbox.innerHTML=''
     for(var  i=0;i<messages.length;i++){
    if (cur===messages[i].sender){
        chatbox.innerHTML+=`<div class="message-box left-message">
            ${messages[i].message}
            <div>${moment(messages[i].timestamp.toDate()).fromNow()}</div>
        </div>
        `
        
    }
    else{    
    `<div class="message-box right-message fw-bold">
        ${messages[i].message}
        <div>${moment().startOf('').fromNow()}</div>
        </div>`
       
        }
    console.log("messages ",messages);
     }
});
}
// SlZ8cOdYkeQEFiciVvVtSIwkWxB3XIUO1pMiqtY1mRirNlVbAPgJjj32

console.log(moment().startOf('').fromNow())
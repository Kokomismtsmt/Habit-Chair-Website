import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getDatabase, set, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js'
import { getFirestore, collection, addDoc, getDocs }  from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyATJoidVLlpVf4au5cuE1e1Yc1E7kYj6HU",
  authDomain: "khohzongeu-messaging.firebaseapp.com",
  databaseURL: "https://khohzongeu-messaging-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "khohzongeu-messaging",
  storageBucket: "khohzongeu-messaging.appspot.com",
  messagingSenderId: "464292880544",
  appId: "1:464292880544:web:238949ba4fc19858c029c5",
  measurementId: "G-P46XQWYSTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const firestore = getFirestore(app);



const colRef = collection(firestore, 'history');


function timer(){
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var sec = currentTime.getSeconds()
    
    if (minutes < 10){
        minutes = "0" + minutes
    }
    if (sec < 10){
        sec = "0" + sec
    }
    var t_str = hours + ":" + minutes + ":" + sec + " ";
    document.getElementById('time').innerHTML = t_str;
    setTimeout(timer,1000);

    


    }

onValue(ref(database,'message/'),(snapshot) => {
    const data = snapshot.val();
    document.getElementById('history-box').innerText = "";
    for(let key in data){
    const { message } = data;
    document.getElementById('history-box').innerText += `${message} \n`
    }
});



function add(){
    var currentTime = new Date()
    var hours = currentTime.getHours()

    if(hours == 23){
        var start = true;
    }

    if (start == true){
    addDoc(colRef, {
        sittingtime: "110",
        violations: "9",
     });

     var start = false;
     setTimeout(add,1800000)
    }

}
timer();
add();
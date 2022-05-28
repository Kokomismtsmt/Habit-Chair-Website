import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getDatabase, set, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js'
import { getFirestore, query, collection, addDoc, getDocs, onSnapshot }  from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

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

async function readmultipleDocument(){
    const historyDataRef = query(colRef);
    
    const querySnapshot = await getDocs(historyDataRef);
    const allDocs = querySnapshot.forEach((snap) => {
        var historyData = snap.data();

        

        console.log(`${JSON.stringify(historyData)}`);
        document.getElementById('history-box').innerText += `${JSON.stringify(snap.data())} \n`;
    })
}
// const readHistory = async (data) => {
//     const snapshot = await firestore.collection('history').where('date', '==', datatime).get();


//     const history = {
//         id: doc.id ,...doc.data(),
//     }

//     console.log(history)
//}
    



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

function timeCheck(){
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()

    function add(){
        onValue(ref(database,'data/Time'), (snapshot) => {
            const time = snapshot.val().Hours;
            
        onValue(ref(database,'data/violations'), (snapshot) => {
            const vio = snapshot.val().times;
        
            
            addDoc(colRef, {
                sittingtime: time,
                violations: vio,
            });
            });
        });
    }

    var trigger = hours + minutes;
    // var trigger = 82

    if(trigger == 82){
        add();
    }

    setTimeout(timeCheck,60000);

}

// document.getElementById('send-button').addEventListener('click', readHistory)

timer();
timeCheck();
readmultipleDocument();
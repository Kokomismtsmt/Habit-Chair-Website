import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getDatabase, set, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js'
import { getFirestore, query, collection, addDoc, getDocs, onSnapshot }  from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAHmdwFtSJ7YgBuNHSVdR9mTFHPBYi3Ta4",
    authDomain: "habit-chair.firebaseapp.com",
    databaseURL: "https://habit-chair-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "habit-chair",
    storageBucket: "habit-chair.appspot.com",
    messagingSenderId: "49817452985",
    appId: "1:49817452985:web:74ee05a89d9e22c3bd3668",
    measurementId: "G-XKVYRZ7BPJ"
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
        var rawdata = JSON.stringify(snap.data());
        var stringData = rawdata.toString();
        const resultDate = /date\":\"([\d]+\/[\d]+)\"/i.exec(rawdata);
        const resultViolations = /violations\"\:([\d]+)/i.exec(rawdata);
        const resultsittingtime = /sittingtime\"\:([\d]+)/i.exec(rawdata);

        if ((resultDate == null)||(resultsittingtime == null)||(resultViolations == null)) { return; }
        console.log(resultDate[1]);
        console.log(resultViolations[1]);
        console.log(resultsittingtime[1]);
        
        document.getElementById('history-date').innerText += '\n' + resultDate[1] ;
       document.getElementById('history-sittingTime').innerText += '\n' + resultsittingtime[1] + ' Hours';
      document.getElementById('history-violations').innerText += '\n' + resultViolations[1] + 'times'; 
   });
       
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
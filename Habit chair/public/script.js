import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js'
import { getDatabase, set, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js'


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

//-----------------------define img changeing variables------------------
var imgSources = ["occupied.png", "unoccupied.png"]
var index = 0;

//--------------------------------------show sitting time--------------------------------

onValue(ref(database,'data/time'), (snapshot) => {
  const time = snapshot.val().hours;

  if(time > 0){
    document.getElementById("total-time").innerHTML = 'Sitting time: ' + time + ' hour';
  }else if(time > 1){
    document.getElementById("total-time").innerHTML = 'Sitting time: ' + time + ' hours';
  }else{
    document.getElementById("total-time").innerHTML = 'Sitting time: N/A';
  }

});

//-------------------------------show violations-------------------------------

onValue(ref(database,'data/violations'), (snapshot) => {
  const vio = snapshot.val().times;

  if (vio == 1){
    document.getElementById("total-vio").innerHTML = 'Violations: ' + vio + ' time';
  }else if(vio > 1){ 
    document.getElementById("total-vio").innerHTML = 'Violations: ' + vio + ' times';    
  }else{
    document.getElementById("total-vio").innerHTML = 'Violations: None';
  }
});

//----------------------------show chair online status-----------------------------

onValue(ref(database,'data/online'), (snapshot) => {
  const online = snapshot.val().state;

  if (online == true){
    document.getElementById('online-state').innerHTML = "Chair status: Online"
  }else{
    document.getElementById('online-state').innerHTML = "Chair status: Offline"
  }
})

//------------------------------------show occupancy-----------------------------

onValue(ref(database,'data/occupancy'), (snapshot) => {
  const occupancy = snapshot.val().status;

  if (occupancy == true){
    document.getElementById('statusImg').src = imgSources [0];

  
    document.getElementById('seat-occupancy-txt').innerHTML = "Occupied"
  }else{
    document.getElementById('statusImg').src = imgSources [1];


    document.getElementById('seat-occupancy-txt').innerHTML = "Not Occupied"
}
});

function update(){

  var timer = setInterval(function(){
    set(ref(database, 'data/occupancy'),{
      status: 0
    })

    set(ref(database, 'data/online'),{
      state: 0
    })
  },60000);
}

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

// calling functions


timer();
update();
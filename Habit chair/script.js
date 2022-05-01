import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js'
import { getDatabase, set, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js'


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

// push(ref(database, 'message/'), 'hi')

// read the data
onValue(ref(database,'data/Time'), (snapshot) => {
  const time = snapshot.val().Hours;

  if(time < 2){
    document.getElementById("total-time").innerHTML = 'Time: ' + time + ' hour';
  }else{
    document.getElementById("total-time").innerHTML = 'Time: ' + time + ' hours';
  }

});

onValue(ref(database,'data/violations'), (snapshot) => {
  const vio = snapshot.val().times;

  if (vio < 2){
    document.getElementById("total-vio").innerHTML = 'Violations: ' + vio + ' time';
  }else{
    document.getElementById("total-vio").innerHTML = 'Violations: ' + vio + ' times';
  }
});

onValue(ref(database,'data/occupancy'), (snapshot) => {
  const occupancy = snapshot.val().Status;

  if (occupancy == true){
    var img = document.createElement("img");
    img.src = "occupied.png";

    var div = document.getElementById("seat-occupancy-img");
    div.appendChild(img);
    document.getElementById('seat-occupancy-txt').innerHTML = "Occupied"
  }
  else{
    var img = document.createElement("img");
    img.src = "unoccupied.png";

    var div = document.getElementById("seat-occupancy-img");
    div.appendChild(img);
    document.getElementById('seat-occupancy-txt').innerHTML = "Not Occupied"
}
});

//show img


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

//time reset for day
  if(hours == 23){
    set(ref(database,'message/reset/'), {
      State: "1"
  })
}else{
  set(ref(database,'message/reset/'), {
    State: "0"
  })
}
}

// calling functions


timer();

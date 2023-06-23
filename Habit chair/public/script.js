import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js'
import { getDatabase, set, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js'


const firebaseConfig = {
  apiKey: "AIzaSyCHYnt2NQLlJZCk2ggp3lF1pM_b6cC5mH4",
  authDomain: "habit-chair-2-0.firebaseapp.com",
  databaseURL: "https://habit-chair-2-0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "habit-chair-2-0",
  storageBucket: "habit-chair-2-0.appspot.com",
  messagingSenderId: "26305165486",
  appId: "1:26305165486:web:90f13026582195e077153f",
  measurementId: "G-1RHYCWRFQY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


//-----------------------define img changeing variables------------------
var imgSources = ["occupied.png", "unoccupied.png","triangle.png"]
var index = 0;

//--------------------------------------show sitting time--------------------------------

onValue(ref(database,'data/time'), (snapshot) => {
  const time = snapshot.val().hour;

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
  const vio = snapshot.val().time;

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

// -------------------------------------front right leg----------------------------

onValue(ref(database,'chair/legs'), (snapshot) => {
  const frontR = snapshot.val().frontright;
  
  if(frontR > 1000){
    document.getElementById('trianglefR').style.borderBottom = "20px solid red"
  }else if(frontR <= 1000){
   document.getElementById('trianglefR').style.borderBottom = "20px solid green"
  }
});

// --------------------------------------front left leg----------------------------

onValue(ref(database,'chair/legs'), (snapshot) => {
  const frontL = snapshot.val().frontleft;
  

  if(frontL > 1000){
    document.getElementById('trianglefL').style.borderBottom = "20px solid red"
  }else if(frontL <= 1000){
   document.getElementById('trianglefL').style.borderBottom = "20px solid green"
  }
});

// // // // --------------------------------------back right leg----------------------------
onValue(ref(database,'chair/legs'), (snapshot) => {
  const backR = snapshot.val().backright;

   if(backR > 1000){
     document.getElementById('trianglebR').style.borderBottom = "20px solid red"
   }else if(backR <= 1000){
    document.getElementById('trianglebR').style.borderBottom = "20px solid green"
   }
 });

// // // // ---------------------------------------back left leg---------------------------
onValue(ref(database,'chair/legs'), (snapshot) => {
  const backL = snapshot.val().backleft;

  if(backL > 1000){
    document.getElementById('trianglebL').style.borderBottom = "20px solid red"
  }else if(backL <= 1000){
   document.getElementById('trianglebL').style.borderBottom = "20px solid green"
  }
});

//---------------------------graph---------------------------------------------------
onValue(ref(database, 'chair/legs'), (snapshot) => {
  const backL = parseInt(snapshot.val().backleft);
  const backR = parseInt(snapshot.val().backright);
  const frontL = parseInt(snapshot.val().frontleft);
  const frontR = parseInt(snapshot.val().frontright);

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Front Right', 'Front Left', 'Back Right', 'Back Left'],
        datasets: [{
          label: 'Weight(N)',
          data: [backL, backR, frontL, frontR],
          borderWidth: 5,
          backgroundColor: ['#CFB284', '#DFCAA0', '#F6E3BA', '#FFEFCB']
        }]
      }
    });
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

const toggleSwitch = document.getElementById('toggle-switch');

toggleSwitch.addEventListener('change', function() {
  if (this.checked) {
    // Toggle switch is ON
    // Perform actions for ON state
  } else {
    // Toggle switch is OFF
    // Perform actions for OFF state
  }
});


// calling functions


timer();
update();
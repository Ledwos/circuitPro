var store = {
  msi: 0,
  si: [0],
  mi: [0]
}

//user input (increment)

//scroll test

document.addEventListener("wheel", function(event) {

  var spanId = null;
  var spanNum = null;

  if (event.target.nodeName == "SPAN") {
    spanId = String(event.target.id).substring(0,2);
    spanNum = String(event.target.id).slice(-1);
  }

  if (spanId == "mi" | spanId == "si") {
    // console.log(store[spanId][0]);
    if (event.deltaY < 0 ) {
      store[spanId][spanNum] = store[spanId][spanNum] + 1;
      // spanId == "mi" ?  min = store.mi[0] : sec = store.si[0]; //potential fix? can't test till I update timer
      document.getElementById(event.target.id).innerHTML = checkTime(store[spanId][spanNum]);
    } else if (event.deltaY > 0) {
      store[spanId][spanNum] === 0 ? store[spanId][spanNum] = 0 : store[spanId][spanNum] = store[spanId][spanNum] - 1;
      // spanId == "mi" ?  min = store[spanId][0] : sec = store[spanId][0]; //potential fix? can't test till I update timer
      document.getElementById(event.target.id).innerHTML = checkTime(store[spanId][spanNum]);
    }
  }

})

// min scroll

// document.getElementById("min").addEventListener("wheel", function incMin(event) {
//   if (event.deltaY < 0 ) {
//     store.mi[0] = store.mi[0] + 1;
//     min = store.mi[0];
//     document.getElementById("min").innerHTML = checkTime(store.mi[0]);
//   } else if (event.deltaY > 0) {
//     store.mi[0] === 0 ? store.mi[0] = 0 : store.mi[0] = store.mi[0] - 1;
//     document.getElementById("min").innerHTML = checkTime(store.mi[0]);
//     min = store.mi[0];
//   }

// });

// // sec scroll

// document.getElementById("sec").addEventListener("wheel", function incSec(event) {
//   if (event.deltaY < 0 ) {
//     store.si[0] = store.si[0] + 1;
//     sec = store.si[0];
//     document.getElementById("sec").innerHTML = checkTime(store.si[0]);
//   } else if (event.deltaY > 0) {
//     store.si[0] === 0 ? store.si[0] = 0 : store.si[0] = store.si[0] - 1;
//     document.getElementById("sec").innerHTML = checkTime(store.si[0]);
//     sec = store.si[0];
//   }

// });

// start / stop button

var startstop = 0;

function startStop() { /* Toggle StartStop */

  startstop = startstop + 1;

  if (startstop === 1) {
    start();
    document.getElementById("start").innerHTML = "Stop";
  } else if (startstop === 2) {
    document.getElementById("start").innerHTML = "Start";
    startstop = 0;
    stop();
  }

}

// My version

//store contains initial value for miliseconds as well as what will become user input

function start() {
  msec = 0;
  sec = store.si[0];
  min = store.mi[0];
  lap = 0;
  strt = setInterval(timer, 10);
}

function stop() {
  clearInterval(strt);
}

var cTrack = 0;
var msec = 0;
var sec = store.si[0];
var min = store.mi[0];
var lap = 0;

var msout = 0;
var sout = 0;
var mout = 0;
var lout = 0;

function timer() {
  msout = checkTime(msec);
  sout = checkTime(sec);
  mout = checkTime(min);
  lout = lap;
  
  if (sec === 0 & min === 0 & msec === 0) {
    msec = store.msi;
    sec = store.si[cTrack];
    min = store.mi[cTrack];
    lap = ++lap;
    cTrack === store.si.length - 1 ? cTrack = parseInt(0) : cTrack = ++cTrack;
  }

  if (sec === 0 & msec === 0 & min !== 0) {
    min = --min;
    sec = 59;
    msec = 100
  }
  
  if (msec === 0) {
    msec = 100;
    sec = --sec;
  }

  msec = --msec;

  document.getElementById("milisec").innerHTML = msout;
  document.getElementById("sec").innerHTML = sout;
  document.getElementById("min").innerHTML = mout;
  document.getElementById("lapCount").innerHTML = lout;

  setText(lout);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

//   /*Reset*/
  function reset() {

  msec = 0;
  sec = store.si[0];
  min = store.mi[0];
  lap = 0;

  document.getElementById("milisec").innerHTML = checkTime(msec);
  document.getElementById("sec").innerHTML = checkTime(sec);
  document.getElementById("min").innerHTML = checkTime(min);
  document.getElementById("lapCount").innerHTML = lap;
  document.getElementById("set").innerHTML = "Ready?";
}

// conditional set text 

function setText(lout) {
  if (lout === 0 || lout % 2  === 0) {
    document.getElementById("set").innerHTML = "RUN";
  } else {
    document.getElementById("set").innerHTML = "REST";
  }
}


// dis tha'ng werks:

// function myFunction() {
//   var btn = document.createElement("div");
//   btn.setAttribute("id","testDiv");
//   var spanner = document.createElement("span");
//   spanner.innerHTML = "I work";
//   document.body.appendChild(btn);  document.getElementById("testDiv").appendChild(spanner);
// }

// yasss queen

// generate additional timer (to build circuit)

function addTimer() {

  //extend store arrays to accomodate no. of timers
  store.mi.push(0);
  store.si.push(0);

  //make unique span id's
  var idNum = document.querySelectorAll('.interval').length;
  var minId = "mi" + idNum;
  var secId = "si" + idNum;
  var msecId = "msi" + idNum;

  //make all elements
  var tim = document.createElement("h1");
  tim.setAttribute("class", "interval");
  var mspan = document.createElement("span");
  mspan.setAttribute("id", `${minId}`);
  mspan.innerHTML = "00";
  var sspan = document.createElement("span");
  sspan.setAttribute("id", `${secId}`);
  sspan.innerHTML = "00";
  var msspan = document.createElement("span");
  msspan.setAttribute("id", `${msecId}`);  
  msspan.innerHTML = "00";
  
  //render elements in their appropriate places
  tim.innerHTML += mspan.outerHTML + " : " + sspan.outerHTML + " : " + msspan.outerHTML;
  document.getElementById("timeBox").appendChild(tim);

}
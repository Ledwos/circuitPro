var store = {
  msi: 0,
  si: 0,
  mi: 0
}

//user input (increment)

// min scroll

document.getElementById("min").addEventListener("wheel", function incMin(event) {
  if (event.deltaY < 0 ) {
    store.mi = store.mi + 1;
    min = store.mi;
    document.getElementById("min").innerHTML = checkTime(store.mi);
  } else if (event.deltaY > 0) {
    store.mi === 0 ? store.mi = 0 : store.mi = store.mi - 1;
    document.getElementById("min").innerHTML = checkTime(store.mi);
    min = store.mi;
  }

});

// sec scroll

document.getElementById("sec").addEventListener("wheel", function incSec(event) {
  if (event.deltaY < 0 ) {
    store.si = store.si + 1;
    sec = store.si;
    document.getElementById("sec").innerHTML = checkTime(store.si);
  } else if (event.deltaY > 0) {
    store.si === 0 ? store.si = 0 : store.si = store.si - 1;
    document.getElementById("sec").innerHTML = checkTime(store.si);
    sec = store.si;
  }

});

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
  strt = setInterval(timer, 10);
}

function stop() {
  clearInterval(strt);
}

var msec = store.msi;
var sec = store.si;
var min = store.mi;
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
    msec = store.si;
    sec = store.si;
    min = store.mi;
    lap = ++lap;
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
  sec = store.si;
  min = store.mi;
  lap = 0;

  document.getElementById("milisec").innerHTML = checkTime(store.msi);
  document.getElementById("sec").innerHTML = checkTime(store.si);
  document.getElementById("min").innerHTML = checkTime(store.mi);
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

  //make all elements
  var tim = document.createElement("h1");
  tim.setAttribute("id", "testTimer");
  var mspan = document.createElement("span");
  mspan.setAttribute("id", "min1");
  mspan.innerHTML = "00";
  var sspan = document.createElement("span");
  sspan.setAttribute("id", "sec1");
  sspan.innerHTML = "00";
  var msspan = document.createElement("span");
  msspan.setAttribute("id", "msec1");  
  msspan.innerHTML = "00";
  
  //render elements in their appropriate places
  tim.innerHTML += mspan.outerHTML + " : " + sspan.outerHTML + " : " + msspan.outerHTML;
  document.body.appendChild(tim);

}
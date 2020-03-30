var x;
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


// function start() {
//   x = setInterval(timer, 10);
// } /* Start */

// function stop() {
//   clearInterval(x);
// } /* Stop */

// var milisec = 0;
// var sec = 0; /* holds incrementing value */
// var min = 0;
// var hour = 0;

// /* Contains and outputs returned value of  function checkTime */

// var miliSecOut = 0;
// var secOut = 0;
// var minOut = 0;
// var hourOut = 0;

// /* Output variable End */


// function timer() {
//   /* Main Timer */


//   miliSecOut = checkTime(milisec);
//   secOut = checkTime(sec);
//   minOut = checkTime(min);
//   hourOut = checkTime(hour);

//   milisec = ++milisec;

//   if (milisec === 100) {
//     milisec = 0;
//     sec = ++sec;
//   }

//   if (sec == 60) {
//     min = ++min;
//     sec = 0;
//   }

//   if (min == 60) {
//     min = 0;
//     hour = ++hour;

//   }


//   document.getElementById("milisec").innerHTML = miliSecOut;
//   document.getElementById("sec").innerHTML = secOut;
//   document.getElementById("min").innerHTML = minOut;
//   document.getElementById("hour").innerHTML = hourOut;

// }


// /* Adds 0 when value is <10 */


// function checkTime(i) {
//   if (i < 10) {
//     i = "0" + i;
//   }
//   return i;
// }

// function reset() {


//   /*Reset*/

//   milisec = 0;
//   sec = 0;
//   min = 0
//   hour = 0;

//   document.getElementById("milisec").innerHTML = "00";
//   document.getElementById("sec").innerHTML = "00";
//   document.getElementById("min").innerHTML = "00";
//   document.getElementById("hour").innerHTML = "00";

// }

// My version

//store contains initial value for miliseconds as well as what will become user input

var store = {
  msi: 100,
  si: 5,
  mi: 0
}

function start() {
  strt = setInterval(timer, 10);
}

function stop() {
  clearInterval(strt);
}

var msec = store.msi;
var sec = store.si - 1;
var min = store.mi;

var msout = 0;
var sout = 0;
var mout = 0;

function timer() {
  msout = checkTime(msec);
  sout = checkTime(sec);
  mout = checkTime(min);

  msec = --msec;

  if (sec === 0 & min === 0 & msec === 0) {
    msec = 0;
    sec = store.si;
    mout = store.mi;
  }

  if (msec === 0) {
    msec = 100;
    sec = --sec;
    console.log(store.si);
  }

  if (sec === 0 & min !== 0) {
    sec = 60;
    msec = 100
    min = --min;
  }

  document.getElementById("milisec").innerHTML = msout;
  document.getElementById("sec").innerHTML = sout;
  document.getElementById("min").innerHTML = mout;
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

//   /*Reset*/
  function reset() {

  msec = 100;
  sec = store.si - 1;
  min = store.mi;

  document.getElementById("milisec").innerHTML = '00';
  document.getElementById("sec").innerHTML = checkTime(store.si);
  document.getElementById("min").innerHTML = checkTime(store.mi);
}
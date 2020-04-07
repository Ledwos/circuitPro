var store = {
  ai: [0],
  si: [0],
  mi: [0]
}


//update activity input on change

// window.onload = function() {
//   const actiBox = document.querySelectorAll("input")
  
//   actiBox.addEventListener("change", (event) => {
//     // var aStr = String(event.target.id).substring(0,2);
//     var aNum = String(event.target.id).slice(-1)
//     // console.log(aNum);
//     var aText = String(event.target.value);
//     console.log(aText);
    
//     store.ai[aNum] = aText;
//   })
// }


document.addEventListener("change", (event) => {

  if (event.target.nodeName == "INPUT") {
    var aNum = event.target.id.slice(-1);
    var aStr = String(event.target.id).substring(0,2);
    var aText = event.target.value;
    console.log(`Id: ${aStr}${aNum}, aText: ${aText}`);

    if (aStr == "ai") {
      store.ai[aNum] = String(aText);
    }

    if (aStr == "mi") {
      if (parseInt(aText) > 99) {
        store.mi[aNum] = 99;
      } else if (parseInt(aText) < 0) {
        store.mi[aNum] = 0;
      } else if (aText == "") {
        store.mi[aNum] = 0;
      } else {
        store.mi[aNum] = parseInt(aText);
      }
    }

    if (aStr == "si") {
      if (parseInt(aText) > 59) {
        store.si[aNum] = 59;
      } else if (parseInt(aText) < 0) {
        store.si[aNum] = 0;
      } else if (aText == "") {
        store.si[aNum] = 0;
      } 
      else {
        store.si[aNum] = parseInt(aText);
      }
    }
    
  }
  
})

//user input (scroll increment)

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

// start / stop button

var startstop = 0;

function startStop() { /* Toggle StartStop */
  store.si[0] == 0 & store.mi[0] == 0 ? alert("Fill out atleast 1 timer") : startstop = startstop + 1;
  if (startstop === 1) {
    start();
    document.getElementById("start").innerHTML = "Stop";
  } else if (startstop === 2) {
    document.getElementById("start").innerHTML = "Start";
    startstop = 0;
    stop();
  }

}

var tim0 = false

function start() {
    initial()
    strt = setInterval(timer, 10);
}

// updates the timer with first set of user input values ONCE
function initial() {
  if (!tim0) {
    activity = store.ai[0];
    msec = 0;
    sec = store.si[0];
    min = store.mi[0];
    // lap = 0;
    tim0 = true;
  }
  
}

function stop() {
  clearInterval(strt);
}

// timer variables
var cTrack = 0;
var activity = store.ai[0];
var msec = 0;
var sec = store.si[0];
var min = store.mi[0];
var lap = 0;

// var msout = 0;
// var sout = 0;
// var mout = 0;
// var lout = 0; don't need these here? works as intended with the var being declared within the timer function

var msout = checkTime(msec);
var sout = checkTime(sec);
var mout = checkTime(min);
var aout = activity;
var lout = lap;


function timer() {
  msout = checkTime(msec);
  sout = checkTime(sec);
  mout = checkTime(min);
  aout = activity;
  lout = lap;

  
  if (sec === 0 & min === 0 & msec === 0) {
    cTrack === store.si.length - 1 ? (cTrack = parseInt(0), lap = ++lap) : cTrack = ++cTrack;
    msec = 0;
    sec = store.si[cTrack];
    min = store.mi[cTrack];
    activity = store.ai[cTrack];
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
  document.getElementById("set").innerHTML = aout;
  // setText(lout);
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
  tim0 = false;

  document.getElementById("milisec").innerHTML = checkTime(msec);
  document.getElementById("sec").innerHTML = checkTime(sec);
  document.getElementById("min").innerHTML = checkTime(min);
  document.getElementById("lapCount").innerHTML = lap;
  document.getElementById("set").innerHTML = "Ready?";
}

// conditional set text 

// function setText(lout) {
//   if (lout === 0 || lout % 2  === 0) {
//     document.getElementById("set").innerHTML = "RUN";
//   } else {
//     document.getElementById("set").innerHTML = "REST";
//   }
// }

// generate additional timer (to build circuit)

function addTimer() {

  //extend store arrays to accomodate no. of timers
  store.ai.push(0);
  store.mi.push(0);
  store.si.push(0);

  //make unique span id's
  var idNum = document.querySelectorAll('.interval').length;
  var minId = "mi" + idNum;
  var secId = "si" + idNum;
  var msecId = "msi" + idNum;

  //make all elements
  var timBox = document.createElement("div");
  timBox.setAttribute("class", "timeBox");
  timBox.setAttribute("id", `t${idNum}`);
  var divLeft = document.createElement("div");
  divLeft.setAttribute("class", "timLeft");
  var divRight = document.createElement("div");
  divRight.setAttribute("class", "timRight");
  var remBtn = document.createElement("button");
  remBtn.setAttribute("id", `rem${idNum}`);
  remBtn.setAttribute("onclick","remDiv(this.id)");
  remBtn.innerHTML = "X";
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
  var actInput = document.createElement("input");
  actInput.setAttribute("class", "activityBox");
  actInput.setAttribute("id", `ai${idNum}`);
  actInput.setAttribute("type", "text");
  actInput.setAttribute("placeholder", "activity");
  
  //render elements in their appropriate places
  tim.innerHTML += mspan.outerHTML + " : " + sspan.outerHTML + " : " + msspan.outerHTML;
  divLeft.innerHTML += remBtn.outerHTML;
  divRight.innerHTML += tim.outerHTML + actInput.outerHTML;
  timBox.innerHTML += divLeft.outerHTML + divRight.outerHTML;
  document.getElementById("UiBox").appendChild(timBox);

}

//removeButton - deletes timer
function remDiv(remId) {
  var btnId = String(remId).slice(-1);
  var timId = String("t" + btnId);
  document.getElementById(timId).remove();
}



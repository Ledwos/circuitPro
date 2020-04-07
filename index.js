var store = {
  ai: [0],
  si: [0],
  mi: [0]
}

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
        document.getElementById(event.target.id).value = store.mi[aNum];
      } else if (parseInt(aText) < 0) {
        store.mi[aNum] = 0;
        document.getElementById(event.target.id).value = store.mi[aNum];
      } else if (aText == "") {
        store.mi[aNum] = 0;
        document.getElementById(event.target.id).value = store.mi[aNum];
      } else {
        store.mi[aNum] = parseInt(aText);
      }
    }

    if (aStr == "si") {
      if (parseInt(aText) > 59) {
        store.si[aNum] = 59;
        document.getElementById(event.target.id).value = store.si[aNum];
      } else if (parseInt(aText) < 0) {
        store.si[aNum] = 0;
        document.getElementById(event.target.id).value = store.si[aNum];
      } else if (aText == "") {
        store.si[aNum] = 0;
        document.getElementById(event.target.id).value = store.si[aNum];
      } 
      else {
        store.si[aNum] = parseInt(aText);
      }
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
    lap = 0;
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

function addTimer() {

  //extend store arrays to accomodate no. of timers
  store.ai.push(0);
  store.mi.push(0);
  store.si.push(0);

  //make unique span id's
  var idNum = document.querySelectorAll('.interval').length;
  var minId = "mi" + idNum;
  var secId = "si" + idNum;

  //make all elements
  var timBox = document.createElement("div");
  timBox.setAttribute("class", "timeBox");
  timBox.setAttribute("id", `t${idNum}`);
  var divTop = document.createElement("div");
  divTop.setAttribute("class", "timTop");
  var divBot = document.createElement("div");
  divBot.setAttribute("class", "timBot");
  var remBtn = document.createElement("button");
  remBtn.setAttribute("id", `rem${idNum}`);
  remBtn.setAttribute("onclick","remDiv(this.id)");
  remBtn.innerHTML = "X";
  var tim = document.createElement("h3");
  tim.setAttribute("class", "interval");
  var mInput = document.createElement("input");
  mInput.setAttribute("type", "number");
  mInput.setAttribute("id", `${minId}`);
  mInput.setAttribute("min", "0");
  mInput.setAttribute("max", "99");
  mInput.setAttribute("placeholder", "00");
  var sInput = document.createElement("input");
  sInput.setAttribute("type", "number");
  sInput.setAttribute("id", `${secId}`);
  sInput.setAttribute("min", "0");
  sInput.setAttribute("max", "59");
  sInput.setAttribute("placeholder", "00");
  var actInput = document.createElement("input");
  actInput.setAttribute("class", "activityBox");
  actInput.setAttribute("id", `ai${idNum}`);
  actInput.setAttribute("type", "text");
  actInput.setAttribute("placeholder", "activity");

  //render elements in their appropriate places
  tim.innerHTML += mInput.outerHTML + " : " + sInput.outerHTML;
  divTop.innerHTML += remBtn.outerHTML;
  divBot.innerHTML += tim.outerHTML + actInput.outerHTML;
  timBox.innerHTML += divTop.outerHTML + divBot.outerHTML;
  document.getElementById("UiBox").appendChild(timBox);
}

//removeButton - deletes timer
function remDiv(remId) {
  var btnId = String(remId).slice(-1);
  var timId = String("t" + btnId);
  document.getElementById(timId).remove();
}



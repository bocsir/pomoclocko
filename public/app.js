document.addEventListener("DOMContentLoaded", event => {
    //start with zero values
    document.getElementById('hours').value = '00';
    document.getElementById('minutes').value = '00';
    document.getElementById('seconds').value = '00';

    //firebase credentials
    const app = firebase.app();

    document.getElementById('google-login').display
});

//google login
function googleLogin() {
    //google auth provider
    const provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
    //when singed in...
    .then(result => {
        const user = result.user;
        document.write(`Hello ${user.displayName}`);
        console.log(user)
    })
    .catch(console.log)
}

let countdown,minutes;
let breaking, studying, pause = false;

let breakMinutes = document.getElementById("breakMin");
let studyMinutes = document.getElementById("studyMin");

function getSeconds() {
    let hours = 0;
    let seconds = 0;

    //account for unnacceptable input
    if (isNaN(hours) || hours < 0) {hours = 0;}
    if (isNaN(minutes) || minutes < 0) {minutes = 0;}
    if (isNaN(seconds) || seconds < 0) {seconds = 0;}

    //get values from timer text boxes, change string to integer
    hours = parseInt (document.getElementById('hours').value, 10);
    minutes = parseInt (document.getElementById('minutes').value, 10);
    seconds = parseInt (document.getElementById('seconds').value, 10);
 
    //convert to seconds
    return hours * 3600 + minutes * 60 + seconds;
}


let functionRunning = false;
function startCountdown() { //Hours, minutes, seconds, break boolean, study boolean
    functionRunning = true;
    //stop alarm sound
    alarm.pause();

    //clear previous countdown
    if (countdown) {
        clearInterval(countdown);
    }

    let totalSeconds = getSeconds();
    console.log(totalSeconds);

    let first = true;
    if (totalSeconds != 0) {
    //decrement and display time each second using setInterval()
        countdown = setInterval(function() {

            if (first && totalSeconds == 0) {
                playAlarm();
                setTimeout(function() {
                    alert("time's up");
                    alarm.pause();
                }, 4000); 
                first = false;
            }
            
            if (pause) { 
                console.log("pause"); 
                clearInterval(countdown); 
            }
            
            //convert back to hours, minutes, seconds for displaying
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
        
            
            //display time in text boxes
            document.getElementById('hours').value = pad(hours);
            document.getElementById('minutes').value = pad(minutes);
            document.getElementById('seconds').value = pad(seconds);

            //decrement seconds
            if (totalSeconds != 0) { totalSeconds--; }

        }, 1000);//1 second delay

    }
}
functionRunning = false;

function setBreak() {
    breaking = true;

    minutes = breakMinutes.value;
    if (countdown) { clearInterval(countdown); }

    //display break time
    document.getElementById('hours').value = pad(0);
    document.getElementById('minutes').value = pad(minutes);
    document.getElementById('seconds').value = pad(0);
}

function setStudy() {
    studying = true;
    minutes = studyMinutes.value;
    if (countdown) { clearInterval(countdown); }

    //display study time
    document.getElementById('hours').value = pad(0);
    document.getElementById('minutes').value = pad(minutes);
    document.getElementById('seconds').value = pad(0);   
}

function reset() {
    document.getElementById('hours').value = '00';
    document.getElementById('minutes').value = '00';
    document.getElementById('seconds').value = '00';
    startCountdown();
}

//returns a string to be displayed
function pad(value) {

    //avoid - being displayed when scrolling to set
    if (value < 1 && value !== 0) {
        return '00';
    }
    //adds a zero if numer under 10
    return value < 10 ? '0' + value : value;
}

let initialWorkingSeconds = 0;

function pressed(a) {
    //change to pressed image
    document.getElementById('background-image').src = a;
    setTimeout(function() {
        document.getElementById('background-image').src = "assets/images/clock2.png";
    }, 300);

    //save inital break or study time or pause if countdown is running
    if (breaking) {
        breaking = false; 
        if (pause) { pause = false; }
    } else if (studying){
        studying = false;
        initialWorkingSeconds = getSeconds();
        console.log(initialWorkingSeconds);
        if (pause) { pause = false; }
    } else {
        if (!pause && functionRunning) {
            pause = true;
        } else {
            pause = false;
        }
    }
    startCountdown();
    
}

function playClick() {
    let click = document.getElementById('click');
    click.volume=.03;
    click.play();
}

function playAlarm() {
    let alarm = new Audio('assets/sounds/-169440.mp3');
    alarm.volume = .03;
    alarm.play();
}

//getting time and adding event listeners
let hoursInputElement = document.getElementById('hours');
let minutesInputElement = document.getElementById('minutes');
let secondsInputElement = document.getElementById('seconds');

hoursInputElement.addEventListener("wheel", handleWheelEvent);
minutesInputElement.addEventListener("wheel", handleWheelEvent);
secondsInputElement.addEventListener("wheel", handleWheelEvent);

//scroll to change time:
function handleWheelEvent(event) {
  event.preventDefault();

  const inputElement = event.currentTarget;
  const delta = -Math.sign(event.deltaY);
  const currentValue = parseFloat(inputElement.value) || 0;
  const newValue = currentValue + delta;

  inputElement.value = pad(newValue);
}


//menu button
function openMenu() {
    let panel = document.getElementById("menu");
    toggleOpen(panel);
};

//login button
function openLogin() {
    let loginMenu = document.getElementById("login-menu");
    toggleOpen(loginMenu);
};

//help button
function openHelp() {
    let helpText = document.getElementById("help-text");
    toggleOpen(helpText);
};

//open what button opens if not open already
function toggleOpen(a) {
    if (a.style.display === "block") {
        a.style.display = "none";
    } else {
        a.style.display = "block";
    }
};

//login submit button 
function submitLogin() {
    let loginMenu = document.getElementById("login-menu");
    loginMenu.style.display = "none";

    //save stuff ......l

}
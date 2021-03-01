// Access the dom element
const msgEl = document.getElementById("msg");

//Create a Random Number
const randomNum = getRandomNumber();

//function getRandom Number
function getRandomNumber(){
    return Math.floor(Math.random()*100) + 1;
}

 //console.log('Number:' + randomNum)

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new window.SpeechRecognition()

recognition.start()

recognition.addEventListener('result', onSpeak)

function onSpeak(e){
    // console.log(e)
    const msg = e.results[0][0].transcript
    console.log(msg)

    writeMessage(msg)
    checkNumber(msg)
}

function writeMessage(msg){
    msgEl.innerHTML = `
        <div>You said:</div>
        <span class="box">${msg}</span>
    `
}

function checkNumber(msg) {
    const num = +msg

    if (Number.isNaN(num)){
        msgEl.innerHTML += `<div>That is not a valid number</div>`
        return
    }
    if(num > 100|| num < 1) {
        msgEl.innerHTML += `<div>Number must be between 1 an 100</div>`
        return
    }
    if(num === randomNum){
        document.body.innerHTML = `
            <h2>Congrats!!!! You have guessed the number<br><br>
            It was ${num}!!!!</h2>
            <button class="play-again" id="play again"> Play again</button>
        `
    } else if (num > randomNum){
        msgEl.innerHTML += `<div>Go LOWER</div>`
    } else {
        msgEl.innerHTML += `<div>Go HIGHER</div>`
    }
}

recognition.addEventListener('end', () => recognition.start())

document.body.addEventListener('click', e => {
    if(e.target.id == 'play-again'){
        window.location.reload()
    }
})
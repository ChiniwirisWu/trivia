// FIRST SETUP
const startGame = ()=> {
	mode = document.getElementById('mode').textContent
	setDefaultSettings()
	if(mode == 'general'){
		generalTrivia()
	} else{
		personalTrivia()
	}
}

function countdown(){
	counter = document.getElementById('counter')
	actual_sec = counter.textContent
	if(actual_sec == 1){
		actual_sec = 8
	} else{
		actual_sec--
	}
	counter.textContent = actual_sec
}

function setDefaultSettings(){
	counter = document.getElementById('counter')
	correction_message = document.getElementById('correction')
	correction_message.classList.remove('wrong-answer')
	correction_message.classList.remove('correct-answer')
	correction_message.textContent = ''
	counter.textContent = 8
}

//GENERAL TRIVIA
function generalTrivia(){

	questions = JSON.parse(response.textContent) //object {'general': dict(), 'personal': list[]} 
	response = document.getElementById('response')
	question_message = document.getElementById('question')
	yes_btn = document.getElementById('yes')
	no_btn = document.getElementById('no')
	survey_form = document.getElementById('survey_form')
	correction_message = document.getElementById('correction')
	answer = 'yes'
	user_vote = ''
	questions = questions['general']
	counter = 0
	index = randomNumber(Object.keys(questions).length)
	console.log(index)
	for (key of Object.keys(questions)){
		console.log(counter)
		if(counter == index){
			question_message.textContent = key
			readQuestion(key)
			anwer = questions[key]
			break
		}
		counter++
	}

	//Event Handlers
	yes_btn.addEventListener('click', (e)=>votation(e, 'yes')) 
	no_btn.addEventListener('click', (e)=>votation(e, 'no')) 
} 	

//PERSONAL TRIVIA
function personalTrivia(){

	correct_audio = document.getElementById('correct-sound')
	questions = JSON.parse(response.textContent) //object {'general': dict(), 'personal': list[]} 
	response = document.getElementById('response')
	question_message = document.getElementById('question')
	yes_btn = document.getElementById('yes')
	no_btn = document.getElementById('no')
	survey_form = document.getElementById('survey_form')
	questions = questions['personal']
	question = questions[randomNumber(questions.length)]
	question_message.textContent = question
	readQuestion(question)


	//Event Handlers
	yes_btn.addEventListener('click', (e)=>{
		correction_message = document.getElementById('correction')
		correction_message.classList.remove('wrong-answer')
		correction_message.classList.add('correct-answer')
		correction_message.textContent = 'You answer Yes!'
		correct_audio.play()
	})

	no_btn.addEventListener('click', (e)=>{
		correction_message = document.getElementById('correction')
		correction_message.classList.remove('correct-answer')
		correction_message.classList.add('wrong-answer')
		correction_message.textContent = 'You answer No!'
		correct_audio.play()
	})
}


//Handlers
function randomNumber(max){
	num =  Math.round((Math.random() * 1000) % max);
	console.log(num)
	return num
}

function readQuestion(question){
	syth = speechSynthesis
	voices = syth.getVoices()
	if(voices.length < 0){
		utterThis = speechSynthesisUtterance(question)
		utterThis.voice = voices[0]
		syth.speak(utterThis)
	}
}


function votation (event, vote){
	correct_audio = document.getElementById('correct-sound')
	wrong_audio = document.getElementById('wrong-sound')
	console.log('hola')
	user_vote = vote; 
	if(user_vote == answer){
		correction_message.classList.remove('wrong-answer')
		correction_message.classList.add('correct-answer')
		correction_message.textContent = 'That Is Correct!'
		correct_audio.play()
	} else{
		correction_message.classList.remove('correct-answer')
		correction_message.classList.add('wrong-answer')
		correction_message.textContent = 'That Is Incorrect!'
		wrong_audio.play()
	}
}

loaded = 0
const loadingBar = () =>{
	const loadingBar = document.getElementById('load-bar')
	loaded = loaded + 100 * (1/8)
	loadingBar.style.width = `${loaded}%`
	console.log(loaded)
	if(loaded > 80){
		loaded = 0
	}
}

//I am proud of this
startGame()
countdownID = setInterval(countdown, 1000)
barCountdownID = setInterval(loadingBar, 1000)
setInterval(()=>{
	startGame()
	clearInterval(countdownID)
	clearInterval(barCountdownID)
	countdownID = setInterval(countdown, 1000)
	barCountdownID = setInterval(loadingBar, 1000)
}, 8000)

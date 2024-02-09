// FIRST SETUP
function startGame(){
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
	correction_message = document.getElementById('correction')
	correction_message.classList.remove('wrong-answer')
	correction_message.classList.remove('correct-answer')
	correction_message.textContent = ''
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

	questions = JSON.parse(response.textContent) //object {'general': dict(), 'personal': list[]} 
	response = document.getElementById('response')
	question_message = document.getElementById('question')
	yes_btn = document.getElementById('yes')
	no_btn = document.getElementById('no')
	survey_form = document.getElementById('survey_form')
	questions = questions['personal']
	question = questions[randomNumber(questions.length)]
	question_message.textContent = question


	//Event Handlers
	yes_btn.addEventListener('click', (e)=>{
		correction_message = document.getElementById('correction')
		correction_message.classList.remove('wrong-answer')
		correction_message.classList.add('correct-answer')
		correction_message.textContent = 'You answer Yes!'
	})

	no_btn.addEventListener('click', (e)=>{
		correction_message = document.getElementById('correction')
		correction_message.classList.remove('correct-answer')
		correction_message.classList.add('wrong-answer')
		correction_message.textContent = 'You answer No!'
	})
}


//Handlers
function randomNumber(max){
	num =  Math.round((Math.random() * 1000) % max);
	console.log(num)
	return num
}


function votation (event, vote){
	console.log('hola')
	user_vote = vote; 
	if(user_vote == answer){
		correction_message.classList.remove('wrong-answer')
		correction_message.classList.add('correct-answer')
		correction_message.textContent = 'That Is Correct!'
	} else{
		correction_message.classList.remove('correct-answer')
		correction_message.classList.add('wrong-answer')
		correction_message.textContent = 'That Is Incorrect!'
	}
}


startGame()
setInterval(startGame, 8000) 
setInterval(countdown, 950)

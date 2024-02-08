mode = document.getElementById('mode').textContent
counter = document.getElementById('counter')
// FIRST SETUP

const startGame = ()=>{
	correction_message = document.getElementById('correction')
	correction_message.classList.remove('correct-answer')
	correction_message.classList.remove('wrong-answer')
	correction_message.textContent = ''
	if (mode == 'general'){
		generalTrivia()
	} else{
		personalTrivia()
	}
}

//GENERAL TRIVIA
function generalTrivia(questions){

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
function personalTrivia(questions){

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
		counter = 5
	})

	no_btn.addEventListener('click', (e)=>{
		counter = 5
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

function substractCounter(){
	seg = counter.textContent
	if(seg == 6){
		startGame()
	}

	newTime = seg - 1
	if(newTime == 0){
		newTime = 6
	}
	counter.textContent = `${newTime}`
}

setInterval(substractCounter, 1000)

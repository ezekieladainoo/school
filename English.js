const questions =[{
	question: "We will leave ............ you are ready",
	answers:[
		{text:"as when",correct:false},
		{text:"whenever",correct:true},
		{text:"as ever",correct:false},
		{text:"soon as",correct:false},
	
	    ]
    },
    {
    question: "The task is .......... for us to undertake",
	answers:[
		{text:"much too difficult",correct:true},
		{text:"too much difficult",correct:false},
		{text:"more too difficult",correct:false},
		{text:"quite too difficult",correct:false},
	   ]
    },
    {
    question: "I have always counted .........his friendship. ",
	answers:[
		{text:"in",correct:false},
		{text:"to",correct:false},
		{text:"with",correct:false},
		{text:"on",correct:true},
		]
	},
	{
	question: "These properties are .......... sale",
	answers:[
		{text:"up for",correct:true},
		{text:"up on",correct:false},
		{text:"out for",correct:false},
		{text:"down for",correct:false},
		]
	},
	 {
    question: "I have ........... completed the task.",
	answers:[
		{text:"more and less",correct:false},
		{text:"more or less",correct:true},
		{text:"more than less",correct:false},
		{text:"more but less",correct:false},
		]
	},	
	 {
    question: "Never speak evil ........... the dead",
	answers:[
		{text:"to",correct:false},
		{text:"of",correct:false},
		{text:"about",correct:false},
		{text:"on",correct:true},
		]
	},
	 {
    question: "The standard of education has gone ..........",
	answers:[
		{text:"out",correct:true},
		{text:"at",correct:false},
		{text:"on",correct:false},
		{text:"up",correct:false},
		]
	},
	 {
    question: "We arrived just ............ time for the grand opening",
	answers:[
		{text:"by",correct:false},
		{text:"about",correct:false},
		{text:"before",correct:false},
		{text:"in",correct:true},
		]
	},
	 {
    question: "Harold can lift his heavy log ...........?",
	answers:[
		{text:"can't he",correct:true},
		{text:"does he",correct:false},
		{text:"isn't it",correct:false},
		{text:"doesn't he",correct:false},
		]
	},
	 {
    question: "I want a new ............",
	answers:[
		{text:"black big leather sandal",correct:false},
		{text:"black leather big sandal",correct:false},
		{text:"big black  leather sandal",correct:true},
		{text:"leather black big sandal",correct:false},
		]
	},
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}

function showQuestion(){
	resetState();
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1; 
	questionElement.innerHTML = questionNo + "." + currentQuestion.question;

	currentQuestion.answers.forEach(answer =>{
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		answerButtons.appendChild(button);
		if(answer.correct){
			button.dataset.correct = answer.correct;

		}
		button.addEventListener("click", selectAnswer); 
	});
}

function resetState(){
	nextButton.style.display = "none";
	while(answerButtons.firstChild){
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAnswer(e){
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if(isCorrect){
		selectedBtn.classList.add("correct");
		score++;
	}else{
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerButtons.children).forEach(button => {
		if(button.dataset.correct === "true"){
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";
}


function showScore(){
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
	nextButton.innerHTML = "Restart Quiz";
	nextButton.style.display = "block";
}


function handleNextButton(){
	currentQuestionIndex++;
	if(currentQuestionIndex < questions.length){
		showQuestion();
	}else{
		showScore();
	}
}


nextButton.addEventListener("click", ()=>{
	if(currentQuestionIndex < questions.length){
		handleNextButton();
	}else{
		startQuiz();
	}
});


startQuiz();
const questions =[{
	question: "One major problem associated with political independence in Ghana is",
	answers:[
		{text:"misappliation of resources",correct:true},
		{text:"religious intolerance",correct:false},
		{text:"high  rate of  illiteracy",correct:false},
		{text:"increase in population",correct:false},
	
	    ]
    },
    {
    question: "Inter-ethnic marriages help to promote",
	answers:[
		{text:"hereditary rites",correct:false},
		{text:"conflict resolution",correct:false},
		{text:"national integration",correct:true},
		{text:"formal education",correct:false},
	   ]
    },
    {
    question: "The individual is best identified in society by",
	answers:[
		{text:"name",correct:true},
		{text:"dress",correct:false},
		{text:"language",correct:false},
		{text:"family",correct:false},
		]
	},
	{
	question: "Apart from blood ties, one can become a member of a family through",
	answers:[
		{text:"abduction",correct:false},
		{text:"socialisation",correct:false},
		{text:"adoption",correct:true},
		{text:"friendship",correct:false},
		]
	},
	{
	question: "The term inferiority complex implies",
	answers:[
		{text:"being poor",correct:false},
		{text:"feeling negleted by society",correct:false},
		{text:"being isolated",correct:false},
		{text:"having low self concept",correct:true},
		]
	},	
	{
	question: "In traditional economic system, the recognised bread winner of the family is",
	answers:[
		{text:"mother",correct:false},
		{text:"uncle",correct:false},
		{text:"adult son",correct:false},
		{text:"father",correct:true},
		]
	},
	{
	question: "The term personality means a person's",
	answers:[
		{text:"talent",correct:false},
		{text:"physical appearance",correct:false},
		{text:"total make-up",correct:true},
		{text:"character",correct:false},
		]
	},
	{
	question: "self identity implies personal",
	answers:[
		{text:"physical appearance",correct:false},
		{text:"aquisition skills",correct:false},
		{text:"hereditary traits",correct:false},
		{text:"awareess and consciousness",correct:true},
		]
	},
	{
	question: "Fertilisation in humans occur in the",
	answers:[
		{text:"ovary",correct:false},
		{text:"cervix",correct:false},
		{text:"fallopian tubes",correct:true},
		{text:"vagina",correct:false},
		]
	},
	{
	question: "Ghanaians demonstate their through the following except",
	answers:[
		{text:"festivals",correct:false},
		{text:"language",correct:false},
		{text:"music and dance",correct:false},
		{text:"propeties",correct:true},
		]
	}
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
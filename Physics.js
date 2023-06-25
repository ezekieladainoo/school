const questions =[{
	question: "The relative density of a liquid can be mesured <u><b>directly</b></u> using",
	answers:[
		{text:"hygrometer",correct:false},
		{text:"hydrometer",correct:true},
		{text:"hypsometer",correct:false},
		{text:"barometermm",correct:false},
	
	    ]
    },
    {
    question: "The moment of a force has the same dimensions as those of a",
	answers:[
		{text:"efficiency",correct:false},
		{text:"momentum",correct:false},
		{text:"power",correct:false},
		{text:"work",correct:true},
	   ]
    },
    {
    question: "The dimensions of the gravitational constant G are",
	answers:[
		{text:"ML<sup>3</sup>T<sup>2</sup>",correct:false},
		{text:"M<sup>-1</sup>L<sup>2</sup>T<sup>-3</sup>",correct:false},
		{text:"M<sup>-1</sup>L<sup>3</sup>T<sup>-2</sup>",correct:true},
		{text:"M<sup>-2</sup>L<sup>3</sup>T<sup>-2</sup>",correct:false},
		]
	},
	{
	question: "The motion of a ball spinning on its axis is",
	answers:[
		{text:"discillatory",correct:true},
		{text:"force",correct:false},
		{text:"mass",correct:false},
		{text:"velocity",correct:false},
		]
	},
	{
    question: "Which of the following quantities is scalar?",
	answers:[
		{text:"displacement",correct:false},
		{text:"force",correct:false},
		{text:"mass",correct:true},
		{text:"velocity",correct:false},
		]
	},	
	{
    question: "Calculate the average speed of the body for the duration of 20s.",
	answers:[
		{text:"30ms<sup>-1</sup>",correct:false},
		{text:"20ms<sup>-1</sup>",correct:false},
		{text:"15ms<sup>-1</sup>",correct:true},
		{text:"5ms<sup>-1</sup>",correct:false},
		]
	},
	{
    question: "The unit of momentum is",
	answers:[
		{text:"Kgms<sup>-1</sup>",correct:true},
		{text:"Kgms<sup>-2</sup>",correct:false},
		{text:"Kgs<sup>-1</sup>",correct:false},
		{text:"Nm",correct:false},
		]
	},
	{
    question: "The resultant force of a couple is",
	answers:[
		{text:"zero",correct:true},
		{text:"infinite",correct:false},
		{text:"the sum of the forces",correct:false},
		{text:"the product of the forces",correct:false},
		]
	},
	{
    question: "Which of the following substances is not crystalline?",
	answers:[
		{text:"Sodium chloride",correct:false},
		{text:"Lead",correct:false},
		{text:"Glass",correct:true},
		{text:"Germanium",correct:false},
		]
	},
	{
    question: "The S.I unit of the universal gravitational constant G is",
	answers:[
		{text:"Nm<sup>2</sup>Kg<sup>2</sup>",correct:false},
		{text:"Nm<sup>2</sup>Kg<sup>-2</sup>",correct:false},
		{text:"Nm<sup>2</sup>Kg",correct:true},
		{text:"NmKg",correct:false},
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
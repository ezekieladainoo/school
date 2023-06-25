const questions =[{
	question: "The three atoms of carbon represented by the symbols <sup>12<Sub>6</sub></sup>C, <sup>13<Sub>6</sub></sup>C, <sup>14<Sub>6</sub></sup>C are",
	answers:[
		{text:"Allotopes",correct:false},
		{text:"Isotopes",correct:true},
		{text:"Isomers",correct:false},
		{text:"Polymers",correct:false},
	
	    ]
    },
    {
    question: "What is the number of electrons in Mg<sup>2+</sup> ion?[Mg =12]",
	answers:[
		{text:"4",correct:false},
		{text:"6",correct:false},
		{text:"10",correct:true},
		{text:"12",correct:false},
	   ]
    },
    {
    question: "Which of the following properties is a periodic property?",
	answers:[
		{text:"Density",correct:false},
		{text:"Electronegativity",correct:true},
		{text:"Volatility",correct:false},
		{text:"Malleability",correct:false},
		]
	},
	{
	question: "What is the geometrical shape of the S-orbital of an atom?",
	answers:[
		{text:"Dumb-bell",correct:false},
		{text:"Oval",correct:false},
		{text:"Spherical",correct:true},
		{text:"Triangular",correct:false},
		]
	},
	{
    question: "In which of the following chlorides is the bonding covalent?",
	answers:[
		{text:"CCL4",correct:true},
		{text:"NaCl",correct:false},
		{text:"MgCl<sub>2</sub>",correct:false},
		{text:"ZnCl<sub>2</sub>",correct:false},
		]
	},
	{
    question: "which of the following compounds is most ionic",
	answers:[
		{text:"AlBr<sub>3</sub>",correct:false},
		{text:"AlI<sub>3</sub>",correct:false},
		{text:"C<sub>s</sub>F",correct:true},
		{text:"BeI<sub>2</sub>",correct:false},
		]
	},
	{
    question: "Metals can be worked into wires because they are",
	answers:[
		{text:"Brittle",correct:false},
		{text:"Ductile",correct:true},
		{text:"Elastic",correct:false},
		{text:"Malleable",correct:false},
		]
	},
	{
    question: "Which of the following compounds has a tetrahedral structure?",
	answers:[
		{text:"CCL4",correct:true},
		{text:"CO<sub>2</sub>",correct:false},
		{text:"C<sub>2</sub>H<sub>2</sub>",correct:false},
		{text:"NH<sub>3</sub>",correct:false},
		]
	},
	{
    question: "What is the shape of CH<sub>4</sub>?",
	answers:[
		{text:"Linear",correct:false},
		{text:"Planar",correct:false},
		{text:"Pyramidal",correct:false},
		{text:"Tetrahedral",correct:true},
		]
	},
	{
    question: "The age of a skeleton can be determined using",
	answers:[
		{text:"X-rays",correct:false},
		{text:"Gamma rays",correct:false},
		{text:"Carbon-14",correct:true},
		{text:"Cobalt 60",correct:false},
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
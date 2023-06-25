const questions =[{
	question: "Which items are used when holding hot materials in a laboratory?",
	answers:[
		{text:"beaker, thermometer and heat mat",correct:false},
		{text:"test tube holder, heat mat and palette",correct:false},
		{text:"heat mat, Petri dish and mortar",correct:false},
		{text:"test tube holder, heat mat and tongs",correct:true},
	
	    ]
    },
    {
    question: "A nurse and an engineer need knowledge more in the following subject respectively",
	answers:[
		{text:"Physics and Biology",correct:false},
		{text:"Biology and Physics",correct:true},
		{text:"Medicine and Chemistry",correct:false},
		{text:"Chemistry and Physics",correct:false},
	   ]
    },
    {
    question: "Which of the following animals does not have backbone",
	answers:[
		{text:"Toad",correct:false},
		{text:"Snail",correct:true},
		{text:"Tortise",correct:false},
		{text:"Snake",correct:false},
		]
	},
	{
	question: "The systematic name for the polyatomic ion PO<sup>3-</sup><sub>4</sub> is",
	answers:[
		{text:"trioxophosphate(IV)ion",correct:false},
		{text:"tetraoxophosphate(V)ion",correct:false},
		{text:"tetraoxophosphorous(V)ion",correct:false},
		{text:"tetraoxophosphate(V)ion",correct:true},
		]
	},
	{
    question: "Naphthalene sublimes at room temperature.It is likely that it exhibits",
	answers:[
		{text:"metallic bonding",correct:false},
		{text:"ionic bonding",correct:false},
		{text:"covalent bonding",correct:true},
		{text:"no bonding",correct:false},
		]
	},
	{
    question: "The number of molecules in 2.5moles of hydrogen gas is",
	answers:[
		{text:"15.1*10<sup>23</sup>",correct:true},
		{text:"6.02*10<sup>23</sup>",correct:false},
		{text:"2.5*210<sup>23</sup>",correct:false},
		{text:"12.0*110<sup>23</sup>",correct:false},
		]
	},	
	{
    question: "The discovery of the cells of living organisms was by",
	answers:[
		{text:"Robert Brown",correct:false},
		{text:"Robert Hooke",correct:true},
		{text:"Robert Kooh",correct:false},
		{text:"Louis Pasteur",correct:false},
		]
	},
	{
    question: "Moving of air masses can cause all the following except",
	answers:[
		{text:"storms",correct:false},
		{text:"land and sea-breeze ",correct:false},
		{text:"dehydration",correct:true},
		{text:"pollution",correct:false},
		]
	},
	{
    question: "The evidence that potosynthesis  has taken place in a green leaf is the presence of",
	answers:[
		{text:"Proteins",correct:false},
		{text:"Glucose",correct:false},
		{text:"Starch",correct:true},
		{text:"Lipids",correct:false},
		]
	},
	{
    question: "The  nearest and farthest layers of the Earth's atmosphere are respectively known as",
	answers:[
		{text:"Thermosphere and Troposphere",correct:false},
		{text:"Stratosphere and Mesosphere",correct:false},
		{text:"Troposphere and Thermosphere",correct:true},
		{text:"Mesosphere and Thermosphere",correct:false},
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
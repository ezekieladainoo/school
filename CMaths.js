const questions =[{
	question: "Find the minimum value of g(y) = y<sup>2</sup> +7y -3", 
	answers:[
		{text:"-15.25",correct:true},
		{text:"-3.50",correct:false},
		{text:"3.50",correct:false},
		{text:"15.25",correct:false},
	
	    ]
    },
    {
    question: "If y and z are the roots of 2y<sup>2</sup> +5y +n =0,such that yz=2,find the value of n",
	answers:[
		{text:"4",correct:true},
		{text:"2",correct:false},
		{text:"-4",correct:false},
		{text:"-2",correct:false},
	   ]
    },
    {
    question: "Given that y<sup>2</sup> +4y +k =(y +r)<sup>2</sup> +1,find the values of k and r",
	answers:[
		{text:"k =5, r =-1",correct:false},
		{text:"k =5, r =2",correct:true},
		{text:"k =2, r =5",correct:false},
		{text:"k =-1, r =5",correct:false},
		]
	},
	{
	question: "Given that P and Q are unempty subsets of U,find P n(Q u Q<sup>`</sup> )",
	answers:[
		{text:"P<sup>`</sup>",correct:false},
		{text:"Q<sup>`</sup>",correct:false},
		{text:"P",correct:true},
		{text:"Q",correct:false},
		]
	},	
	{
	question: "Factorize completely : X<sup>2</sup> +X<sup>2</sup>y +3x -10y +3xy -10",
	answers:[
		{text:"(x + 2)(x + 5)(y + 1)",correct:false},
		{text:"(x + 2)(x - 5)(y + 1)",correct:false},
		{text:"(x - 2)(x + 5)(y + 1)",correct:true},
		{text:"(x - 2)(x - 5)(y + 1)",correct:false},
		]
	},
	{
	question: "If f(y) =2y and g(y) =y<sup>2</sup> +1, find f[g(2)]",
	answers:[
		{text:"8",correct:false},
		{text:"10",correct:true},
		{text:"17",correct:false},
		{text:"20",correct:false},
		]
	},
	{
	question: "If the domain of t(y)=y<sup>2</sup> +1 is {-2, -1, 0, 1, 2}, find the range",
	answers:[
		{text:"{3, 0, -1}",correct:false},
		{text:"{5, 2, 1}",correct:true},
		{text:"{3, 1, 5}",correct:false},
		{text:"{2, 0, -1}",correct:false},
		]
	},
	{
	question: "If g : r->5-2r, r is a real number, find the image of -3",
	answers:[
		{text:"11",correct:true},
		{text:"-9",correct:false},
		{text:"13",correct:false},
		{text:"-1",correct:false},
		]
	},
	{
	question: "A car is moving at aspeed of 108kmh<sup>-1</sup>, find its speed in ms<sup>-1</sup>.",
	answers:[
		{text:"3ms<sup>-1<sup>",correct:false},
		{text:"18ms<sup>-1<sup>",correct:false},
		{text:"30ms<sup>-1<sup>",correct:true},
		{text:"300ms<sup>-1<sup>",correct:false},
		]
	},
	{
	question: "A linear transformation is defined by T:(x, y)  ->(x +y -4y). Find the image,Q<sup>`</sup> of Q(-3, 2) under T.",
	answers:[
		{text:"Q<sup>`</sup>(5, -3)",correct:false},
		{text:"Q<sup>`</sup>(-5, -8)",correct:false},
		{text:"Q<sup>`</sup>(5, -8)",correct:true},
		{text:"Q<sup>`</sup>(-8, -5)",correct:false},
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
'use strict';
//these are where all of the question/answer info is. 
const questionSet = [
  {
    question_num: "1",
    question_text: "Alexander Hamilton was the primary author of which of the following?",
    option_1: "The Declaration of Independence",
    option_2: "The Federalist Papers",
    option_3: "The Bill of Rights",
    option_4: "good kid, m.A.A.d. city",
    correct_option: "2", 
     },
  {
    question_num: "2", 
    question_text: "Alexander Hamilton was born here:",
    option_1: "New York",
    option_2: "Nevis",
    option_3: "Philadelphia",
    option_4: "St. Kitts",
    correct_option: "2", 
     },
  {
    question_num:"3",
    question_text:"Alexander Hamilton's wife was:",
    option_1: "Cornelia Van Rensselaer",
    option_2: "Angelica Church",
    option_3: "Elizabeth Schuyler",
    option_4: "Martha Washington",
    correct_option:"3", 
     },
  {
    question_num:"4",
    question_text:"Alexander Hamilton founded all of the following except:",
    option_1: "New York State Bar Association",
    option_2: "U.S. Department of Treasury",
    option_3: "New York Post",
    option_4: "U.S. Coast Guard",
    correct_option:"1", 
     },
  {
    question_num:"5", 
    question_text:"This politician immediately succeeded Hamilton in office:",
    option_1: "Edmund Randolph",
    option_2: "Thomas Pickering",
    option_3: "William Pinkney",
    option_4: "Oliver Wolcott Jr.",
    correct_option:"4", 
  }, 
  {
    question_num:"6", 
    question_text:"He wrote the Hamilton musical:",
    option_1: "Lin-Manuel Miranda",
    option_2: "Duncan Sheik",
    option_3: "Kendrick Lamar",
    option_4: "Steven Levenson",
    correct_option:"1", 
  },
  {
    question_num:"7", 
    question_text:"Which of these is not a song from Hamilton?",
    option_1: "\"Satisfied\"",
    option_2: "\"Wait for It\"",
    option_3: "\"Cabinet Battle #2\"",
    option_4: "\"Immigrants (We Get the Job Done)\"",
    correct_option:"4", 
  },
  {
    question_num:"8", 
    question_text:"She originated the role of Angelica",
    option_1: "Phillipa Soo",
    option_2: "Renee Elise Goldsberry",
    option_3: "Krysta Rodriguez",
    option_4: "Cynthia Enivo",
    correct_option:"2",
  },
  {
    question_num:"9", 
    question_text:"This American politician was famously booed by the audience at a Hamilton performance:",
    option_1:"Donald Trump",
    option_2:"Mike Pence",
    option_3:"Chris Christie",
    option_4:"Paul Ryan",
    correct_option:"2", 
  },
  {
    question_num:"10", 
    question_text:"Alexander Hamilton died in:",
    option_1: "Bayonne, NJ",
    option_2: "Fort Lee, NJ",
    option_3: "Weehawken, NJ",
    option_4: "New York, NY",
    correct_option:"4", 
}
];

var currentQuestionIndex = 0;
var currentQuestion = questionSet[currentQuestionIndex];
var questionsAnsweredCorrectly=0;
var questionsAnswered=0;

function startQuiz() {
  createQuestionForm();
  $(".introduction").css("display","none");
}

//As a user, I see one question at a time. I can select an answer and click submit.
function submitAnswer() {
  var optionSelected = $('input[name="question_' + currentQuestion.question_num + '"]:checked').val();
      questionsAnswered += 1;
            
  if (optionSelected === currentQuestion.correct_option) {
    questionsAnsweredCorrectly +=1;
    document.getElementById("working_screen").innerHTML=`<h3>Correct!</h3>`;
    }
  else {
    document.getElementById("working_screen").innerHTML=`<h3>Incorrect</h3>`;
    }
  $("#working_screen").append(`<p>The correct answer is ${currentQuestion["option_" + currentQuestion.correct_option + ""]}.</p><p>You have answered  ${questionsAnswered} out of 10 questions. You have answered ${questionsAnsweredCorrectly} correctly.</p>`);

  if (currentQuestion.question_num < questionSet.length) {
      $("#working_screen").append(`<button onclick="loadNextQuestion()" id="request_next_question">Next Question!</button>`);
    }
  else {
    $("#working_screen").append(`<button onclick="loadSummaryScreen()" id="load_summary">How Did I Do?</button>`);
    }
}
    
//When I click submit, I will learn whether or not I answered correctly, I will be able to view the correct answer, and I may click continue to load the next question.
function loadNextQuestion() {
    currentQuestionIndex +=1;
    currentQuestion = questionSet[currentQuestionIndex];
    createQuestionForm();
}
//At the end, I will see a summary of how many questions I answered correctly. 
function loadSummaryScreen() {
    document.getElementById("working_screen").innerHTML=`<p>Congratulations! You answered  ${questionsAnsweredCorrectly} out of 10 questions correctly.</p>
      <button onclick="location.reload()" class="start">Try Again</button>`;
}
//This is where we construct the question screen. 
function createQuestionForm() {
  document.getElementById("working_screen").innerHTML= `<form id="options_${currentQuestion.question_num}" action="/submit" method="post"><fieldset name="question_${currentQuestion.question_num}"><legend>Question ${currentQuestion.question_num}: ${currentQuestion.question_text}</legend>`;
  var i=1;
  for (i=1; i <= 4; i++) {
    $("#working_screen").append(`
    <input checked type="radio" id="option_1" name="question_${currentQuestion.question_num}" value="${i}" /><label for="option_${i}">${currentQuestion["option_" + i]}</label>
    <br/>`);
  };  
      $("#working_screen").append(`<button onclick="submitAnswer()" id="submit_guess">Submit</button></fieldset></form>`);
}

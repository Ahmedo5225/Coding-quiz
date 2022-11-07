var timeDisplay = document.getElementById("timeDisplay")
var timer = document.getElementById("timer")
var startButton = document.getElementById("startButton")
var questionDiv = document.getElementById("question")
var answerButton1 = document.getElementById("answer1")
var answerButton2 = document.getElementById("answer2")
var answerButton3 = document.getElementById("answer3")
var answerButton4 = document.getElementById("answer4")
var feedback = document.getElementById("feedback")
var title = document.getElementById("pageTitle")
var questionNumber = 0
var timeRemaining = 0
var quizTime = 0
var score = 0

var questionsArray = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in Javascript can be used to store",
      choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      answer: "all of the above"
    },
    {
      title: "String values must be enclosed within ___ when being assigned to variables",
      choices: ["commas", "curly brackets", "quotes", "parantheses"],
      answer: "quotes"
    },
    { title: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["Javascript", "terminal/bash", "for loops", "console.log"],
      answer: "Javascript"
    }
  ];

// set initial timer value and fire off two functions
function quizStart() {
    timeRemaining = 60
    startTimer();
    initQ();
}
//  function changes timer every second
function startTimer() {
    timer.innerHTML = (timeRemaining);
    quizTime = setInterval(tick, 1000);
}
//  function knows when timer reaches zero
function tick() {
    if (timeRemaining !== 0) {
     timeRemaining--
     timer.innerHTML = (timeRemaining)
    }
    else {
        clearInterval(quizTime)
        quizOver();
    }
    return;
}
//  function hides initial elements and shows quiz relevant ones, then starts main quiz function
function initQ() {
    document.querySelectorAll(".main").forEach(main => { main.style.display = "none" })
    document.querySelectorAll(".quiz").forEach(quiz => { quiz.style.display = "initial" })
    quiz(questionNumber);
}
//  function checks if there are anymore questions and if not ends the quiz
function quiz() {   
    if (questionNumber >= questionsArray.length) {
    quizOver();
}
else {
    questionDiv.innerHTML = (questionsArray[questionNumber].title)
    answerButton1.innerHTML = (questionsArray[questionNumber].choices[0])
    answerButton2.innerHTML = (questionsArray[questionNumber].choices[1])
    answerButton3.innerHTML = (questionsArray[questionNumber].choices[2])
    answerButton4.innerHTML = (questionsArray[questionNumber].choices[3])
}}
//  function checks whether or not answer is the correct one
function answerCheck(btnId) {
    if ((document.getElementById(btnId).innerHTML) === (questionsArray[questionNumber].answer)) {
        correctAnswer();
        questionNumber++
    }
    else {
        incorrectAnswer();
        questionNumber++
    }
    quiz(questionNumber);
}
//  this function runs when answer is spot on
function correctAnswer() {
    score = timeRemaining
    feedback.innerHTML = ("Correct");
    setTimeout(function() {feedback.innerHTML = ("");}, 800)
}
//  this function runs when answer is false
function incorrectAnswer() {
    timeRemaining = (timeRemaining - 15)
    feedback.innerHTML = ("Incorrect");
    setTimeout(function() {feedback.innerHTML = ("");}, 800)
}

//  function leads to high score screen; then write your initials
function quizOver() {
    document.querySelectorAll(".quiz").forEach(quiz => { quiz.style.display = "none" })
    var content = document.getElementById('theContent')
    var done = document.getElementById("done")
    var submit = document.getElementById("submit")

    timer.innerHTML = (0)
    
    content.insertAdjacentHTML('afterbegin', '<h1 id="done">All Done!</h1> <button id="submit" class="btn btn-danger">Submit</button> <input id="userScore"> - Enter Initials</input>');

    var done = document.getElementById("done")
    done.insertAdjacentHTML('afterend', '<p id="finalScore">Your final score is ' + score + '</p>');

    var submit = document.getElementById("submit")
    submit.addEventListener("click", function(){
        var value = document.getElementById('userScore').value;
       localStorage.setItem(value, score)
       window.location.href = "index.html"
    });  
    clearInterval(quizTime)
}

// this function shows the highscore table
function renderTable() {
    var tbody = document.getElementById("tableBody")
    for (let i = 0; i < localStorage.length; i++) {
     var userName = localStorage.key(i)
     var userScore = localStorage.getItem(userName)
     tbody.insertAdjacentHTML('afterbegin', '<tr class="scores"><td>' + userName + ' - ' + userScore + '</td></tr>')
    }
}
//  this function has the clear highscores button work by clearing previous scores
function clearStorage() {
    localStorage.clear();
    window.location.reload();
}
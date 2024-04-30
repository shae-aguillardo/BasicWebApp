const quizData = [
  {
    question:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus, reprehenderit?",
    answers: ["Answer1 lorem10", "Answer2", "Answer3", "Answer4"],
    correctAnswer: 0,
  },
  {
    question: "What is the country in the world?",
    answers: ["Answer1 lorem10", "Answer2", "Answer3", "Answer4"],
    correctAnswer: 2,
  },
  // Add more questions here
];
const quizOptions = document.querySelector(".quiz-options");
const optionsElements = document.querySelectorAll(".quiz-options div");
const questionElement = document.querySelector(".question");

let score = 0;
let currentQuestionIndex = 0;
let exitBtnClicks = 0;

function startQuiz() {
  const playBtn = document.getElementById("playBtn");
  const exitBtn = document.getElementById("exitBtn");
  const scoreElement = document.querySelector(".Scores .score");

  function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElements.forEach((option, index) => {
      option.textContent = currentQuestion.answers[index];
    });
    quizOptions.style.display = "grid";
  }

  function checkAnswer(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correctAnswer) {
      score++;
      scoreElement.textContent = score;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }

  function endQuiz() {
    questionElement.textContent =
      "Quiz completed! Your final score is " + score;
    quizOptions.style.display = "none";
    playBtn.style.display = "block";
  }

  function handleExitBtnClick() {
    exitBtnClicks++;
    if (exitBtnClicks === 1) {
      quizOptions.style.display = "none";
      playBtn.style.display = "block";
      questionElement.textContent = "Quiz exited. Your final score is " + score;
    } else if (exitBtnClicks === 2) {
      currentQuestionIndex = 0;
      score = 0;
      scoreElement.textContent = score;
      exitBtnClicks = 0;
      const quizSection = document.querySelector(".quiz");
      quizSection.style.display = "none";

      simulateLoading();

      setTimeout(() => {
        const startGameSection = document.querySelector(".confirmUser");
        startGameSection.style.display = "block";
      }, 5000);
    }
  }

  playBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = score;
    showQuestion();
    playBtn.style.display = "none";
  });

  exitBtn.addEventListener("click", () => {
    handleExitBtnClick();
  });

  optionsElements.forEach((option, index) => {
    option.addEventListener("click", () => {
      checkAnswer(index);
    });
  });
  const confirmUserForm = document.getElementById("confirmUserForm");
  confirmUserForm.addEventListener("submit", (event) => {
    event.preventDefault();
    confirmUser();
  });
}

//global showQuestion function
function showQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElements.forEach((option, index) => {
    option.textContent = currentQuestion.answers[index];
  });
  quizOptions.style.display = "grid";
}

function confirmUser() {
  const username = document.getElementById("username").value.trim();
  if (username !== "") {
    const startGameSection = document.querySelector(".confirmUser");
    startGameSection.style.display = "none";
    simulateLoading();
    setTimeout(() => {
      const quizSection = document.querySelector(".quiz");
      quizSection.style.display = "block";
      const scoreElement = document.querySelector(".Scores .score");
      currentQuestionIndex = 0;
      score = 0;
      scoreElement.textContent = score;
       playBtn.style.display = "none";
      showQuestion();
    }, 5000);
  } else {
    alert("Please enter a valid username.");
  }
}

function simulateLoading() {
  const animation = document.querySelector(".animation");
  animation.style.display = "block";
  setTimeout(() => {
    animation.style.display = "none";
  }, 5000);
}

function signInAndStartQuiz(event) {
  // event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userDetails = {
    email,
    password,
  };
  localStorage.setItem("userDetails", JSON.stringify(userDetails));

  window.location.href = "index2.html";
}

if (window.location.pathname === "/index.html") {
  const signinForm = document.getElementById("signinForm");
  signinForm.addEventListener("submit", (event) => {
    event.preventDefault();
    signInAndStartQuiz();
  });
}
startQuiz();

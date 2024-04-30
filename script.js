const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
// //function to disappear welcome message
document.querySelector(".start-btn").addEventListener("click", disappear);

function disappear() {
    document.querySelector(".welcome-message").style.display = "none";
}

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [{
        question: "Will I get a good grade on this?",
        answers: [{
                text: 'Sure',
                correct: true
            },
            {
                text: 'Yeah',
                correct: true
            },
            {
                text: 'Show mercy',
                correct: true
            },
            {
                text: 'No',
                correct: false
            }
        ]
    },
    {
        question: 'How many questions does this site cycle through?',
        answers: [{
                text: '4',
                correct: false
            },
            {
                text: '6',
                correct: false
            },
            {
                text: '5',
                correct: true
            },
            {
                text: '7',
                correct: false
            }
        ]
    },
    {
        question: 'What was the image on the starting page?',
        answers: [{
                text: 'Bevo',
                correct: true
            },
            {
                text: 'Cow',
                correct: false
            },
            {
                text: 'Moose',
                correct: false
            },
            {
                text: 'Sheep',
                correct: false
            }
        ]
    },
    {
        question: 'The current Bevo alive right now is Bevo ____',
        answers: [{
                text: 'XIV',
                correct: false
            },
            {
                text: 'XIX',
                correct: false
            },
            {
                text: 'XVI',
                correct: false
            },
            {
                text: 'XV',
                correct: true
            }
        ]
    },
    {
        question: 'One truth, 3 lies: Choose the correct one',
        answers: [{
                text: 'Bevo X passed away due to illness',
                correct: false
            },
            {
                text: 'Bevo I was eaten at a football banquet',
                correct: true
            },
            {
                text: 'Bevo IIV visited capitol for a meet and greet',
                correct: false
            },
            {
                text: "Bevo III almost ate a squirrel",
                correct: false
            }
        ]
    }
]

//special thanks to Dev Ed

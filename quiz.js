const quiz = [
    {
        q:'HTML stands for ?',
        option: ['HighText Machine Language', 'HyperText and links Markup Language', 'HyperText Markup Language', 'None of these'],
        answer: 2
    },
    {
        q:'The correct sequence of HTML tags for starting a webpage is ?',
        option: ['Head, Title, HTML, body', 'HTMT, Body, Title, Head', 'HTMD, Head, Title, Body', 'HTML, Head, Title, Body'],
        answer: 3
    },

    {
        q:'Which of the following element is responsible for making the text bold in HTML?',
        option: ['< pre >', '< a >', '< b >', '< br >'],
        answer: 2
    },

    {
        q:'Which of the following tag is used for inserting the largest heading in HTML?',
        option: ['< h3 >', '< h1 >', '< h5 >', '< h6 >'],
        answer: 1
    },

    {
        q:'Which of the following tag is used to insert a line-break in HTML?',
        
        option: ['< br >', '< a >', '< pre >', '< b >'],
        answer: 0
    },

    {
        q:'How to create an unordered list a list with the list items in bullets in HTML?',
        option: [' < ul >', '< ol >', '< li >', '< i >'],
        answer: 0
    },

    {
        q:'Which character is used to represent the closing of a tag in HTML?',
        option: ['< // >', '< ! >', '< / >', '< . >'],
        answer: 2
    },

    {
        q:'How to create a hyperlink in HTML?',
        option: [ '< a href = "www.javatpoint.com"> javaTpoint.com < / >', '< a url = "www.javatpoint.com" javaTpoint.com / a >', '< a link = "www.javatpoint.com" > javaTpoint.com < / >', '< a > www.javatpoint.com < javaTpoint.com / a >'],
        answer: 0
    },

    
    {
        q:'How to create an ordered list (a list with the list items in numbers) in HTML?',
        option: [' <ul >', '< ol >', '< li >', '< i >'],
        answer: 1
    },

    {
        q:'Which of the following element is responsible for making the text italic in HTML?',
        option: ['< i >', '< italic >', '< it >', '< pre >'],
        answer: 0
    }
]





    const  questionNumber = document.querySelector(".question-number");
    const  questionText = document.querySelector(".question-text");
    const optionQuestion = document.querySelector(".option-question");
    const answersIndicatorContainre = document.querySelector(".answers-indicator");
    const quizBox = document.querySelector(".quiz-box");
    const resultBox = document.querySelector(".result-box");
    const homeBox = document.querySelector(".home-box");
     
    let questionCounter  = 0;
    let currentQuestion;
    let availableQuestion = [];
    let availableOption = [];
    let correctAnswers = 0;
    let attempt = 0;

    function setAvailabeQuestions(){
        const totalQuestion = quiz.length;
        for(let i=0; i<totalQuestion; i++){
        availableQuestion.push(quiz[i])

        }
        
    }

    function getNewQuestion(){
       questionNumber.innerHTML = "Question " + (questionCounter + 1 ) + " of " +  quiz.length;
        const questionIndex = availableQuestion[Math.floor(Math.random() * availableQuestion.length)]
        currentQuestion = questionIndex;
        questionText.innerHTML = currentQuestion.q;
        
        const index1 = availableQuestion.indexOf(questionIndex);
        availableQuestion.splice(index1,1);

        const optionLen = currentQuestion.option.length
        for(let i=0; i<optionLen; i++){
            availableOption.push(i)
        }
        optionQuestion.innerHTML = ''; 
        let animationDelay = 0.15;

        for(let i=0; i<optionLen; i++){
            const optonIndex = availableOption[Math.floor(Math.random() * availableOption.length)];
            const index2 = availableOption.indexOf(optonIndex);
            availableOption.splice(index2,1); 
            const option = document.createElement("div");
            option.innerHTML = currentQuestion.option[optonIndex];
            option.id = optonIndex;
            option.style.animationDelay = animationDelay + 's';
            animationDelay = animationDelay + 0.15;
            option.className = "option";
            optionQuestion.appendChild(option)
            option.setAttribute("onclick", "getResult(this)");

        }
        

        questionCounter++

     }

     function getResult(element){
         const  id = parseInt(element.id);
         console.log(typeof id)
         if(id === currentQuestion.answer){
            element.classList.add("correct"); 
            updateAnswerIndicator("correct");
            correctAnswers++;
            console.log("correct:"+correctAnswers);

         }
         else {
            element.classList.add("wrong"); 
           

            const optionLen = optionQuestion.children.length;
            for(let i =0; i<optionLen; i++){
                if(parseInt(optionQuestion.children[i].id) === currentQuestion.answer){
                    optionQuestion.children[i].classList.add("correct");
                    updateAnswerIndicator("wrong");

                }
            }
         }
          attempt++;
         unclickableOption();

     }
     function unclickableOption(){ 
         const optionLen = optionQuestion.children.length;
         for(let i=0; i<optionLen; i++){
             optionQuestion.children[i].classList.add("already-answered");
         }


     }
    
        function answersIndicator(){
            answersIndicatorContainre.innerHTML = '';
            const totalQuestion = quiz.length;
            for(let i =0; i<totalQuestion; i++){
                const indicator = document.createElement("div");
                answersIndicatorContainre.appendChild(indicator);
            }

        }

        function  updateAnswerIndicator(markType){
            answersIndicatorContainre.children[questionCounter-1].classList.add(markType)
           
        }
    

     function next(){
         if(questionCounter === quiz.length){
             console.log("quiz over");
             quizOver();
         }
         else{
             getNewQuestion();
         }
     }

     function quizOver(){
        quizBox.classList.add("hide");
        resultBox.classList.remove("hide");
        quizResult();
     }
    function quizResult(){
        resultBox.querySelector(".total-question").innerHTML = quiz.length;
        resultBox.querySelector(".total-Attempt").innerHTML = attempt; 
        resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
        resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
        const percentage = (correctAnswers/quiz.length)*100;
        resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
        resultBox.querySelector(".total-score").innerHTML = correctAnswers +" / " + quiz.length;
    }

    function resetQuiz(){
     questionCounter  = 0;
     correctAnswers = 0;
     attempt = 0;

    }


    function tayAgainQuiz(){
        resultBox.classList.add("hide");
        quizBox.classList.remove("hide");
        resetQuiz();
        startQuiz();
    }

    function goToHome(){
        resultBox.classList.add("hide");
        homeBox.classList.remove("hide");
        resetQuiz();
    }
     
    
    function startQuiz(){
        homeBox.classList.add("hide");
        quizBox.classList.remove("hide");

        setAvailabeQuestions();

        getNewQuestion();
        answersIndicator();
    }

    window.onload = function(){
        homeBox.querySelector(".Number-question").innerHTML = quiz.length;
    }
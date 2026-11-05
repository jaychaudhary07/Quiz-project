let param = new URLSearchParams(window.location.search);
let quizobj = Number(param.get('id'));
let quizDetail = null;
let currentQue = 0;
let userAns = [];
let skip = 0;
let timer = 0;
let stop ;
 

// console.log(quizz[0].title);



function $(element){
    return document.getElementById(element);
}


function banner (obj){
    let idfound = quizz.find( item => item.id === obj );
    (idfound) ? quizDetail=idfound : window.location.href='index.html';
    $('image').src = quizDetail.image;
    $('title').innerHTML = quizDetail.title;
    $('desc').innerHTML = quizDetail.description;
    $('question').innerHTML = quizDetail.questions.length;
    $('time').innerHTML = quizDetail.time;
}


banner(quizobj);


function showQue(){
    timer = quizDetail.time;
    countDown();

    userAns=[]
    document.getElementById('banner-sec').classList.add('d-none')
    document.getElementById('que-sec').classList.remove('d-none')
    document.getElementById('score-sec').classList.add('d-none')

    currentQue = 0;

    for (let i=0; i<quizDetail.questions.length; i++) {
        userAns.push(null);    
    }   
     console.log(userAns);
      
}


document.querySelector('#quiz-btn button').addEventListener("click",showQue);



function showAns(i){
    userAns[currentQue]=quizDetail.questions[currentQue].option[i];
    renderOption();
}


function totalAtempt (){
    let attempQue = 0;
    
    for(let i=0; i<userAns.length; i++){
        if (userAns[i] != null) {
            attempQue++;
        }
    }
    return attempQue;
}


function totalSkip(){
    let skip = 0;
    
    for(let i=0; i<userAns.length; i++){
        if (userAns[i] === null) {
            skip++;
        }
    }
    return skip;
}


function countDown(){
    stop = setInterval(()=>{
        if(timer == 0){
            finish();

        }
        $('remain').textContent = timer--;
    },1000)
}

function renderOption(){
    const optContainer = document.querySelector('.opt');
    optContainer.innerHTML='';

    for(let i=0; i<quizDetail.questions[currentQue].option.length;i++){
        let optionText = quizDetail.questions[currentQue].option[i];
        let button = document.createElement('button');

        button.classList=(userAns[currentQue]===quizDetail.questions[currentQue].option[i])?`btn bg-success text-light border rounded-2 col-11 col-lg-4 mt-2 py-2 mb-4 mx-2`:`btn bg-transparent border rounded-2 col-11 col-lg-4 mt-2 py-2 mb-4 mx-2`;
        
        button.innerText = optionText;
        
        if(userAns[currentQue] != null && userAns[currentQue] !== optionText){
            button.disabled = true;
        }

        optContainer.append(button);
         button.addEventListener("click",()=>{
            showAns(i);
            
         }); 
    }

}

function questionLoad (){
    
    $('current-que').innerText=currentQue+1;
    $('total-que').innerText=quizDetail.questions.length;
    $('progress').style.width = `${((currentQue+1) / quizDetail.questions.length)*100}%`;
    $('total-atempt').textContent = totalAtempt();
    $('Attempted-que').innerHTML = quizDetail.questions.length;
    $('quiz-que').innerHTML = quizDetail.questions[currentQue].question;
    $('next-btn').textContent = (currentQue<quizDetail.questions.length-1)? `Next` : `Finish`;

    // document.querySelector('.opt').innerHTML='';
    // for(let i=0; i<quizDetail.questions[currentQue].option.length;i++){
    //     let button = document.createElement('button');
    //     button.classList=(userAns[currentQue]===quizDetail.questions[currentQue].option[i])?`btn bg-success text-light border rounded-2 col-11 col-lg-4 mt-2 py-2 mb-4 mx-2`:`btn bg-transparent border rounded-2 col-11 col-lg-4 mt-2 py-2 mb-4 mx-2`;
    //     button.innerText = quizDetail.questions[currentQue].option[i];
    //     // console.log(userAns[currentQue]);
        
    //     document.querySelector('.opt').append(button);
    //     // console.log(button);
    //      button.addEventListener("click",()=>{
    //         showAns(i);
            
    //      })  
    // }
    renderOption();
}

questionLoad();



function scoreDetail (){
    let right = 0;
    let wrong = 0;

    for(let i=0; i<userAns.length; i++){

        if (userAns[i] == quizDetail.questions[i]['true-ans']) {
            console.log("Correct userAns", userAns[i]);
            right++;
        }else{
            console.log("wrong userAns", userAns[i]);
            wrong++;
        }
    }
    return {right,wrong};
}


function finish (){
    let scoreObj = scoreDetail();
    clearInterval(stop)
    $('rightOpt').textContent = scoreObj.right;
    $('wrongOpt').textContent = scoreObj.wrong;
    $('que-sec').classList.add('d-none')
    $('score-sec').classList.remove('d-none')
    $('skip').textContent = totalSkip();
    $('Attempt').textContent=totalAtempt();
    $('totl-atempt').textContent = quizDetail.questions.length;
    // console.log(quizDetail.questions.length);   
}



function nextque (){
    if (currentQue<quizDetail.questions.length-1) {
        currentQue++;
        console.log(currentQue);    
    }else{
        finish();
    }  
}



$('next-btn').addEventListener('click',
   () =>{
       nextque();
       questionLoad();
    }
)


function homeBtn (){
    window.location.href='index.html';
}
$('home-btn').addEventListener('click',  homeBtn)


$('play-btn').addEventListener('click' , ()=>{
    showQue();
    questionLoad();

})

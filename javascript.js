// made changes in debug open preferences file after fonts family those things added to make javascript work

var playing = false; // we need to set it initially as otherwise we will not know we are playing or not

var score;  //no need to set it initially
var action; // needed to store time interval created using set intervale method
var timeremaining // variable used to store timeremaining when we click on start game
var correctanswer;  // to store correct answer declared outside as it will be used outside the function also

//if we click on start reset - event 1
document.getElementById("startreset").onclick = function(){
    // if we are playing
    if(playing == true){
        location.reload() //reload page
    }else{ 
        //if we are not playing
        // set score to 0 and playing to true
        score = 0;
        playing = true;
        document.getElementById("scorevalue").innerHTML = score;
        // show countdown box
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        //hide gameover
        hide("gameover");
        
        // change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        //start countdown.  since it will take multiple statements better to use function here for code readibility
        
        startcountdown();
        
        // generate new question and answer
        generateQA();
        
    }
}

// if we click on choices - Event two
for(i =1;i<5;i++){
    document.getElementById("box"+ i).onclick = function(){
    //check if we are playing
    if(playing == true){
        if(this.innerHTML == correctanswer){ //this can be used to refer to same html element which clicked
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            hide("wrong");
            show("correct");
            setTimeout(function(){
               hide("correct") 
            },1000);
            // generate new QA
            generateQA();
            
        }else{
            hide("correct");
            show("wrong");
            setTimeout(function(){
               hide("wrong") 
            },1000)
        }
    }
}
}


// Functions
// start counter
function startcountdown(){
    action = setInterval(function(){
        timeremaining -=1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        // if we dont check this time will go in negative 
        if(timeremaining == 0){
            stopcountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false; // now change mode to non playing
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    },1000)
    
}

// stop counter
function stopcountdown(){
    clearInterval(action);
}

// we using these two statements so many time so created funnction for them
function hide(Id){
    document.getElementById(Id).style.display = "none";
}

function show(Id){
    document.getElementById(Id).style.display = "block";
}

//generate questions and answers
function generateQA(){
    var x = 1 + Math.round(Math.random()*9);
    // we need number between 1 and 10 so this trick used to avoid 0
    var y = 1 + Math.round(Math.random()*9);
    correctanswer = x*y; // since it will be used in one of choices so declared outside
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctposition = 1 + Math.round(Math.random()*3);
    
    // fill one box with correct answer
    document.getElementById("box" + correctposition).innerHTML = correctanswer;
    
    var answers=[correctanswer];  // this array is created to store all answers so that to make sure two same wrong answers are not displayed. we will store correct answer in it initially and then for loop will add other and while adding we will check if  answer already there//
    
    
    // fill other box with wrong answers
    for(i=1;i<5;i++){
        if(i != correctposition){ // !== not equal in value plus type
            var wronganswer;
            do{
                wronganswer= 1 + Math.round(Math.random()*9)*1 + Math.round(Math.random()*9); 
            }while(answers.indexOf(wronganswer) > -1); // need to do this because randon number can generate two same answers also so to make sure no two same answers come in our choices we make array and if index is >-1 as index start from 0 means its already there so  do runs again  and secondly first do then while because we want to have one value before while. if we do straightway comparison in while then initially wrong answer is not defined so it will be undefined and while loop will not run//
            document.getElementById("box"+i).innerHTML = wronganswer;
            answers.push(wronganswer)
        }
    }
    
}
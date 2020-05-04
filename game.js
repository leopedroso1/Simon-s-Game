
// Button colors array
var buttonColors = ['red','blue','green','yellow'];

// Patter game => Will be used as a memory 
var gamePattern = []; // Game memory ---> Generated randomically by our JS
var userClickedPattern = [] // User memory ---> Selections made by user

// Check if the game has started
var started = false;
// Game level 
var level = 0;

// Keyboard click handler
$(document).keypress(function(){

    // if keypressed start the game
    if(!started){

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});

// Button click Handler
$(".btn").click(function(){

    var userChosenColor = $(this).attr("id"); //Take this ".btn" as "this"
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor); // Play sounds when click
    animatePress(userChosenColor); // Set the animation when click

    checkAnswer(userClickedPattern.length-1);  // Check the answer
});


// Check the answer given by the user input
function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function () {

                nextSequence();

            }, 1000);

        } 
    } else {

        console.log("Fails!");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over!, Press any key to restart");

        setTimeout(function(){

        $("body").removeClass("game-over");

        }, 200);

        startOver();

    }
        
}

// Generates the next sequence
function nextSequence(){

    userClickedPattern = [];
    level ++;
    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random() * 4);    
    var randomChosenColor = buttonColors[randomNumber]; // pick a color
    gamePattern.push(randomChosenColor); // add to the game pattern

    // Flash effect on our button
    $("#" + randomChosenColor).fadeOut(100).fadeIn(10).fadeOut(100).fadeIn(10);
    playSound(randomChosenColor);    

}

function animatePress(currentColor) {

    // Add effect
    $("#" + currentColor).addClass("pressed");

    // After 100 ms remove the effect
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);    

}

// Play selected by user or randomized by our web app
function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function startOver(){

    level = 0;
    gamePattern = [];
    started = false;

}
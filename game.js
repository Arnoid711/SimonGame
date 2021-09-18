var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//
var started = false;
var level = 0;

$(document).on("keydown", function() {
  if (started === false) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Fuction to log user clicks
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  var userIndex = (userClickedPattern.length - 1);
  checkAnswer(userIndex);

});


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Function to check the users answer against the game sequence
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern[(gamePattern.length - 1)] === gamePattern[(gamePattern.length - 1)]) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    var playAudio = new Audio("sounds/wrong.mp3");
    playAudio.play();
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//Function to generate a squence
function nextSequence() {
  $("h1").text("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeTo(100, 0.3, function() {
    $(this).fadeTo(400, 1.0);
  });
  playSound(randomChosenColour);
}

//Fuction for playing audio
function playSound(name) {
  var playAudio = new Audio("sounds/" + name + ".mp3");
  playAudio.play();
}

//Function to restart game
function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

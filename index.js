/* Simon Game (index.js) */

// Creating an empty array
var userClickedPattern = [];

// Creating an empty array
var gamePattern = [];

var buttonColors = ["green", "red", "yellow", "blue"];

var gameStart = false;
var userLevel = 0;

$(".btn-play").click(() => {

    if (gameStart === false) {
        nextSequence();
        gameStart = true;
        $(".btn-play").addClass("hide-button");
    }
});

function nextSequence() {
    userClickedPattern = [];
    userLevel = userLevel + 1;
    $("h1").text("Level " + userLevel);

    // Creating a random number between 0-3.
    var randomNumber = Math.random();
    randomNumber = randomNumber * 4;
    randomNumber = Math.floor(randomNumber);

    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    var randomChosenColorId = "#" + randomChosenColor;

    // Animating a flash to the button selected random
    $(randomChosenColorId).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

// Selecting 4 buttons
$(".btn").click(myClickFunction);

function myClickFunction() {

    // this: tıklama olayını tetikleyen element.

    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    var numberOfUserClicks = userClickedPattern.length;
    var lastIndexOfArray = numberOfUserClicks - 1;
    checkAnswer(lastIndexOfArray);
}

function playSound(name) {

    var randomChosenColorFilePath = "./assets/sounds/color-" + name + ".mp3";
    var audio = new Audio(randomChosenColorFilePath); // Creating a new object
    audio.play();
}

function animatePress(color) {

    var colorId = "#" + color;
    $(colorId).addClass("pressed"); // Adding new class to selected button.

    setTimeout(() => {
        $(colorId).removeClass("pressed"); // Removing the class from selected button.
    }, 100);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            // true

            setTimeout(() => {
                nextSequence(); // A new color should be shown.
            }, 1000);
        }
    }
    else {
        // false
        var wrongSound = "./assets/sounds/wrong.mp3";
        var audio = new Audio(wrongSound); // Creating a new object
        audio.play();

        $("body").addClass("game-over");
        $("h1").text("Game Over!");
        $(".btn-play").removeClass("hide-button");
        $(".btn-play").text("RESTART");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        // The game must restart
        restartGame();
    }
}

function restartGame() {

    userLevel = 0;
    gamePattern = [];
    gameStart = false;
}
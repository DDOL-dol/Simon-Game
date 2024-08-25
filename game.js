var gameStart = false;
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var gamePattern = [];
var userClickedPattern = [];


function nextSequence() {
    level++;
    $("h1").text(`Level ${level}`);
    userClickedPattern = [];
    randomChosenColor();
}

function randomChosenColor() {
    var randN = Math.floor(Math.random() * 4);
    var btn_id = buttonColors[randN];
    gamePattern.push(btn_id);

    var aud = new Audio(`sounds/${btn_id}.mp3`);
    aud.play();

    $("." + btn_id).addClass("pressed");
    setTimeout(() => { $("." + btn_id).removeClass("pressed"); }, 100);
    return btn_id;
}


function startGame() {
    gameStart = true;
    nextSequence();
}

function loseGame(){
    gameStart = false;
    gamePattern = [];
    level = 0;
    userClickedPattern = [];
    $("body").addClass("game-over");
    setTimeout(()=>{$("body").removeClass("game-over");}, 100);
    $("h1").text("Press A Key to Restart");
}

// detect user press A
$(document).keypress(function (event) {
    if (event.key === "a") {
        startGame();
    }
});


function checkValidPattern(){
    var idx = userClickedPattern.length - 1;
    return userClickedPattern[idx] === gamePattern[idx];
}

$(".button").click(function () {
    if (startGame) {
        var btn_id = $(this).attr('id');
        userClickedPattern.push(btn_id);

        var aud = new Audio(`sounds/${btn_id}.mp3`);
        aud.play();

        $("." + btn_id).addClass("pressed");
        setTimeout(() => { $("." + btn_id).removeClass("pressed"); }, 100);

        if(checkValidPattern()){
            // success
            if(userClickedPattern.length === gamePattern.length){
                setTimeout(nextSequence, 1000);
            }
        }else{ // lose
            loseGame();
        }
    }
});

let simon = {
  gamePattern: [],
  userPattern: [],
  colors: ["red", "green", "blue", "yellow"],
  level: 0,
  gameStarted: false,
  gameOver: false,
  soundOn: true,
  difficulty: 300,
};

function animatePress(currentColor) {
  $("#" + currentColor).addClass("memFlash");
  setTimeout(function () {
    $("#" + currentColor).removeClass("memFlash");
  }, 100);
}

$(".box").click(function () {
  if (simon.gameStarted && !simon.gameOver) {
    let userChosenColor = $(this).attr("id");
    simon.userPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(simon.userPattern.length - 1, userChosenColor);
  }
});
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function difficulty() {
  if (simon.level < 5) simon.difficulty = 300;
  else if (simon.level < 10) simon.difficulty = 150;
  else if (simon.level < 15) simon.difficulty = 80;
  else simon.difficulty = 40;
}

$(".startGame").click(function () {
  if (!simon.gameStarted) {
    $(".startGame").text("All the best!");
    $(".restart").text("Restart");
    simon.gameStarted = true;
    simon.gameOver = false;
    simon.level = 0;
    simon.gamePattern = [];
    nextSequence();
  }
});

$(".restart").click(function () {
  simon.gameStarted = false;
  simon.gameOver = false;
  simon.level = 0;
  simon.gamePattern = [];
  $("h3").text("LEVEL: " + simon.level);
  $(".startGame").text("Click here to start again");
  $("#score").text("0");
});

function nextSequence() {
  simon.userPattern = [];
  simon.level++;
  $("h3").text("LEVEL: " + simon.level);
  $("#score").text(simon.level - 1);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = simon.colors[randomNumber];
  simon.gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(difficulty())
    .fadeIn(difficulty());
}

function checkAnswer(currentLevel, userChosenColor) {
  if (simon.gamePattern[currentLevel] === simon.userPattern[currentLevel]) {
    if (simon.soundOn) {
      playSound(userChosenColor);
    }
    if (simon.gamePattern.length === simon.userPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("gameOver");
    if (simon.soundOn) {
      playSound("wrong");
    }
    $(".restart").text("Oops! start again");
    simon.gameOver = true;
    setTimeout(function () {
      $("body").removeClass("gameOver");
    }, 200);
  }
}

$(".sound").click(function () {
  simon.soundOn = !simon.soundOn;
  $(".sound").text("Sound: " + (simon.soundOn ? "On" : "Off"));
});

function gamePatternColors(simon) {
  let colorPattern = "";
  for (let index = 0; index < simon.gamePattern.length; index++) {
    colorPattern += simon.gamePattern[index] + " ";
  }
  return colorPattern;
}

$(".help").click(function () {
  alert(" " + gamePatternColors(simon));
});

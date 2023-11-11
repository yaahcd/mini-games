const getRandomNumber = function (size) {
  return Math.floor(Math.random() * size);
};

const getDistance = function (event, target) {
  let diffX = event.offsetX - target.x;
  let diffY = event.offsetY - target.y;

  return Math.sqrt(diffX * diffX + diffY * diffY);
};

const getDistanceHint = function (distance) {
  if (distance < 10) {
    $("#distance").removeClass("blue");
    $("#distance").removeClass("orange");
    $("#distance").addClass("red");
    return "Boiling hot!";
  } else if (distance < 20) {
    $("#distance").removeClass("blue");
    $("#distance").removeClass("orange");
    $("#distance").addClass("red");
    return "Really hot";
  } else if (distance < 40) {
    $("#distance").removeClass("blue");
    $("#distance").removeClass("orange");
    $("#distance").addClass("red");
    return "Hot";
  } else if (distance < 80) {
    $("#distance").removeClass("blue");
    $("#distance").removeClass("red");
    $("#distance").addClass("orange");
    return "Warm";
  } else if (distance < 160) {
    $("#distance").removeClass("red");
    $("#distance").removeClass("orange");
    $("#distance").addClass("blue");
    return "Cold";
  } else if (distance < 320) {
    $("#distance").removeClass("red");
    $("#distance").removeClass("orange");
    $("#distance").addClass("blue");
    return "Really cold";
  } else {
    $("#distance").removeClass("red");
    $("#distance").removeClass("orange");
    $("#distance").addClass("blue");
    return "Freezing!";
  }
};

const treasureMap = $("#map");
const width = treasureMap.width();
const height = treasureMap.height();
let clicks = 0;

const target = {
  x: getRandomNumber(width),
  y: getRandomNumber(height),
};

$("#map").click(function (event) {
  clicks++;

  let distance = getDistance(event, target);
  let distanceHint = getDistanceHint(distance);
  $("#distance").text(distanceHint);
  console.log(distance);
  if (distance < 8) {
    alert("You've found the treasure in " + clicks + " clicks!");
  }
});

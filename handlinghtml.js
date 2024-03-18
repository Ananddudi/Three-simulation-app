var btn = document.getElementById("button");
var info = document.getElementById("info");
var infoback = document.getElementById("infoback");

btn.addEventListener("click", function () {
  setTimeout(() => {
    info.style.display = "none";
    infoback.style.display = "none";
  }, 1000);
});

button.addEventListener("mouseover", async function () {
  button.style.color = "black";
  button.style.background = "white";
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //animation of buttons
  var li = document.querySelectorAll("ul li");
  for (var i = 0; i < li.length; i++) {
    li[i].style.transform = "translateY(-30px)";
    li[i].style.visibility = "hidden";
  }
  for (var n = 0; n < li.length; n++) {
    await sleep(200);

    li[n].style.transition = "transform ease-out 0.2s";
    li[n].style.visibility = "visible";
    li[n].style.transform = "translateY(0px)";
    await sleep(230);
  }
});

button.addEventListener("mouseout", () => {
  button.style.color = "white";
  button.style.background = "black";
  var li = document.querySelectorAll("ul li");
  for (var i = 0; i < li.length; i++) {
    li[i].style.visibility = "hidden";
  }
});

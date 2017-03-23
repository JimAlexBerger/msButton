var buttons = [];

var config = { attributes: true, characterData: true, attributeOldValue: true};
var observer = new MutationObserver(function(mutations) {
  if(!move){
    if(!changed){
      mutations[0].target.style.cssText = mutations[0].oldValue;
      changed = !changed;
    }
    else{
      changed = !changed;
    }
  }
  move = false;
});

for(var i = 0; i < 3; i++){
  var btn = document.createElement("BUTTON");
  btn.style.position = "fixed";
  btn.tabIndex="-1";
  btn.posX = window.innerWidth/2 - i*80;
  btn.posY = window.innerHeight/4*3;
  btn.style.bottom = btn.posY + "px";
  btn.style.right = btn.posX + "px";
  btn.style.width = "70px";
  btn.style.height = "20px";
  //btn.style.top = window.innerHeight - btn.posY + "px" + 70;
  //btn.style.left = window.innerWidth - btn.posX + "px" + 20;
  btn.click = "";
//  btn.focus = "";
if(i == 0)
  btn.style.backgroundImage =  "url('easy.png')";
else if(i == 1)
  btn.style.backgroundImage =  "url('medium.png')";
else if(i == 2)
  btn.style.backgroundImage =  "url('hard.png')";

  btn.innerHTML = "";


  // configuration of the observer:

  // pass in the target node, as well as the observer options
  if(i > 0){
    observer.observe(btn, config);
  }
  document.getElementById((i == 2 ? "hard":"btnDiv")).appendChild(btn);
  buttons.push(btn);
}
var move = false;
var changed = false;

// create an observer instance


document.onmousemove = update;
window.onclick = niceTry;

function update(evt){
  var length = 120;
  var pos = evtToPos(evt);
  for(btn in buttons){
    var dist = Math.sqrt(Math.pow(Math.abs(buttons[btn].posX - pos.x),2)+Math.pow(Math.abs(buttons[btn].posY - pos.y),2));

    if(dist < length){
      move = true;
      //get angle
      var unit = {
        x: (1/(dist))*(pos.x - buttons[btn].posX),
        y:  (1/(dist))*(pos.y - buttons[btn].posY)
      }

      buttons[btn].posX = pos.x - unit.x * length;
      buttons[btn].posY = pos.y - unit.y * length;
    }

    if(buttons[btn].posX < 0){
      buttons[btn].posX = window.innerWidth - length;
    }
    if(buttons[btn].posX > window.innerWidth){
      buttons[btn].posX = length;
    }
    if(buttons[btn].posY < 0){
      buttons[btn].posY = window.innerHeight - length;
    }
    if(buttons[btn].posY > window.innerHeight){
      buttons[btn].posY = length;
    }
    //buttons[btn].tabIndex="-1";
    buttons[btn].style.width = "70px";
    buttons[btn].style.height = "20px";
    buttons[btn].style.bottom = buttons[btn].posY + "px";
    buttons[btn].style.right = buttons[btn].posX + "px";
      //TODO Change focus to something else than button
    buttons[btn].innerHTML = "";
    //buttons[btn].style.top = window.innerHeight - buttons[btn].posY + "px";
    //buttons[btn].style.left =window.innerWidth - buttons[btn].posX + "px";
  }
}


function niceTry(evt){
  if(buttons.indexOf(evt.path[0]) >= 0 || buttons.indexOf(evt.path[1]) >= 0){
    var btn = document.createElement("BUTTON");
    btn.style.position = "fixed";
    btn.tabIndex="-1";
    if(buttons.indexOf(evt.toElement) >= 0){
      btn.posX = evt.toElement.posX + Math.random()*100 - 50;
      btn.posY = evt.toElement.posY + Math.random()*100 - 50;
    }
    else{
      btn.posX = evt.path[1].posX + Math.random()*200 - 100;
      btn.posY = evt.path[1].posY + Math.random()*200 - 100;
    }
    btn.style.bottom = btn.posY + "px";
    btn.style.right = btn.posX + "px";
  //  btn.style.top = window.innerHeight - btn.posY + "px";
  //  btn.style.left =window.innerWidth - btn.posX + "px";
    btn.click = "";
    btn.innerHTML = "";
    btn.style.backgroundImage =  "url('click.png')";
    btn.style.width = "70px";
    btn.style.height = "20px";
  // pass in the target node, as well as the observer options
    observer.observe(btn, config);
    document.getElementById("btnDiv").appendChild(btn);
    buttons.push(btn);
  }
  else{
    document.getElementById("rip").innerHTML += "RIP ";
  }
}

var element = new Image();
Object.defineProperty(element, 'id', {
  get: function () {
    document.getElementById("hard").remove();
    alert("Det blir for lett");
  }
});
console.log('%cRIP', element);

function evtToPos(evt){
  return {
    x:-evt.clientX + window.innerWidth,
    y:-evt.clientY + window.innerHeight
  };
}

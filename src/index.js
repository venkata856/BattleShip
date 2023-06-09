import _, { flip } from "lodash";
import ship from "./ship.js";
import "./style.css";

const width = 20;
let angle = 0;
let draggedShip;
let notDropped;


function createRoot() {
  const root = document.createElement("div");
  root.className = "water";
  document.body.appendChild(root);
}

createRoot();
createWater("white","player");
createButtons();
createShipOptions();
applyFlipLogic();


function createWater(color,player) {
  const root = document.querySelector(".water");
  const gameBoardContainer = document.createElement("div");

  gameBoardContainer.className = "game-board";
  gameBoardContainer.style.backgroundColor = color
  gameBoardContainer.id = player;

  for (let i = 0; i < width * width; i++) {
    const water = document.createElement("div");
    water.className = "coOrdinate";

    water.id = i;
    gameBoardContainer.appendChild(water);
  }

  root.append(gameBoardContainer);
}


function createShipOptions(){

  

  const optionsContainer= document.createElement("div");
  optionsContainer.className = "option_container";
  const submarine = document.createElement('div');
  submarine.classList.add("submarine-preview");
  submarine.classList.add("submarine");
  submarine.draggable=true;
  submarine.id = '0';
  optionsContainer.appendChild(submarine);
  const carrier = document.createElement('div');
  carrier.className= "carrier-preview";
  carrier.classList.add("carrier");
  carrier.draggable = true;
  carrier.id = '1'
  optionsContainer.appendChild(carrier);

  const destroyer = document.createElement('div');
  destroyer.className="destroyer-preview";
  destroyer.classList.add("destroyer");
  destroyer.draggable=true;
  destroyer.id = '2'
  optionsContainer.appendChild(destroyer);

  const battleship = document.createElement('div');
  battleship.className="battleship-preview";
  battleship.classList.add("battleship");
  battleship.draggable = true;
  battleship.id = '3'
  optionsContainer.appendChild(battleship);

  const fleet = document.createElement('div');
  fleet.className="fleet-preview";
  fleet.classList.add("fleet");
  fleet.draggable=true;
  fleet.id = '4'
  optionsContainer.appendChild(fleet);

  document.body.appendChild(optionsContainer);
}

function createButtons(){

  const buttonContainers= document.createElement("div");

  buttonContainers.classList.add('buttonContainer');

  const flipButton  = document.createElement("button");
  flipButton.textContent ="Flip";
  flipButton.classList.add("flipButton");

  const startButton  = document.createElement("button");
  startButton.textContent ="Start";
  startButton.classList.add("startButton");

  startButton.addEventListener("click",startGame);

  buttonContainers.append(flipButton);
  buttonContainers.append(startButton);

  document.body.appendChild(buttonContainers);


}
function flipLogic(){

  const shipOption = document.querySelector(".option_container");

  const shipOptions = Array.from(shipOption.children);

  angle = angle === 0 ? 90 : 0;

  shipOptions.forEach(option => option.style.transform = `rotate(${angle}deg)`)
}


function applyFlipLogic(){

  const flipButton = document.querySelector('.flipButton');
  flipButton.addEventListener('click',flipLogic);

  


}

const destroyer = ship(2,"destroyer",3);
const carrier = ship(1,"carrier",6);
const submarine = ship(0,"submarine",5);
const fleet = ship(4,"fleet",4);
const battle = ship(3,"battleship",4);

const ships = [submarine,carrier,destroyer,battle,fleet]

function getValidity(allCoordinates,isHorizontal,startIndex, ship){

  let validStart = isHorizontal ? startIndex <= width * width - ship.length ? startIndex : width * width - ship.length : startIndex <= width * width -  width * ship.length ? startIndex : startIndex - ship.length * width + width;

  let shipBlocks = [];
  for(let i = 0; i < ship.length ; i++){

    if(isHorizontal){
      shipBlocks.push(allCoordinates[Number(validStart) + i])
  
    }else{
      shipBlocks.push(allCoordinates[Number(validStart) + i * width])
    }
    ship.setStart(Number(validStart));
    ship.setAlignment(isHorizontal);

  }


  let valid 
  if(isHorizontal){
    shipBlocks.every((_shipBlock,index) =>
    valid = shipBlocks[0].id % width != width - (shipBlocks.length - (index + 1)))
  }
  else{

    shipBlocks.every((_shipBlock,index) =>
    valid = shipBlocks[0].id < 380 +(width * index + 1))
  }

  let shipNotTaken =shipBlocks.every(shipBlock => !shipBlock.classList.contains("taken"));

  return {
    shipBlocks,
    valid,
    shipNotTaken
  }
}


function addShipPiece(user,ship,startId){
  const allCoordinates = document.querySelectorAll(`#${user} div`);

  let randomBoolean = Math.random() < 0.5;

  let isHorizontal = user === 'player' ? angle===0 : randomBoolean;


  let randomStartIndex  = Math.floor(Math.random() * width * width);

  let startIndex = startId ? startId : randomStartIndex

  const {shipBlocks,valid,shipNotTaken} = getValidity(allCoordinates,isHorizontal,startIndex, ship)

  if(valid && shipNotTaken){

    shipBlocks.forEach(block=>{
      block.classList.add(ship.name);
      block.classList.add("taken");
    })
  }else{
    if(user ==='computer') addShipPiece(user,ship,startId);

    if(user==='player') notDropped = true;
  }




}

// ships.forEach(ship => addShipPiece(ship))

const shipOption = document.querySelector(".option_container");

const shipOptions = Array.from(shipOption.children);

shipOptions.forEach(shipOption => shipOption.addEventListener('dragstart',dragStart))

// addShips(destroyer);

function dragStart(e){

  notDropped = false;
  draggedShip = e.target
}

const allPlayerBlocks = document.querySelectorAll('#player div')

allPlayerBlocks.forEach(playerBlock=> {playerBlock.addEventListener('dragover',dragover);
playerBlock.addEventListener('drop',dropShip)
})

function dragover(e){

  e.preventDefault();

  const ship =ships[draggedShip.id]

  highlightArea(e.target.id, ship)
}

function dropShip(e){
  const startId = e.target.id
  const ship = ships[draggedShip.id]

  addShipPiece('player',ship,startId)
  if(!notDropped) draggedShip.remove();
}

function highlightArea(startIndex, ship){

  const allCoordinates = document.querySelectorAll('#player div');
  let isHorizontal = angle===0;

  const {shipBlocks,valid,shipNotTaken} = getValidity(allCoordinates,isHorizontal,startIndex, ship)

  if(valid && shipNotTaken){

    shipBlocks.forEach(shipBlock => {
      shipBlock.classList.add('hover');
      setTimeout(() => shipBlock.classList.remove('hover'),500)


    })
  }

}


function startGame(){

  const optionContainer =document.querySelector(".option_container")
  const buttonContainer = document.querySelector(".buttonContainer");

  console.log(optionContainer.children)

  if(optionContainer.children.length !=0)
      alert("you need to place all the ships before you hit start button")
  else{

    document.body.removeChild(optionContainer);
    document.body.removeChild(buttonContainer);
    document.body.classList.add("center");
 

    createWater("#2762b0ab","computer");
    ships.forEach(ship => addShipPiece("computer",ship))
  }

  

}



'use strict';

var frequencyId = null,
cellsArr = [],
totalCells = 0,
cells = [],
normalCellColor = 'normalCellColorCss',
targetCellColor = "targetCellColorCss",
totalScore = 0;

(function(colsRows){
	totalCells = colsRows*colsRows;
	cellsArr = new Array(totalCells).join().split(',').map(function(item, index){ return ++index;});

	var tableStr = "<table>",
	tempTotalCells = totalCells;

	for(var i = 0; i < colsRows; i++){
		tableStr+="<tr>";
		for(var j = 0; j < colsRows; j++){
			tableStr+="<td class='"+ normalCellColor +"' id='"+ tempTotalCells +"'></td>";
			tempTotalCells--;
		}
		tableStr+="</tr>";
	}
	tableStr+="</table>";
	document.write(tableStr);

	cells = document.querySelectorAll('table td');
	registerEvent(cells);
}(5))

function interval(){
	pauseGame();
	frequencyId = setInterval(changeTarget, 1000);
};

function changeTarget(){
	var prevTargetCell = document.getElementsByClassName(targetCellColor)[0],
	nextCell = cellsArr[Math.floor(Math.random() * totalCells)];

	if(prevTargetCell) removeTarget(prevTargetCell);
	setTarget(document.getElementById(nextCell));
};

function setResult(e){
	console.log(1);
	if(e.target.className === targetCellColor){ removeTarget(e.target); updateScore(); }
};

function updateScore(){
	document.getElementById('result').textContent = ++totalScore;
};

function startGame(){
	interval();
};

function pauseGame(){
	if(frequencyId) clearInterval(frequencyId);
};

function resetGame(){
	if(totalScore) {
		totalScore = -1;
		updateScore();
	}
};

function removeTarget(targetCell){
	targetCell.className = normalCellColor;
};

function setTarget(targetCell){
	targetCell.className = targetCellColor;
};

function registerEvent(){
	Array.prototype.forEach.call(cells, function(td) {
		td.addEventListener('mousedown', setResult);
	});
};
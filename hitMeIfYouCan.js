'use strict';

/* To initialize variables */
var frequencyId = null,
cellsArr = [],
totalCells = 0,
cells = [],
normalCellColor = 'normalCellColorCss',
targetCellColor = 'targetCellColorCss',
totalScore = 0;

/* To draw game */
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

/* To change highlighted cell randomly */
function changeTarget(){
	var prevTargetCell = document.getElementsByClassName(targetCellColor)[0],
	nextCell = cellsArr[Math.floor(Math.random() * totalCells)];

	if(prevTargetCell) removeTarget(prevTargetCell);
	setTarget(document.getElementById(nextCell));
};

/* To change highlighted cell to normal cell & updates score */
function hitTarget(e){
	removeTarget(e.target); updateScore();
	//if(e.target.className === targetCellColor){ removeTarget(e.target); updateScore(); }
};

/* To update score */
function updateScore(){
	document.getElementById('result').textContent = ++totalScore;
};

/* To start game when user presses start game button */
function startGame(){
	pauseGame();
	frequencyId = setInterval(changeTarget, 1000);
};

/* To pause game when user presses pause button */
function pauseGame(){
	if(frequencyId) clearInterval(frequencyId);
};

/* To reset score of the game */
function resetGame(){
	if(totalScore) {
		totalScore = -1;
		updateScore();
	}
};

/* To change highlighted cell by normal cell. Overwrite css class */
function removeTarget(targetCell){
	targetCell.className = normalCellColor;
};

/* To change normal cell by highlighted cell. Over write css class */
function setTarget(targetCell){
	targetCell.className = targetCellColor;
};

/* To register mouse down action to each cells of table so when user press mouse on highlighted cell score get increased */
function registerEvent(){
	Array.prototype.forEach.call(cells, function(td) {
		td.addEventListener('mousedown', hitTarget);
	});
};

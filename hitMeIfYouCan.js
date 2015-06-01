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
			tableStr+="<td id='"+tempTotalCells+"'></td>";
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
	frequencyId = setInterval(function(){
		var prevTargetCell = document.getElementsByClassName(targetCellColor)[0],
		nextCell = cellsArr[Math.floor(Math.random() * totalCells)];

		if(prevTargetCell) prevTargetCell.className = normalCellColor;
		document.getElementById(nextCell).className = targetCellColor;
	}, 1000);
};

function setResult(e){
	if(e.target.className === targetCellColor) updateScore();
};

function registerEvent(){
	Array.prototype.forEach.call(cells, function(td) {
		td.addEventListener('click', setResult);
	});
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
		totalScore = 0;
		document.getElementById('result').textContent = totalScore;
	}
};
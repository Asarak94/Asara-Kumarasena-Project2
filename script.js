let moveCounter = 0;
let gameTime = 0;
let state = true;
let count = 1;

function swapTiles(cell1, cell2) {
    var temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
    if (state === true) {
        moveCounter++;
    }
    checkSolvedState();
}

function shuffle() {
    moveCounter = 0;
    gameTime = 0;
    if (count !== 1) {
        count++;
    }
    //Use nested loops to access each cell of the 4x4 grid
    for (var row = 1; row <= 4; row++) //foreach row of the 4x4 grid
    {
        //foreach column in this row
        for (var column = 1; column <= 4; column++) {
            //pick a random row from 1 to 4

            var row2 = Math.floor(Math.random() * 4 + 1);

            //pick a random column from 1 to 4
            var column2 = Math.floor(Math.random() * 4 + 1);
            state = false;

            swapTiles("cell" + row + column, "cell" + row2 + column2); //swap the look & feel of both cells
        }
    }
    if (state === false && count === 1) {
        startResults();
        count++;
    }
}

function simpleShuffle() {
    sessionStorage.setItem("reloading", "true");
    window.location.reload();
}

window.onload = function () {
    var reloading = sessionStorage.getItem("reloading");
    if (reloading) {
        sessionStorage.removeItem("reloading");
        state = false;
        swapTiles("cell" + 4 + 3, "cell" + 4 + 4); //swap the look & feel of both cells
    }

}
function clickTile(row, column) {
    state = true;
    var cell = document.getElementById("cell" + row + column);
    var tile = cell.className;
    /*moveCounter++;*/
    if (tile != "tile16") {
        //check if the white tile is on the right
        if (column < 4) {
            if (document.getElementById("cell" + row + (column + 1)).className == "tile16") {
                swapTiles("cell" + row + column, "cell" + row + (column + 1));
                return;
            }
        }
        //check if the white tile is on the left
        if (column > 1) {
            if (document.getElementById("cell" + row + (column - 1)).className == "tile16") {
                swapTiles("cell" + row + column, "cell" + row + (column - 1));
                return;
            }
        }
        //check if the white tile is above
        if (row > 1) {
            if (document.getElementById("cell" + (row - 1) + column).className == "tile16") {
                swapTiles("cell" + row + column, "cell" + (row - 1) + column);
                return;
            }
        }

        //check if the white tile is below
        if (row < 4) {
            if (document.getElementById("cell" + (row + 1) + column).className == "tile16") {
                swapTiles("cell" + row + column, "cell" + (row + 1) + column);
                return;
            }
        }
    }

}

// Checks if the order of numbers is correct and we get solved-state..
function checkSolvedState() {

    if (
        document.getElementById("cell11").className === "tile1" &&
        document.getElementById("cell12").className === "tile2" &&
        document.getElementById("cell13").className === "tile3" &&
        document.getElementById("cell14").className === "tile4" &&
        document.getElementById("cell21").className === "tile5" &&
        document.getElementById("cell22").className === "tile6" &&
        document.getElementById("cell23").className === "tile7" &&
        document.getElementById("cell24").className === "tile8" &&
        document.getElementById("cell31").className === "tile9" &&
        document.getElementById("cell32").className === "tile10" &&
        document.getElementById("cell33").className === "tile11" &&
        document.getElementById("cell34").className === "tile12" &&
        document.getElementById("cell41").className === "tile13" &&
        document.getElementById("cell42").className === "tile14" &&
        document.getElementById("cell43").className === "tile15" &&
        document.getElementById("cell44").className === "tile16"
    ) {
        startCongratsOverLay();

    }
}

function startCongratsOverLay() {
    const finaltime = document.querySelector('.time-text1');
    const finalmoveCount = document.querySelector('.move-text1');
    finaltime.innerHTML = gameTime;
    finalmoveCount.innerHTML = moveCounter;
    document.getElementById("overlay-2").style.display = "block";
}

function endCongratsOverLay() {
    document.getElementById("overlay-2").style.display = "none";
    shuffle();
}

function startResults() {
    const moveContainer = document.querySelector('.move-text');
    const timeContainer = document.querySelector('.time-text');
    moveContainer.innerHTML = '' + moveCounter;
    timeContainer.innerHTML = '' + gameTime;

    const movesUpdate = setInterval(
        () => {
            moveContainer.innerHTML = '' + moveCounter;
        },
        100);

    const gameInterval = setInterval(
        () => {
            timeContainer.innerHTML = '' + ++gameTime;
        },
        1000);
}
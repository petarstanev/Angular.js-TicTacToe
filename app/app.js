angular.module('app', [])
    .controller('mainController', function ($scope) {
        var cells = [];
        var playerId = 1;
        var gameOver = false;

        $scope.greeting = "Hello World";
        createCells();
        $scope.cells = cells;

        $scope.cellClicked = function (id) {
            playerClick(id);
        }


        function createCells() {
            for (var i = 0; i < 9; i++) {
                myCell = { id: i, text: "_", playerId: 0 };
                cells[i] = myCell;
            }
        }

        function playerClick(cellId) {
            if(cells[cellId].playerId === 0 && !gameOver ){
                cellUpdate(cellId);
            }
        }

        function cellUpdate(cellId){
            if (playerId === 1) {                
                updatedCell = { id: cellId, text: "X", playerId: 1 };
            } else {
                updatedCell = { id: cellId, text: "O", playerId: 2 };
            }
            cells[cellId] = updatedCell;
            
            if (checkForWin()) {
                endGame(false);
            }
            changePlayer();
        }

        function endGame(draw) {
            if (draw) {
                $scope.message = "Draw";
            } else {
                $scope.message = "Player " + playerId + " wins !";
                if (playerId === 1) {
                    $scope.messageClass = "mPlayer1";
                } else {
                    $scope.messageClass = "mPlayer2";
                }
            }
            gameOver = true;
        }

        function changePlayer() {
            if (playerId === 1) {
                playerId = 2;
            } else {
                playerId = 1;
            }
        }

        function checkForWin() {
            if (checkDiagonals()) {                
                return true;
            } else {
                for (var i = 0; i < 3; i++) {
                    if (checkColumns(i)) {
                        return true;
                    } else if (checkRows(i * 3)) {
                        return true;
                    }
                }
            }

            return false;
        }

        function checkDiagonals() {
            if(cells[4].playerId === playerId){
                if (cells[0].playerId === playerId && cells[8].playerId === playerId) {                    
                    return true;                
                }
                if (cells[2].playerId === playerId && cells[6].playerId === playerId) {                    
                    return true;
                }
            }
            return false;
        }

        function checkRows(i) {
            if (cells[i].playerId === playerId && cells[i + 1].playerId === playerId && cells[i + 2].playerId === playerId) {
                return true;
            }
            return false;
        }

        function checkColumns(i) {
            if (cells[i].playerId === playerId && cells[i + 3].playerId === playerId && cells[i + 6].playerId === playerId) {
                return true;
            }

            return false;
        }

    });
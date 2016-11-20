angular.module('app', [])
    .controller('mainController', function ($scope) {
        var cells = [];
        var playerId = 1;
        $scope.gameOver = false;
        $scope.playerOneScore = 0;
        $scope.playerTwoScore = 0;
        $scope.drawScore = 0;
        

        $scope.greeting = "Hello World";
        createCells();
        $scope.cells = cells;

        $scope.cellClicked = function (id) {
            playerClick(id);
        }
       
        $scope.resetGame = function(){
            $scope.gameOver = false;
            $scope.message = "";
            $scope.messageClass = "";
            createCells()
        }

        function createCells() {
            for (var i = 0; i < 9; i++) {
                myCell = { id: i, text: "fa-cog cellHide", playerId: 0 };
                cells[i] = myCell;
            }
        }

        function playerClick(cellId) {
            if (cells[cellId].playerId === 0 && !$scope.gameOver) {
                cellUpdate(cellId);
            }
        }

        function cellUpdate(cellId) {
            if (playerId === 1) {
                updatedCell = { id: cellId, text: "fa-times", playerId: 1 };
            } else {
                updatedCell = { id: cellId, text: "fa-circle-o", playerId: 2 };
            }
            cells[cellId] = updatedCell;

            if (checkForWin()) {
                endGame(false);
            } else if (checkDraw()) {
                endGame(true);
            }
            changePlayer();
        }

        function checkDraw() {
            var countEmptyCells = 0;
            for (var i = 0; i < cells.length; i++) {
                if (cells[i].playerId != 0) {
                    countEmptyCells++;
                }
            }

            if (cells.length === countEmptyCells) {
                return true;
            } else {
                return false;
            }
        }

        function endGame(draw) {
            if (draw) {
                $scope.message = "Draw";
                $scope.messageClass = "mDraw";
                $scope.drawScore++;
            } else {
                $scope.message = "Player " + playerId + " wins !";
                if (playerId === 1) {
                    $scope.messageClass = "mPlayer1";
                    $scope.playerOneScore++;
                } else {
                    $scope.messageClass = "mPlayer2";
                    $scope.playerTwoScore++;
                }
            }
            $scope.gameOver = true;
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
            if (cells[4].playerId === playerId) {
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
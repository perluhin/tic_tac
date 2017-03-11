function winning(board, player){
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
    ) {
        return true;
    } else {
        return false;
    }
}

function move(element,player){
    console.log(element.id);
    if(board[element.id] != "X" && board[element.id] != "O"){
        board[element.id] = "X";
        $(element).append("<div id='x'>X</div>");
        if (winning(board,"X")) {
            end = true;
            setTimeout(function() {
                alert("YOU WIN");
            }, 500);
        }        
    }
}


var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];


//var board = ['X','O', 'O', 'X', 'O', 5, 6, 7, 8];
//var board = ["O",1 ,"X","X",4 ,"X", 6 ,"O","O"];

var player1 = "X";
var player2 = "O";
var end = false;



$(document).on('click','td',function(){
    if(!end){
        move(this,player1);
        var settings = {
            "crossDomain": false,
            "url": "http://localhost:5000/board",
            "data": {json_str:JSON.stringify({board:board})},
            "async": false,
            "method": "POST",
        };
        $.ajax(settings).done(function (response) { 
            console.log(response.ans);
            $('#'+response.ans).append("<div id='o'>O</div>");
            board[response.ans] = 'O';

        }).fail(function(error) {
            console.log(error);
        });
    }
});

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
            setTimeout(function() {
                alert("YOU WIN");
            }, 500);
        }
    }
}


var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var player1 = "X";
var player2 = "O";



$(document).on('click','td',function(){
    move(this,player1);
});

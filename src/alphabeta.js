export const getActions = (Board) => {
var actions = [];
for(var i = 1; i<=9; i++){
    var key = "cell" + i;
    if(Board[key].invalue == '-'){
        actions.push(Board[key].rawNum);
    }
}
return actions;
}
export const getBestMove = (Board) => {
    const ans = minMinimax(Board,"X", Number.NEGATIVE_INFINITY * -1, Number.POSITIVE_INFINITY);
    return ans;
};
export const getNewBoard = (Board) => {
    const newBoard = JSON.parse(JSON.stringify(Board));
    return newBoard;
}
export const getResult = (Board, player, a) => {
    const myBoard = getNewBoard(Board);
    const key = "cell" + a;
    myBoard[key].invalue = player;
    return myBoard;
}
export const isTerminal = (Board, lastPlayer) =>{
    const horizontalChecks = {
        checks: {1: [1, 2, 3], 2: [4, 5, 6], 3:[7, 8, 9]},
  };
    const verticalChecks = {
        checks: {1: [1, 4, 7], 2: [2, 5, 8], 3: [3, 6, 9]},
  };
    const diagonalChecks = {
        checks: {1: [1, 5, 9], 2: [3, 5, 7]},
  };
    const checkingCells = Board;
    const hChecks = horizontalChecks.checks;
    const vChecks = verticalChecks.checks;
    const dChecks = diagonalChecks.checks;
    const blanks = getActions(Board).length;
    const notTerminal = {
        isTerminal: false,
        wonGame: false,
        score: 0,
    }
    console.log(checkingCells);
    if(blanks <= 4){
    const result = {
         isTerminal: true,
         wonGame : true,
         score : 1 + blanks
    }
    if(lastPlayer === "O"){
        result.score *= -1;
    }
    for(let i in hChecks){
      //console.log(i);
      var toBreak = false;
      const val = lastPlayer;
      //console.log("last Player " + val);
      //console.log("doing checks on " + hChecks[i]);
      for(const idx in hChecks[i]){
        var num = hChecks[i][idx];
        var key = "cell" + (num);
        //console.log("cell number " + key);
        //console.log("value in cell " + checkingCells[key].invalue);
        if(checkingCells[key].invalue !== val){
                toBreak = true;
                 break;
        }
      };
      if(!toBreak){
        console.log(hChecks[i], " Winner is " + lastPlayer, " Score is " + result.score);
        return result;
      }
    }
    for(let i in vChecks){
      //console.log(i);
      var toBreak = false;
      const val = lastPlayer;
      //console.log( "last Player " + val);
      //console.log( "doing checks on " + vChecks[i]);
      for(const idx in vChecks[i]){
        var num = vChecks[i][idx];
        var key = "cell" + (num);
        //console.log("cell number " + key);
        //console.log("value in cell " + checkingCells[key].invalue);
        if(checkingCells[key].invalue !== val){
                toBreak = true;
                 break;
        }
      };
      if(!toBreak){
        console.log(vChecks[i], " Winner is " + lastPlayer, " Score is " + result.score);
        return result;
      }
    }

    for(let i in dChecks){
      //console.log(i);
      var toBreak = false;
      const val = lastPlayer;
      //console.log( "last Player " + val);
      //console.log("doing checks on " + dChecks[i]);
      for(const idx in dChecks[i]){
        var num = dChecks[i][idx];
        var key = "cell" + (num);
        //console.log("cell number " + key);
        //console.log("value in cell " + checkingCells[key].invalue);
        if(checkingCells[key].invalue !== val){
                toBreak = true;
                 break;
        }
      };
      if(!toBreak){
        console.log(dChecks[i], " Winner is " + lastPlayer, " Score is " + result.score);
        return result;
      }
    }
}
    return notTerminal;
    }

export const maxMinimax = (Board, lastPlayer, alpha, beta) =>{
    const valTerminal = isTerminal(Board, lastPlayer);
    const result = {
        score: valTerminal.score,
        move: null
    }

    const value = {
        score : Number.NEGATIVE_INFINITY,
        move: -1
    }
    if(valTerminal.isTerminal){
        return result;
    }
    const possibleMoves = getActions(Board);
    for(let a in possibleMoves){
        const nextMove = possibleMoves[a];
        const finalState = getResult(Board, "X", nextMove);
        const val1 = minMinimax(finalState, "X", alpha, beta).score;
        console.log(val1);
        if(val1 > value.score){
            value.score = val1;
            value.move = nextMove;
            alpha = Math.max(alpha, value.score);
        }
        if(value.score >= beta){
            return value;
        }
    }
    return value

}


export const minMinimax = (Board, lastPlayer, alpha, beta) =>{
    const valTerminal = isTerminal(Board, lastPlayer);
    const result = {
        score: valTerminal.score,
        move: null
    }
    if(valTerminal.isTerminal){
        return result;
    }
    const value = {
        score : Number.POSITIVE_INFINITY,
        move: -1
    }
    const possibleMoves = getActions(Board);
    for(let a in possibleMoves){
        const nextMove = possibleMoves[a];
        const finalState = getResult(Board, "O", nextMove);
        const val1 = maxMinimax(finalState, "O", alpha, beta).score;
        console.log(val1);
        if(val1 < value.score){
            value.score = val1;
            value.move = nextMove;
            beta = Math.min(beta, value.score);
        }
        if(value.score <= alpha){
            return value;
        }
    }
    return value

}
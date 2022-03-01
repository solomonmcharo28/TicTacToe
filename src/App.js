import React, {Component} from 'react';
import logo from './logo.svg';
import ticx from './images/ticx.png';
import tico from './images/tico.png';
import {Button} from 'react-bootstrap';
import './App.css';

class App extends Component{
  state = {
    playerX: true,
    otherState: "SomeOtherValue",
    squareID: "",
    lastPlayer: "-",
    loggedInPerson : {

    },
    cells: {
      cell1 : {
            id: "cell1",
        touched: false,
        invalue: "-",
        player: "unknown",
        rawNum: 1,
      },
      cell2: {
            id: "cell2",
        touched: false,
        invalue: "-",
        player: "unknown",
        rawNum: 2,
      },
      cell3: {
            id: "cell3",
        touched: false,
        invalue: "-",
        player: "unknown",
        rawNum: 3,
      },
      cell4: {
            id: "cell4",
        touched: false,
        invalue: "-",
        player: "unknown",
        rawNum: 4,
      },
      cell5: {
          id: "cell5",
        touched: false,
        invalue: "-",
        player: "unknown",
        rawNum: 5,
      },
      cell6: {
        id: "cell6",
        touched: false,
        invalue: "-",
        player: "unknown",
        rawNum: 6,
      },
      cell7: {
           id: "cell7",
        touched: false,
        invalue: "-",
        player: "unknown",
        rawNum: 7,
      },
      cell8: {
            id: "cell8",
        touched: false,
        invalue: "-",
        player: "unknown",
        rawNum: 8,
      },
      cell9: {
            id: "cell9",
        touched: false,
        invalue: "-",
        player: "unknown",
        rawNum: 9,
      },
    },
    horizontal:{
          checks: {1: [1, 2, 3], 2: [4, 5, 6], 3:[7, 8, 9]},
    },
    vertical: {
          checks: {1: [1, 4, 7], 2: [2, 5, 8], 3: [3, 6, 9]},
    },
    diagonal: {
          checks: {1: [1, 5, 9], 2: [3, 5, 7]},
    }
  }

  componentDidMount(){

  }

  toggleTacHandler = (event) =>{
    const theID = event.target.id;
    console.log("button clicked " + theID + " " + this.state.playerX);
    console.log(theID);
    const currSquare = document.getElementById(theID);
    console.log(currSquare.classList);
    const updatedCellForm = {
    ...this.state.cells};
    const updateCell = {
      ...updatedCellForm[theID]
    };
    console.log(updateCell.touched + " " + updateCell.id + " " + updateCell.player);
    if(updateCell.touched){
      console.log("We cant edit this cell");
      return;
    }
    if(this.state.playerX){
      /*
      const myimg1 = document.createElement("img");
      myimg1.src = ticx;
      myimg1.classList.add("imgxo");
      */
      currSquare.innerHTML = "X";
      console.log("We have added an X");
      this.setState({playerX : false});
      updateCell.touched = true;
      updateCell.player = "human";
      updateCell.invalue = "X";
      updatedCellForm[theID] = updateCell;
      this.state.cells[theID] = updateCell;
      if(this.checkWinner("X")){
         console.log("Human has won the game");
         document.getElementById("winner").innerHTML = "Human has won the game (Xs have beaten the Os)"
      }
      return;
    }
    else{
      /*
      const myimg2 = document.createElement("img");
      myimg2.src = tico;
      myimg2.classList.add("imgxo");
      */
      currSquare.innerHTML = "O";
      console.log("We have added an O");
      this.setState({playerX: true});
      updateCell.touched = true;
      updateCell.player = "AI";
      updateCell.invalue = "O";
      updatedCellForm[theID] = updateCell;
      this.state.cells[theID] = updateCell;
      //this.setState({cells: updatedCellForm});
      if(this.checkWinner("O")){
        console.log("The AI has won the game");
        document.getElementById("winner").innerHTML = "AI has won the game (Os have beaten the Xs)"
     }
      return;
    }

   }
   // this part of the algorithm is brute force and it checks all possible outcomes of winning in a 3x3 board, its been hardcoded 
   // but it can be made automatic to function depending on the size of the board created.

   checkWinner = (lastPlayer) =>{
      const horizontalChecks = {
        ...this.state.horizontal};
        const verticalChecks = {
          ...this.state.vertical};
      const diagonalChecks = {
        ...this.state.diagonal};
      const checkingCells = {
        ...this.state.cells
      };
      const hChecks = horizontalChecks.checks;
      const vChecks = verticalChecks.checks;
      const dChecks = diagonalChecks.checks;

      for(let i in hChecks){
        console.log(i);
        var toBreak = false;
        const val = lastPlayer;
        console.log("last Player " + val);
        console.log("doing checks on " + hChecks[i]);
        for(const idx in hChecks[i]){
          var num = hChecks[i][idx];
          var key = "cell" + (num);
          console.log("cell number " + key);
          console.log("value in cell " + checkingCells[key].invalue);
          if(checkingCells[key].invalue !== val){
                  toBreak = true;
                   break;
          }
        };
        if(!toBreak){
          console.log(hChecks[i]);
          return true;
        }
      }
      for(let i in vChecks){
        console.log(i);
        var toBreak = false;
        const val = lastPlayer;
        console.log( "last Player " + val);
        console.log( "doing checks on " + vChecks[i]);
        for(const idx in vChecks[i]){
          var num = vChecks[i][idx];
          var key = "cell" + (num);
          console.log("cell number " + key);
          console.log("value in cell " + checkingCells[key].invalue);
          if(checkingCells[key].invalue !== val){
                  toBreak = true;
                   break;
          }
        };
        if(!toBreak){
          console.log(vChecks[i]);
          return true;
        }
      }

      for(let i in dChecks){
        console.log(i);
        var toBreak = false;
        const val = lastPlayer;
        console.log( "last Player " + val);
        console.log("doing checks on " + dChecks[i]);
        for(const idx in dChecks[i]){
          var num = dChecks[i][idx];
          var key = "cell" + (num);
          console.log("cell number " + key);
          console.log("value in cell " + checkingCells[key].invalue);
          if(checkingCells[key].invalue !== val){
                  toBreak = true;
                   break;
          }
        };
        if(!toBreak){
          console.log(dChecks[i]);
          return true;
        }
      }
      }
      



   

  render(){

  
  return (
    <div className="App">
      <header className="App-header">
        <h1> Tic Tac Toe</h1>
        <p>This project will be Tic Tac Toe where the user competes against an AI that is based on the minimax algorithm</p>
        <div>
         <table className="table1">
           <tbody>
           <tr className="row1">
            <td className="col1" >
              <div id="cell1" className="btn-1" onClick = {this.toggleTacHandler}> </div>
               </td>
             <td className="col1" >
             <div id="cell2" className="btn-1 " onClick = {this.toggleTacHandler}> </div>
             </td>
             <td className="col1">
             <div id="cell3" className="btn-1" onClick = {this.toggleTacHandler}> </div>
             </td>
           </tr>
           <tr>
           <td className="col1">
           <div id="cell4" className="btn-1" onClick = {this.toggleTacHandler}> </div>
           </td>
             <td className="col1">
             <div id="cell5" className="btn-1" onClick = {this.toggleTacHandler}> </div>
             </td>
             <td className="col1">
             <div id="cell6" className="btn-1" onClick = {this.toggleTacHandler}> </div>
             </td>
           </tr>
           <tr>
           <td className="col1">
           <div id="cell7" className="btn-1" onClick = {this.toggleTacHandler}> </div>
           </td>
             <td className="col1">
             <div id="cell8" className="btn-1" onClick = {this.toggleTacHandler}> </div>
             </td>
             <td className="col1">
             <div id="cell9" className="btn-1" onClick = {this.toggleTacHandler}> </div>
             </td>
           </tr>
           </tbody>
         </table>
         </div>
        <p id="winner">
          
        </p>
      </header>
    </div>
  );
}
}

export default App;

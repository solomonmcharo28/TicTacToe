import React, {Component} from 'react';
import logo from './logo.svg';
import ticx from './images/ticx.png';
import tico from './images/tico.png';
import './alphabeta.js'
import './App.css';
import {Button, Modal} from 'react-bootstrap';
import{getActions, getBestMove, isTerminal} from './alphabeta.js'
import SignUpModal from './components/modals/signupmodal';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'


class App extends Component{
  state = {
    playerName: "",
    playerX: true,
    otherState: "SomeOtherValue",
    squareID: "",
    lastPlayer: "-",
    toggleOff: false,
    cellsFilled: 0,
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
    if(this.state.toggleOff){
      return;
    }
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
      this.state.playerX  = false;
      updateCell.touched = true;
      updateCell.player = "human";
      updateCell.invalue = "X";
      updatedCellForm[theID] = updateCell;
      this.state.cells[theID] = updateCell;
      this.state.cellsFilled += 1;
      if(this.state.cellsFilled >= 5 && this.checkWinner("X")){
         console.log("Human has won the game");
         document.getElementById("winner").classList.add("winning");
         document.getElementById("winner").innerHTML = "Human has won the game (Xs have beaten the Os)"
         this.state.toggleOff = true;
         const winner = true;
         let config = {
          headers:{
            Authorization: localStorage.getItem("thisToken")
          }
        }
         const newData = {
            winner
         }
         axios.patch("http://localhost:3001/boards", newData, config).then((response) => {
          console.log(response.data)
      
        })
        .catch( (error) => {
          console.log(error.message);
        
        });
      }
           
      
      this.checkDraw();
      this.submitDataOnBoard();
      this.retrieveAiResult();
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
        //console.log(i);
        var toBreak = false;
        const val = lastPlayer;
       // console.log("last Player " + val);
        //console.log("doing checks on " + hChecks[i]);
        for(const idx in hChecks[i]){
          var num = hChecks[i][idx];
          var key = "cell" + (num);
         // console.log("cell number " + key);
         // console.log("value in cell " + checkingCells[key].invalue);
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
          console.log(vChecks[i]);
          return true;
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
          console.log(dChecks[i]);
          return true;
        }
      }
      }

      checkDraw = () =>{
        if(this.state.cellsFilled == 9){
          document.getElementById("winner").innerHTML = "The Game has Ended in a Draw"
        }
      }
      
      submitDataOnBoard = () =>{
        let config = {
          headers:{
            Authorization: localStorage.getItem("thisToken")
          }
        }
        const cells = {
               "cell1" : this.state.cells.cell1.invalue,
               "cell2" : this.state.cells.cell2.invalue,
               "cell3" : this.state.cells.cell3.invalue,
               "cell4" : this.state.cells.cell4.invalue,
               "cell5" : this.state.cells.cell5.invalue,
               "cell6" : this.state.cells.cell6.invalue,
               "cell7" : this.state.cells.cell7.invalue,
               "cell8": this.state.cells.cell8.invalue,
               "cell9" : this.state.cells.cell9.invalue,
           
        }
        const newData = {
             cells
        }
        axios.patch("http://localhost:3001/boards" , newData, config)
        .then((response) => {
          console.log(response.data)
      
        })
        .catch( (error) => {
          console.log(error.message);
        
        });
      }

      retrieveAiResult = () =>{
        const newBoard = JSON.parse(JSON.stringify(this.state.cells)); // use this to deep copy of JSON Objects
        const val =  getBestMove(newBoard);
        
        console.log("Best Move is " + val.move + " with a score of " + val.score)
        const key = "cell" + val.move;
        const currSquare = document.getElementById(key);
        currSquare.innerHTML = "O";
        console.log("We have added an O");
        this.state.playerX = true;
        const updatedCellForm = {
        ...this.state.cells};
        const updateCell = {
          ...updatedCellForm[key]
        };
        updateCell.touched = true;
        updateCell.player = "AI";
        updateCell.invalue = "O";
        updatedCellForm[key] = updateCell;
        this.state.cells[key] = updateCell;
        //this.setState({cells: updatedCellForm});
        this.state.cellsFilled += 1;
        if(this.state.cellsFilled >= 5 && this.checkWinner("O")){
          console.log("The AI has won the game");
          document.getElementById("winner").classList.add("losing");
          document.getElementById("winner").innerHTML = "AI has won the game (Os have beaten the Xs)"
          this.state.toggleOff = true;
          const winner = false;
          let config = {
            headers:{
              Authorization: localStorage.getItem("thisToken")
            }
          }
          const newData = {
              winner
          }
          axios.patch("http://localhost:3001/boards", newData, config).then((response) => {
            console.log(response.data)
        
          })
          .catch( (error) => {
            console.log(error.message);
          
          });
        }
        this.checkDraw();
        this.submitDataOnBoard();
        return;
      }

      

   

  render(){

  
  return (
    <div className="App">
      <header className="App-header">
        <SignUpModal></SignUpModal>
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
           <tr className="row1">
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
           <tr className="row1">
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
         <br></br>
        <p id="winner">
        </p>
        <Button onClick={() => window.location.reload(false)}>Refresh</Button>
      </header>
    </div>
  );
}
}

export default App;

import React, {Component} from 'react';
// import './Person.css';
import {FaUserAlt, FaCheck} from  'react-icons/fa'
import axios from 'axios'
import styled from 'styled-components'
import Input from '../UI/Input/input';
import {Button, Modal, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
class SignUpModal extends Component{  
    state={
        updateForm:{
          Name: {
            elementType: "input",
            elementConfig:{
              id:"name",
              type:"string",
              placeholder: "John Doe",
            },
            value: '',
            label: 'Name'
    
          },
          
        },
        task :{},
        show : true,
        open : false,
    }
        componentDidMount(){
            const myId = this.props.id;
        }
      handleClose = (props) => {
        
        this.setState({show:false});
        this.setState({open:false});
        }
        handleOpen = (props) => {
        
          this.setState({open:true});
          this.setState({show:true});
       }
       inputChangedHandler = (event, inputIdentifier) =>{
        const updatedCreateForm = {
          ...this.state.updateForm
        };
        const updatedFormElement = {
          ...updatedCreateForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value
        updatedCreateForm[inputIdentifier] = updatedFormElement
        this.setState({updateForm: updatedCreateForm});
       }
       onSubmit = (props) =>{ 
        props.preventDefault();
        const name = this.state.updateForm.Name.value;
        console.log(name);
        const data = {
          name 
        }
        axios.post('https://soloandglenn-tictactoeapi.herokuapp.com/users', data)
        .then((response) => {
          console.log(response.data);
          const token = "Bearer " + response.data.token
          localStorage.setItem('thisToken', token)
          //console.log(token)
         // const newOwner = response.data.myID
        //  console.log(newOwner + " fresh from request")
       //   localStorage.setItem('newOwner', newOwner)

        //console.log(localStorage.getItem("thisToken"))
        let config = {
          headers:{
            Authorization: localStorage.getItem("thisToken")
          }
        }
       
        const cells = {"cell1": "-",
     "cell2" : "-", 
     "cell3" :"-",
     "cell4": "-", 
     "cell5": "-",
     "cell6": "-", 
     "cell7": "-", 
     "cell8": "-",
     "cell9":"-"
        };
        const completed = false;
        const winner = "None";
        const score = 0;
       //const owner = localStorage.getItem("newOwner");
      // console.log(owner + " failed request");
        const newData = {
          name,
          cells,
          completed,
          winner,
          score
          //owner
        }
        axios.post("https://soloandglenn-tictactoeapi.herokuapp.com/boards" , newData, config)
        .then((response) => {
          console.log(response.data)
      
        })
        .catch( (error) => {
          console.log(error.message);
        
        });
        })
        .catch( (error) => {
          console.log(error.message);
          
        });
        
       
        this.handleClose();
    }
     
   
 
    render(){
      const formElementsArray = [];
    for(let key in this.state.updateForm){
      formElementsArray.push({
        id: key,
        config:this.state.updateForm[key]
      })

    }

      return(
    <Modal show={ this.state.show} onHide={this.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Sign Up</Modal.Title>
    </Modal.Header>
    <Modal.Body><Form id='myForm'
            className="form">
    <div>
    {formElementsArray.map(formElement =>(
       <Input
            key={formElement.id}
            elementType = {formElement.config.elementType}
            elementConfig = {formElement.config.elementConfig}
            value = {formElement.config.value}
            label = {formElement.config.label}
            changed = {(event) => this.inputChangedHandler(event, formElement.id )}
       />
     ))}</div>
     </Form></Modal.Body>
    
    <Modal.Footer>
      <Button variant="secondary" onClick={this.handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={this.onSubmit}>
        Submit
      </Button>
    </Modal.Footer>
  </Modal>
    );
    }
    }

export default SignUpModal;
import React from 'react'
import './input.css'
const  input = (props) => {
    let inputElement = null;
    let inputClasses = []; 
    
    let errorMessage = null
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push("invalid")
        errorMessage = <p className="errorMessage">{props.errors.join(" ")}</p>
    }
    if(!props.invalid && props.touched){
        inputClasses.push("valid")
    }
    switch(props.elementType){    
        case('input'):
            inputClasses.push("InputElement")
            inputElement = <input 
            className={inputClasses.join(' ')}
             {...props.elementConfig} 
             value={props.value}
             onChange={props.changed}/>;
            break;
        case('textarea'):
            inputClasses.push("TextElement")
            inputElement = <textarea 
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}/>
            break;
        case('select'):
            inputClasses.push("InputElement")
            inputElement = (<select
            className={inputClasses.join(' ')}
            value={props.value}
            onChange={props.changed}>
            {props.elementConfig.options.map(option =>(
                <option key={option.value} value={option.value}>{option.displayValue}</option>
            ))}
            onChange={props.changed}
            </select>);
            break;
        default:
            inputClasses.push("InputElement")
            inputElement = <input 
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}/>
            break;

    }
return(
<div>
<label className="Label">{props.label}</label>
{inputElement}
{errorMessage}
</div>
)
};

export default input

import './App.css';
import Key from './components/key.js';
import { useState } from 'react';
import { evaluate } from 'mathjs';


function App() {
 
  const [expression, setExpression] = useState('');
  const [answer, setAnswer]= useState('');
  const et = expression.trim();
  const [opDone, setOpDone]=useState(false);

  
  const isOperator = (symbol) => {
    if (symbol ==='*'||symbol ==='/'||symbol ==='+'||symbol ==='-') {
      return true;
    }
    else{
      return false;
    }
  };
 
  const clear = () => {
    setAnswer('0');
    setExpression("");
  };

  const addInput = (symbol) => {
    if(opDone){
      if(isOperator(symbol)){
        setExpression(answer+symbol);
        
      }
      else{
        setExpression(symbol);
      }
      setAnswer(symbol);
      setOpDone(false); 
    }

    else{
    if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
      setAnswer(symbol);
    }else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
        setAnswer(expression+symbol);
      }
    } else if (symbol === ".") {
      // split by operators and get last number
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber);
      // if last number already has a decimal, don't add another
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
      setAnswer(expression+symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
        setAnswer(expression+symbol);
      } else {
        setExpression(expression + symbol);
        setAnswer(expression+symbol);
      }
      
    }
  }
  };
    

  const calculate = () => {
    // if last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    // clean the expression so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = et.split(" ");
    const newParts = [];

    // go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(evaluate(answer + newExpression));
      
    } else {
      setAnswer(evaluate(newExpression));
    }
    setOpDone(true); 
    setExpression("");
  };


  
  return (
    <div className="App">
     <div id="calculator">
        
        <div id="input">
        
            <div id="expression">
            <p> {expression} </p>
            </div>
            
            <div id="display">
           
            {answer} 
             
            </div>
           
        </div>
       
        <div id="keyboard">
        <Key manageClick={clear} identifier="clear">AC</Key>
          <Key manageClick={addInput} identifier="divide">/</Key>
          <Key manageClick={addInput} identifier="multiply">*</Key>
        
          
          
          
          <Key manageClick={addInput} identifier="seven">7</Key>
         <Key manageClick={addInput} identifier="eight">8</Key>
         <Key manageClick={addInput} identifier="nine">9</Key>
         <Key manageClick={addInput} identifier="subtract">-</Key>
        
          
            <Key manageClick={addInput} identifier="four">4</Key>
         <Key manageClick={addInput} identifier="five">5</Key>
         <Key manageClick={addInput} identifier="six">6</Key>
         <Key manageClick={addInput} identifier="add">+</Key>
         <Key identifier="equals" manageClick={addInput}>=</Key>
          <div id="bundle">
        <Key manageClick={addInput} identifier="one">1</Key>
         <Key manageClick={addInput} identifier="two">2</Key>
         <Key manageClick={addInput} identifier="three">3</Key>
         <Key manageClick={addInput} identifier="zero">0</Key>
         <Key manageClick={addInput} identifier="decimal">.</Key>
         </div>
         
          
        
        </div>

      </div>

    </div>
  );
}

export default App;

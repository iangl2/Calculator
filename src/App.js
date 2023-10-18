
import './App.css';
import Key from './components/key.js';
import { useState } from 'react';
import { evaluate } from 'mathjs';

function App() {
 
  const [input, setInput] = useState('');
  const [ans, setAns]= useState('');
  const [opDone, setOpDone]=useState(false);
  
  const clear = () => {
    setAns('');
    setInput('');
  };
  const addInput = val =>{
    if(opDone){
      if(isNaN(val)){
        setInput(ans+val);
        
      }
      else{
        setInput(val);
      }
      setAns(val);
      setOpDone(false); 
    }
    else{
      if( isNaN(ans[0]) || isNaN(val)){
        setAns(val);
        setInput(input+val);
      }
      else{
        setInput(input+val);
        setAns(ans + val);
      }
    }
  };
    

  const calculateResult = () => {
    if (input) {
      setAns(evaluate(input));
      
      setInput(input + "="+evaluate(input))
     setOpDone(true);
     console.log(ans);
    } else {
      alert("");
    }
  };
  
  return (
    <div className="App">
     <div id="calculator">
        
        <div id="screen">
            
            <div id="expression">
            <p> {input}</p>
            </div>
            
            <div id="input">
              {ans}
            </div>
           
        </div>
       
        <div id="keyboard">
        <Key manageClick={clear}>AC</Key>
          <Key manageClick={addInput}>/</Key>
          <Key manageClick={addInput}>*</Key>
        
          
          
          
          <Key manageClick={addInput}>7</Key>
         <Key manageClick={addInput}>8</Key>
         <Key manageClick={addInput}>9</Key>
         <Key manageClick={addInput}>-</Key>
        
          
            <Key manageClick={addInput}>4</Key>
         <Key manageClick={addInput}>5</Key>
         <Key manageClick={addInput}>6</Key>
         <Key manageClick={addInput}>+</Key>
         <Key manageClick={calculateResult}>=</Key>
          <div id="bundle">
        <Key manageClick={addInput}>1</Key>
         <Key manageClick={addInput}>2</Key>
         <Key manageClick={addInput}>3</Key>
         <Key manageClick={addInput}>0</Key>
         <Key manageClick={addInput}>.</Key>
         </div>
         
          
        
        </div>

      </div>

    </div>
  );
}

export default App;

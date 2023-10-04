import './App.css';
import { Factory } from './Factory';
import { useEffect, useState } from 'react';

let factory;
let interval;
function App() {
  const [state, setState] = useState({}); 
  useEffect(()=>{
    factory = new Factory((state) => setState(state));
  }, []);



  useEffect(()=>{
    interval = setInterval(() => factory.Update(), 10);
  });

  
  useEffect(() =>  () => 
      clearInterval(interval)
    );
  return (
    <div className="App">
      <header className="App-header">
        <h3>Let's make <input value={state.thingName} onChange={e => factory.UpdateName(e.target.value)}/></h3>
        <sub>
          You have made {Math.round(state.allTimeTotal)} {state.thingName} in total
        </sub>
        <p>
          You currently have {Math.round(state.total)} {state.thingName}
        </p>
        <p>
          {state.thingName} per second {state.thingsPerSecond}
        </p>
        <button onClick={()=>factory.Make()}>Make {state.thingName}</button>
        <button onClick={()=>factory.Buy()}>Increase {state.thingName} per second ({state.cost})</button>
      </header>
    </div>
  );
}

export default App;

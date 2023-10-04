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
        <p>
          The total is {Math.round(state.total)}
        </p>
        <p>
          Things per second {state.thingsPerSecond}
        </p>
        <button onClick={()=>factory.Make()}>Make</button>
        <button onClick={()=>factory.Buy()}>Increase things per second ({state.cost})</button>
      </header>
    </div>
  );
}

export default App;

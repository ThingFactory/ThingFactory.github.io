import { Factory } from "../Factory";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

let factory;
let interval;
function Homepage() {
  const [state, setState] = useState({
    thingName: "",
    allTimeTotal: 0,
    total: 0,
    thingsPerSecond: 0,
    cost: 10,
    thingsPerClickCost: 100
  });
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    factory = new Factory((state) => {
        document.title = `${Math.round(state.total)} ${state.thingName}`;
        setState(state)
    });
    factory.UpdateName(searchParams.get("name")??"Things")
  }, []);

  useEffect(() => {
    interval = setInterval(() => factory.Update(), 10);
  });

  useEffect(() => () => clearInterval(interval));

  return <div className="App">
    <header className="App-header">
      <h3>
        Let's make {state.thingName}
      </h3>
      <sub>
        You have made {Math.round(state.allTimeTotal)} {state.thingName} in
        total
      </sub>
      <p>
        You currently have {Math.round(state.total)} {state.thingName}
      </p>
      <p>
        {state.thingName} per click {state.thingsPerClick}
      </p>
      <p>
        {state.thingName} per second {state.thingsPerSecond}
      </p>
      <p>
      <button onClick={() => factory.Make()}>Make {state.thingName}</button>
      </p>
      <p>
      <button onClick={() => factory.BuyAuto()}>
        Increase {state.thingName} per second ({state.cost})
      </button>
      </p>
      <p>
      <button onClick={() => factory.BuyManual()}>
        Increase {state.thingName} per click ({state.thingsPerClickCost})
      </button>
      </p>
      
    </header>
  </div>;
}
export default Homepage;

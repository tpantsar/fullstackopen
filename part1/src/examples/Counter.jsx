import { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => {
    console.log("clicked");
    setCounter(counter + 1);
  };

  const setToZero = () => {
    console.log("clicked");
    setCounter(0);
  };

  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseByOne}>plus</button>
      <button onClick={setToZero}>zero</button>
    </div>
  );
};

export default Counter;

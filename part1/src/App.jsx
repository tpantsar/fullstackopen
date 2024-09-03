/* eslint-disable react/prop-types */
import { useState } from "react";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Display = ({ text, counter, text2 }) => {
  return (
    <div>
      {text} {counter} {text2}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;

  const header = "Give feedback";
  const statistics = "Statistics";

  const increaseGoodByOne = () => {
    console.log("clicked good button");
    setGood(good + 1);
  };

  const increaseNeutralByOne = () => {
    console.log("clicked neutral button");
    setNeutral(neutral + 1);
  };

  const increaseBadByOne = () => {
    console.log("clicked bad button");
    setBad(bad + 1);
  };

  return (
    <div>
      <Header title={header} />
      <Button handleClick={increaseGoodByOne} text="good" />
      <Button handleClick={increaseNeutralByOne} text="neutral" />
      <Button handleClick={increaseBadByOne} text="bad" />
      <Header title={statistics} />
      <Display text="good" counter={good} />
      <Display text="neutral" counter={neutral} />
      <Display text="bad" counter={bad} />
      <Display text="all" counter={total} />
      <Display text="average" counter={(good - bad) / total} />
      <Display text="positive" counter={(good / total) * 100} text2="%" />
    </div>
  );
};

export default App;

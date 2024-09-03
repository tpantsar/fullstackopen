/* eslint-disable react/prop-types */
import { useState } from "react";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, counter, text2 }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {counter} {text2}
      </td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad, total } = props.props;
  const feedbackGiven = good || neutral || bad;
  const title = "Statistics";
  return (
    <div>
      <Header title={title} />
      {feedbackGiven ? (
        <div>
          <StatisticLine text="good" counter={good} />
          <StatisticLine text="neutral" counter={neutral} />
          <StatisticLine text="bad" counter={bad} />
          <StatisticLine text="all" counter={total} />
          <StatisticLine text="average" counter={(good - bad) / total} />
          <StatisticLine
            text="positive"
            counter={(good / total) * 100}
            text2="%"
          />
        </div>
      ) : (
        <div>No feedback given</div>
      )}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const stats = { good, neutral, bad, total };
  const title = "Give feedback";

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
      <Header title={title} />
      <Button handleClick={increaseGoodByOne} text="good" />
      <Button handleClick={increaseNeutralByOne} text="neutral" />
      <Button handleClick={increaseBadByOne} text="bad" />
      <Statistics props={stats} />
    </div>
  );
};

export default App;

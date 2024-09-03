/* eslint-disable react/prop-types */
import { useState } from "react";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  // Select random anecdote from the list but make sure it's not the same as the current one
  const changeAnecdote = () => {
    // Prevent infinite loop if there's only one anecdote
    if (anecdotes.length === 1) {
      return;
    }
    let randomAnecdote;
    do {
      randomAnecdote = Math.floor(Math.random() * anecdotes.length);
    } while (randomAnecdote === selected);
    setSelected(randomAnecdote);
  };

  return (
    <div>
      <Header title="Anecdotes" />
      <Button handleClick={changeAnecdote} text="Next anecdote" />
      <div>{anecdotes[selected]}</div>
    </div>
  );
};

export default App;

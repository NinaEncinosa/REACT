import { useState } from "react";

const StatisticLine = ({ text }) => <p>{text}</p>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <h2>statistics</h2>
      <StatisticLine text={"good " + good}></StatisticLine>
      <StatisticLine text={"neutral " + neutral}></StatisticLine>
      <StatisticLine text={"bad " + bad}></StatisticLine>
    </>
  );
};

export default App;

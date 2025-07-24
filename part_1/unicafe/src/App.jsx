import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <p>
    {text}
    {value}
  </p>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total ? (good - bad) / total : 0;
  const positive = total ? (good * 100) / total : 0;
  return (
    <>
      <StatisticLine text={"good "} value={good}></StatisticLine>
      <StatisticLine text={"neutral "} value={neutral}></StatisticLine>
      <StatisticLine text={"bad "} value={bad}></StatisticLine>
      <StatisticLine text={"all "} value={total}></StatisticLine>
      <StatisticLine text={"average "} value={average}></StatisticLine>
      <StatisticLine text={"positive "} value={positive + " %"}></StatisticLine>
    </>
  );
};

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

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </>
  );
};

export default App;

import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / (total || 1);
  const positive = (good / (total || 1)) * 100;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average.toFixed(2)} />
        <StatisticLine text="positive" value={positive.toFixed(1) + " %"} />
      </tbody>
    </table>
  );
};
export default Statistics;

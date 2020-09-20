import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ good, setGood, neutral, setNeutral, bad, setBad, increaseByOne }) => {

  return (
    <div>
      <h1>give feedback</h1>

      <button onClick={() => increaseByOne(good, setGood)}>good</button>
      <button onClick={() => increaseByOne(neutral, setNeutral)}>neutral</button>
      <button onClick={() => increaseByOne(bad, setBad)}>bad</button>

    </div>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )

}

const Statistics = ({ good, neutral, bad }) => {

  let total = good + neutral + bad
  let average = ((good + (bad * -1)) / (total)).toFixed(2)
  let positive = ((good / total) * 100).toFixed(2) + '%'

  if (good + neutral + bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />

          <Statistic text="total" value={total} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseByOne = (value, setValue) => setValue(value + 1)

  return (
    <div>
      <Button good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad} increaseByOne={increaseByOne} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
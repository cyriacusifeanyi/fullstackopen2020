import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Buttons = ({ setSelected, selected }) => {
  return (
    <div>
      <button onClick={() => vote({ selected })}>vote</button>
      <button onClick={() => updateSelected({ setSelected })}>next anecdote</button>
    </div>
  )
}

const MaxVoteAnecdote = ({ anecdotes, points }) => {
  return (
    <div>
      {anecdotes[getIndexOfMaxValue()]}<br />
      has {points[getIndexOfMaxValue()]} votes
    </div>
  )
}

const TodaysAnecdote = ({ anecdotes, points, selected }) => {
  return (
    <div>
      {anecdotes[selected]}<br />
      has {points[selected]} votes
    </div>
  )
}

const vote = ({ selected }) => {
  points[selected] += 1
}

const updateSelected = ({ setSelected }) => {
  setSelected(Math.floor(Math.random() * anecdotes.length))
}

const getIndexOfMaxValue = () => {
  return (
    points.indexOf(Math.max.apply(null, points))
  )
}

const App = ({ anecdotes, points }) => {
  const [selected, setSelected] = useState(0)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <TodaysAnecdote anecdotes={anecdotes} points={points} selected={selected} />      
      <Buttons setSelected={setSelected} selected={selected} />

      <h1>Anecdote with most votes</h1>
      <MaxVoteAnecdote anecdotes={anecdotes} points={points} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

let points = new Array(anecdotes.length).fill(0);

ReactDOM.render(
  <App anecdotes={anecdotes} points={points} />,
  document.getElementById('root')
)
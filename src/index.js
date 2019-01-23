import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';

let model = {
  time: 0,
  running: false,
}

const intent = {
  TICK: 'TICK',
  START: 'START',
  STOP: 'STOP',
  RESET: 'RESET'
}

const view = (m) => {
  let minutes = Math.floor(m.time / 60);
  let seconds = m.time - (minutes * 60);
  let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`
  let handler = (event) => {
    container.dispatch(m.running ? {type: 'STOP'} : {type: 'START'})
  }
  return <div>
    <p>{minutes}:{secondsFormatted}</p>
    <button onClick={handler}>{m.running ? 'Stop' : 'Start'}</button>
  </div>
}

const update = (model = { running: false, time: 0 }, action) => {
  const updates = {
    'TICK': (model) => Object.assign(model, {time: model.time + (model.running ? 1 : 0)}),
    'RESET': (model) => Object.assign(model, {time: 0}),
    'START': (model) => Object.assign(model, {running: true}),
    'STOP': (model) => Object.assign(model, {running: false})
  };
  return (updates[action.type] || (() => model))(model);
}

let container = createStore(update);

const render = () => {
  ReactDOM.render(view(container.getState()),
  document.getElementById('root')
  );
};
container.subscribe(render);

setInterval(() => {
  container.dispatch({type: 'TICK'});
}, 1000);

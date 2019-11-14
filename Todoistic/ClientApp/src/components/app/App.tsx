import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomeBoard } from '../homeboard/HomeBoard';
import { TodoItemEditor } from '../todoitemeditor/TodoItemEditor';
import './App.css';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={HomeBoard} />
          <Route exact path='/todos/:id' component={TodoItemEditor} />
        </Switch>
      </div>
    );
  }
}

export default App;
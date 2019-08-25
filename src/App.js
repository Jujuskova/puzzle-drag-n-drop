import React from 'react'
import {
  BrowserRouter, Route, Switch, NavLink,
} from 'react-router-dom'

import Home from './Components/Home'
import PuzzlePage from './Components/Puzzle'
import './App.css'

const App = () => (
  <BrowserRouter>
    <div className="App">
      <header>
        <h1>Drag & Drop tuto</h1>
        <nav>
          <NavLink exact to="/" activeClassName="selected">
            Home
          </NavLink>
          <NavLink to="/puzzle" activeClassName="selected">
            Puzzle Game
          </NavLink>
        </nav>
      </header>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/puzzle" component={PuzzlePage} />
        <Route render={() => <div>This page does not exist</div>} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default App

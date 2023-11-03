import React, { Component } from 'react'
import CardList from '../components/CardList'
import Scroll from '../components/Scroll'
import SearchBox from '../components/SearchBox'
import '../containers/App.css'
import ErrorBoundary from '../ErrorBoundary'

/* const App = () => {
  const [robots, setRobots] = useState();
  const [searchField, setSearchField] = useState();

  onSearchChange = (e) => {
    setSearchField(e.target.value);
  }

  return (
    <div className='tc'>
      <h1>RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <CardList robots={robots} />
    </div>
  )
} */

/* older version of react below */

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  /* componentDidMount is part of react, no need for arrow function */
  /* fetch() is a window. method */
  /* JSON Placeholder: https://jsonplaceholder.typicode.com/users */

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }

  /* when creating a method must use arrow function */
  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })

    /* next line means 'if robots.length is === 0' */
    /* aka, robots.length should not === 0, but if it does, return loading */
    /* can also read 'if there are no robots' */
    return !robots.length ?
    <h1>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }
}

export default App
import React, { Component } from "react";
import "./App.css";
import { CardList } from "./components/card-list/card-list.component";
import SearchBox from "./components/searchBox/search-box.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  async componentDidMount() {
    try {
      const users = await fetch("https://jsonplaceholder.typicode.com/users");
      const usersJson = await users.json();
      this.setState({ monsters: usersJson });
    } catch (error) {
      throw error;
    }
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((m) =>
      m.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="search monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;

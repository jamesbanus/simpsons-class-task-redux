import React, { Component } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Simpsons from "./components/Simpsons";
import "./App.css";

class App extends Component {
  state = {};
  initialState;
  async componentDidMount() {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=50`
    );

    //fixed the api data to have unique id
    data.forEach((element, index) => {
      element.id = index + Math.random();
    });

    this.setState({ simpsons: data });
  }

  onLikeToggle = (id) => {
    const indexOf = this.state.simpsons.findIndex((char) => {
      return char.id === id;
    });
    const simpsons = [...this.state.simpsons];
    //invert if liked or not liked
    simpsons[indexOf].liked = !simpsons[indexOf].liked;
    this.setState({ simpsons });
  };

  onDelete = (id) => {
    const indexOf = this.state.simpsons.findIndex((char) => {
      return char.id === id;
    });
    const simpsons = [...this.state.simpsons];
    simpsons.splice(indexOf, 1);
    this.setState({ simpsons });
  };

  onSearchInput = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  onSortInput = (e) => {
    this.setState({ sortInput: e.target.value });
  };

  onReset = () => {
    this.setState({ sortInput: "", searchInput: "" });
    document.getElementById("characterSearch").value = "";
    document.getElementById("characterSort").value = "";
  };

  // calculate data to display

  getFilteredList = () => {
    const { simpsons, searchInput, sortInput } = this.state;

    // let { reset } = this.state;

    let filteredList = [...simpsons];

    // filter by search
    if (searchInput) {
      filteredList = filteredList.filter((item) => {
        if (item.character.toLowerCase().includes(searchInput.toLowerCase())) {
          return true;
        }
      });
    }

    // sort by alphabetical
    if (sortInput == "Asc") {
      filteredList.sort((itemOne, itemTwo) => {
        if (itemOne.character > itemTwo.character) return 1;
        if (itemOne.character < itemTwo.character) return -1;
      });
    } else if (sortInput === "Desc") {
      filteredList.sort((itemOne, itemTwo) => {
        if (itemOne.character > itemTwo.character) return -1;
        if (itemOne.character < itemTwo.character) return 1;
      });
    }

    // return result of search and sort
    return filteredList;
  };

  render() {
    console.log(this.state);

    const { simpsons } = this.state;

    if (!simpsons) return <Loading />;

    if (simpsons.length === 0) return <p>You deleted everything!</p>;

    //calculate the total
    let total = 0;
    simpsons.forEach((char) => {
      if (char.liked) total++;
    });

    return (
      <>
        <div className="headerContainer">
          <h1>Total no of liked chars #{total}</h1>
        </div>
        <Simpsons
          simpsons={this.getFilteredList()}
          onDelete={this.onDelete}
          onLikeToggle={this.onLikeToggle}
          onSearchInput={this.onSearchInput}
          onSortInput={this.onSortInput}
          onReset={this.onReset}
        />
      </>
    );
  }
}

export default App;

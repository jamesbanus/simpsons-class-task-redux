import React, { Component } from "react";
import { connect } from "react-redux";
import Simpsons from "./Simpsons";

class App extends Component {
  // calculate data to display

  getFilteredList = () => {
    const { simpsons, searchInput, sortInput } = this.props;

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

  onLikeToggle = (id) => {
    const { simpsons } = this.props;
    const indexOf = simpsons.findIndex((char) => {
      return char.id === id;
    });
    // simpsons = [...this.state.simpsons];
    //invert if liked or not liked
    simpsons[indexOf].liked = !simpsons[indexOf].liked;
    this.setState({ simpsons });
  };

  onDelete = (id) => {
    const { simpsons } = this.props;
    const indexOf = simpsons.findIndex((char) => {
      return char.id === id;
    });
    simpsons.splice(indexOf, 1);
    this.setState({ simpsons });
  };

  render() {
    const { simpsons } = this.props;
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

function mapStateToProps(state) {
  return {
    simpsons: state.simpsons,
    number: state.number,
    searchInput: state.searchInput,
    sortInput: state.sortInput,
    resetClick: state.resetClick,
    // likeToggle: state.likeToggle,
    // delete: state.delete,
  };
}

export default connect(mapStateToProps)(App);

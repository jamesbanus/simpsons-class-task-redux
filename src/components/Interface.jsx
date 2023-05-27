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

  render() {
    return (
      <Simpsons
        simpsons={this.getFilteredList()}
        onDelete={this.onDelete}
        onLikeToggle={this.onLikeToggle}
        onSearchInput={this.onSearchInput}
        onSortInput={this.onSortInput}
        onReset={this.onReset}
      />
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
  };
}

export default connect(mapStateToProps)(App);

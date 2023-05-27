import React, { Component } from "react";
import { connect } from "react-redux";
import {
  SET_SEARCH_INPUT,
  SET_SORT_INPUT,
  // SET_LIKE_TOGGLE,
  // SET_DELETE,
} from "../store/types";

class Controls extends Component {
  // state = {  }

  onSearchInput = (e) => {
    this.props.dispatch({ type: SET_SEARCH_INPUT, payload: e.target.value });
  };

  onSortInput = (e) => {
    this.props.dispatch({ type: SET_SORT_INPUT, payload: e.target.value });
  };

  onReset = () => {
    this.props.dispatch({ type: SET_SEARCH_INPUT, payload: "" });
    this.props.dispatch({ type: SET_SORT_INPUT, payload: "" });
    document.getElementById("characterSearch").value = "";
    document.getElementById("characterSort").value = "";
  };

  // onLikeToggle = (id) => {
  //   const indexOf = this.state.simpsons.findIndex((char) => {
  //     return char.id === id;
  //   });
  //   const simpsons = [...this.state.simpsons];
  //   //invert if liked or not liked
  //   simpsons[indexOf].liked = !simpsons[indexOf].liked;
  //   this.setState({ simpsons });
  // };

  // onDelete = (id) => {
  //   const indexOf = this.props.simpsons.findIndex((char) => {
  //     return char.id === id;
  //   });
  //   const simpsons = [...this.props.simpsons];
  //   simpsons.splice(indexOf, 1);
  //   this.setState({ simpsons });
  // };

  render() {
    return (
      <>
        <div className="filterContainer">
          <label htmlFor="character">Search by Character!</label>
          <input
            onInput={this.onSearchInput}
            type="text"
            name="character"
            id="characterSearch"
          />
          <label htmlFor="alphabet">Sort by alphabetical order!</label>
          <select onInput={this.onSortInput} name="alphabet" id="characterSort">
            <option value=""></option>
            <option value="Asc">Asc</option>
            <option value="Desc">Desc</option>
          </select>
          <button onClick={this.onReset}>Reset!</button>
        </div>
      </>
    );
  }
}

export default connect()(Controls);

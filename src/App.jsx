import React, { Component } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Simpsons from "./components/Simpsons";
import "./App.css";
import { connect } from "react-redux";
import { NEW_API_DATA } from "./store/types";
import Interface from "./components/Interface";

class App extends Component {
  async componentDidMount() {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=${this.props.number}`
    );

    //fixed the api data to have unique id
    data.forEach((element, index) => {
      element.id = index + Math.random();
    });

    this.props.dispatch({ type: NEW_API_DATA, payload: data });
  }

  render() {
    console.log(this.state);

    const { simpsons } = this.props;

    if (!simpsons) return <Loading />;

    if (simpsons.length === 0) return <p>You deleted everything!</p>;

    return (
      <>
        <Interface />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    simpsons: state.simpsons,
    number: state.number,
  };
}

export default connect(mapStateToProps)(App);

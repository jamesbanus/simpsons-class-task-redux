import React, { Component } from "react";
import Character from "./Character";
import Controls from "./Controls";

class Simpsons extends Component {
  render() {
    const {
      simpsons,
      onDelete,
      onLikeToggle,
      onSearchInput,
      onSortInput,
      onReset,
    } = this.props;

    return (
      <>
        <Controls
          onSearchInput={onSearchInput}
          onSortInput={onSortInput}
          onReset={onReset}
        />

        {simpsons.map((item) => {
          return (
            <Character
              item={item}
              key={item.id}
              onDelete={onDelete}
              onLikeToggle={onLikeToggle}
            />
          );
        })}
      </>
    );
  }
}

export default Simpsons;

import React, { Component } from "react";
import {
  Button
} from "antd";

export class NewGame extends Component {

  state = {
    visible: true,
  }

  handleClick = e => {
    this.setState({ visible: !this.state.visible }, () => {
      this.props.play()
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <div className="menu-item">
        <Button className='btn btn-success btn-play' onClick={this.handleClick}
          style={{ visibility: visible ? "visible" : "hidden" }}>
                Play Game
        </Button>
        
      </div >
    );
  }
}

export default NewGame;

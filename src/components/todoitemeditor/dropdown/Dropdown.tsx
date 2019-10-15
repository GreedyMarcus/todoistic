import React, { Component } from 'react';
import './Dropdown.css';

interface Props {
  options: string[];
  defaultOption: string;
}

interface State {
  selected: string;
}

export class Dropdown extends Component<Props, State> {
  state: State = {
    selected: this.props.defaultOption
  }

  handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selected: e.target.value });
  }
  
  render() {
    return (
      <div>
        <select className="Dropdown" onChange={this.handleChange}>
          {
            this.props.options.map(option => {
              if (option === this.state.selected) {
                return <option selected value={option}>{ option }</option>
              } else {
                return <option value={option}>{ option }</option>
              }
            })
          }
        </select>
      </div>
    );
  }
}

export default Dropdown;
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
        <select className="Dropdown"
                defaultValue={this.props.defaultOption}
                onChange={this.handleChange}>
          {
            this.props.options.map(option => (
              <option key={option} value={option}>{ option }</option>
            ))
          }
        </select>
      </div>
    );
  }
}

export default Dropdown;
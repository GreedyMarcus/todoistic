import React, { Component } from 'react';
import './EditableTitle.css';

interface Props {
  title: string;
  changeTitle: (title: string) => void;
}

interface State {
  title: string;
}

export class EditableTitle extends Component<Props, State> {
  state: State = {
    title: this.props.title
  }

  handleChange = (title: string) => {
    this.props.changeTitle(title);
  }
  
  handleClick = () => {
    const titleText = document.querySelector('.EditableTitle');
    
    const titleInput = document.createElement('input');
    titleInput.className = 'EditableTitle-input';
    titleInput.value = this.state.title;

    if (titleText !== null && titleText.parentNode !== null) {
      titleText.parentNode.replaceChild(titleInput, titleText);

      titleInput.focus();
      titleInput.addEventListener('focusout', e => {
        if (titleInput !== null && titleInput.parentNode !== null) {
          const modifiedTitle = titleInput.value;
          if (modifiedTitle !== '') {
            this.setState({ title: modifiedTitle });
            this.handleChange(this.state.title);
          }
          titleInput.parentNode.replaceChild(titleText, titleInput);
        }
      });
    }
  }
  
  render() {
    return (
      <h1 className="EditableTitle" onClick={this.handleClick} data-editable>{ this.state.title }</h1>
    );
  }
}

export default EditableTitle;
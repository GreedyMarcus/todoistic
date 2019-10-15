import React, { Component } from 'react';
import './EditableDescription.css';

interface Props {
  description: string;
}

interface State {
  description: string;
}

export class EditableDescription extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      description: this.props.description
    }
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    const placeholder = "Add description for this todo...";
    const descriptionText = document.querySelector('.EditableDescription-content');

    const descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.className = 'EditableDescription-textarea';
    
    const currentText = this.state.description;
    if (currentText === placeholder) {
      descriptionTextarea.value = '';
    } else {
      descriptionTextarea.value = currentText;
    }
    
    if (descriptionText !== null && descriptionText.parentNode !== null) {
      descriptionText.parentNode.replaceChild(descriptionTextarea, descriptionText);

      descriptionTextarea.focus();
      descriptionTextarea.addEventListener('focusout', e => {
        if (descriptionTextarea !== null && descriptionTextarea.parentNode !== null) {
          const modifiedDescription = descriptionTextarea.value;
          if (modifiedDescription === '') {
            this.setState({ description: placeholder });
          } else {
            this.setState({ description: modifiedDescription});
          }
          descriptionTextarea.parentNode.replaceChild(descriptionText, descriptionTextarea);
        }
      });
    }
  }
  
  render() {
    return (
      <div className="EditableDescription">
        <h3 className="EditableDescription-header">Description</h3>
        <div className="EditableDescription-content"
             onClick={this.handleClick}
             data-editable>{ this.state.description }</div>
      </div>
    );
  }
}

export default EditableDescription;
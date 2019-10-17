import React, { Component } from 'react';
import './EditableDescription.css';

interface Props {
  description: string;
  changeDescription: (description: string) => void;
}

interface State {
  description: string;
}

export class EditableDescription extends Component<Props, State> {
  state: State = {
    description: this.props.description
  }

  handleChange = (description: string) => {
    this.props.changeDescription(description);
  }
  
  handleClick = () => {
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
            this.handleChange('');
          } else {
            this.setState({ description: modifiedDescription});
            this.handleChange(this.state.description);
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
             data-editable>{
               this.state.description === '' ?
                  "Add description for this todo..." :
                  this.state.description}</div>
      </div>
    );
  }
}

export default EditableDescription;
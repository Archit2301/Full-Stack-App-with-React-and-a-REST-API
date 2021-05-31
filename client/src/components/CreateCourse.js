import React, {Component} from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
  state= {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: []  
  }  

  render() {
    const {
      title, 
      description, 
      estimatedTime,
      materialsNeeded,
      errors  
    } = this.state;
    
    return(
      <div>
        <div class="wrap">
        <h2>Create Course</h2>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <React.Fragment>
                <div class="main--flex">
                  <div>
                    <label for="title">Course Title</label>
                    <input 
                      id="title"
                      name="title"
                      type="text"
                      value={title}
                      onChange={this.change}
                    />

                    <p>By Joe Smith</p>

                    <label for="description">Description</label>
                    <input 
                      id="description"
                      name="description"
                      type="text"
                      value={description}
                      onChange={this.change}
                    />  
                  </div>
                  <div>
                    <label for="estimatedTime">Estimated Time</label>
                    <input 
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      value={estimatedTime}
                      onChange={this.change}
                    />

                    <label for="materialsNeeded">Materials Needed</label>
                    <textarea 
                      id="materialsNeeded"
                      name="materialsNeeded"
                      value={materialsNeeded}
                      onChange={this.change}
                    />  
                  </div>                           
                </div>  
              </React.Fragment>  
            )}
          />  
        </div>  
      </div>  
    );    
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    
    this.setState(() => {
      return {
        [name]: value  
      };  
    });
  }

  cancel = () => {

  }

  submit = () => {
     
  }
}

import React, { Component } from 'react';
import axios from 'axios';
import '../styles/user.css';

class UserProfile extends Component {
  state = {
    file: null,
    getImage: '',
    b64Data: null
  };

  componentDidMount() {
    const contentType = 'image/png';
    axios
      .get('https://node-task-manager-app.herokuapp.com/api/users/me/avatar')
      .then(response => {
        const b64Data = response.data;
        this.setState({ b64Data });
        console.log(b64Data);
      })
      .catch(er => console.log({ er }));
  }

  handleFile = e => {
    console.log(e.target.files);
    const file = e.target.files[0];

    this.setState({ file });
  };

  handleUpload = e => {
    const {file} = this.state;
    const formdata = new FormData();
    formdata.append('avatar', file);
    axios
      .post(
        'https://node-task-manager-app.herokuapp.com/api/users/me/avatar',
        formdata
      )
      .then(response => console.log({ response }))
      .catch(er => console.log({ er }));
  };

  render() {
    return (
      <div className="user-container">
        <div>
          {this.state.b64Data && (
            <img
              style={{ backgroundColor: 'red', width: 300, height: 300 }}
              src={`data:image/jpeg;base64,${this.state.b64Data}`}
            />
          )}
        </div>
        <input type="file" name="file" onChange={this.handleFile} />
        <button onClick={this.handleUpload}>Upload</button>
      </div>
    );
  }
}

export default UserProfile;

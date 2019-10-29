import React from 'react'
// import { Helmet } from 'react-helmet'
// import {
//   Form,
//   Input,
//   Upload,
//   Button,
//   Icon,
//   message
// } from 'antd'

// @Form.create()
class ImportContacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('campaign', this.fileName.value);

    fetch('http://localhost:5000/api/contacts/upload', {
      method: 'POST',
      body: data
    }).then((response) => {
      response.json().then((body) => {
        console.log(body);
      });
    });
  }

  render() {
//   const props = {
//   name: 'file',
//   headers: {
//     authorization: 'authorization-text',
//   },
//   onChange(info) {
//     console.log(info);
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };

    return (
      <div>
        <form onSubmit={this.handleUploadImage}>
          <div>
            <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
          </div>
          <div>
            <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
          </div>
          <br />
          <div>
            <button type="submit">Upload</button>
          </div>
        </form>
      </div>
    )
  }
}

export default ImportContacts

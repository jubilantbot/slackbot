const fs = require('fs');
const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// Slack needs a file name for the upload
// This file is located in the current directory (`process.pwd()`)
const fileName = './test_file.csv';

// See: https://api.slack.com/methods/files.upload
web.files.upload({
  filetype: "csv",
  initial_comment: "Uploaded File",
  filename: "test_file.csv",
  channels: "#jubilant-space",
  title: "Attached File" + fileName,
  // You can use a ReadableStream or a Buffer for the file option
  file: fs.createReadStream(`./${fileName}`),
  // Or you can use the content property (but not both)
  // content: 'plain string content that will be editable in Slack'
})
  .then((res) => {
    // `res` contains information about the uploaded file
    console.log('File uploaded: ', res.file.id);
  })
  .catch(console.error);

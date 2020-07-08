var express = require('express');
var app = express();
var aws = require('aws-sdk');
var uuid = require('uuid');
require("dotenv").config();

const s3 = new aws.S3({ bucket: process.env.AWS_S3_BUCKET });

app.get("/sign", (req, res) => {
  const name = req.query.name;
  const type = req.query.type;
  const key = `uploads/${uuid.v4()}_${name}`;
  const uploadURL = s3.getSignedUrl("putObject", {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    ContentType: type,
    ACL: "public-read"
  });

  res.set({
    "Access-Control-Allow-Origin": '*', 
    "Access-Control-Allow-Headers": "*"
  });

  res.send({
    uploadURL,
    fileURL: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${key}`,
  });
})

app.listen(1111, function () {
  console.log('Example app listening on port 1111!');
});
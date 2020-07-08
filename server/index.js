var express = require('express');
var app = express();
var aws = require('aws-sdk');
var uuid = require('uuid');
require("dotenv").config();

const BUCKET_NAME = "eventpop-test";

const s3 = new aws.S3({ bucket: BUCKET_NAME });

app.get("/sign", (req, res) => {
  const name = req.query.name;
  const type = req.query.type;
  const key = `uploads/${uuid.v4()}_${name}`;
  const uploadURL = s3.getSignedUrl("putObject", {
    Bucket: BUCKET_NAME,
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
    fileURL: `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`,
  });
})

app.listen(1111, function () {
  console.log('Example app listening on port 1111!');
});
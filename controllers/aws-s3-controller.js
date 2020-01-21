require('dotenv').config(); // TODO see if i need this here or if index.js is global
const Aws = require('aws-sdk');
const S3_BUCKET = process.env.BUCKET

Aws.config.update({
  region: 'ap-southeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

const uploadFile = (req, res) => {
  const s3 = new Aws.S3();
  const { fileName, fileType } = req.body;

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        success: false,
        error: err
      });
    }

    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    res.json({
      success: true,
      data: {
        returnData
      }
    });
  });
}

module.exports = {
  uploadFile
};
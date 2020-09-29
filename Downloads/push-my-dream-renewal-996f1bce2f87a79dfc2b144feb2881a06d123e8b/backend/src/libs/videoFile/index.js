const AWS = require("aws-sdk");
const path = require("path");

module.exports = (function () {
  const {
    NCLOUD_ACCESS_KEY,
    NCLOUD_SECRET_KEY,
    NCLOUD_BUCKET_NAME,
    NCLOUD_ENDPOINT,
    NCLOUD_REGION,
  } = process.env;

  AWS.config.update({
    accessKeyId: NCLOUD_ACCESS_KEY,
    secretAccessKey: NCLOUD_SECRET_KEY,
  });
  const S3 = new AWS.S3({
    endpoint: NCLOUD_ENDPOINT,
    region: NCLOUD_REGION,
  });

  // 파일 삭제
  async function deleteFile({ key }) {
    console.log(key);
    return await S3.deleteObject({
      Bucket: NCLOUD_BUCKET_NAME,

      Key: key,
    }).promise();
  }
  return { deleteFile };
})();

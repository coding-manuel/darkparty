const AWS = require('aws-sdk');

require('dotenv').config()

const secretAccessKey = process.env.SECRET_ACCESS_KEY
const accessKeyId = process.env.ACCESS_KEY_ID
const S3_BUCKET ='darkparty';
const region ='ap-south-1';

const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
})

console.log("S3: ", s3)

const generateUrl = async (req, res) => {
    console.log(req.body)

    const params = ({
        Bucket: S3_BUCKET,
        Key: req.body.filename,
        Expires: 60 * 30
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)

    res.json({message: uploadURL})

}

module.exports = {
    generateUrl
}
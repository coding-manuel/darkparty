//* For the multipart explanation: https://blog.logrocket.com/multipart-uploads-s3-node-js-react/
const AWS = require('aws-sdk');
var _ = require('lodash');

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

const generateUrl = async (req, res) => {
    const params = ({
        Bucket: S3_BUCKET,
        Key: req.body.filename,
        Expires: 60 * 30
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)

    res.json({message: uploadURL})

}

async function initializeMultipartUpload(req, res) {
    const params = ({
        Bucket: S3_BUCKET,
        Key: req.body.name,
    })

    const multipartUpload = await s3.createMultipartUpload(params).promise()

    res.send({ fileId: multipartUpload.UploadId, fileKey: multipartUpload.Key, })
}

async function getMultipartPreSignedUrls(req, res) {
    const { fileKey, fileId, parts } = req.body
    const multipartParams = {
        Bucket: S3_BUCKET,
        Key: fileKey,
        UploadId: fileId,
    }

    const promises = []

    for (let index = 0; index < parts; index++) {
        promises.push(
            s3.getSignedUrlPromise("uploadPart", {
                ...multipartParams,
                PartNumber: index + 1,
            }),
        )
    }

    const signedUrls = await Promise.all(promises)
    // assign to each URL the index of the part to which it corresponds
    const partSignedUrlList = signedUrls.map((signedUrl, index) => {
        return {
            signedUrl: signedUrl,
            PartNumber: index + 1,
        }
    })

    res.send({
        parts: partSignedUrlList,
    })
}

async function finalizeMultipartUpload(req, res) {
    const { fileId, fileKey, parts } = req.body
    const multipartParams = {
        Bucket: S3_BUCKET,
        Key: fileKey,
        UploadId: fileId,
        MultipartUpload: {
            // ordering the parts to make sure they are in the right order
            Parts: _.orderBy(parts, ["PartNumber"], ["asc"]),
        }
    }

    const completeMultipartUploadOutput = await s3.completeMultipartUpload(multipartParams).promise()
    // completeMultipartUploadOutput.Location represents the
    // URL to the resource just uploaded to the cloud storage
    res.send(completeMultipartUploadOutput.Location)
}

module.exports = {
    generateUrl,
    initializeMultipartUpload,
    getMultipartPreSignedUrls,
    finalizeMultipartUpload
}
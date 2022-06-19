//* For the multipart explanation: https://blog.logrocket.com/multipart-uploads-s3-node-js-react/
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const pool = require('../utils/db');
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

const getAllMovies = (req, res) => {
    pool.query(`SELECT * FROM movies`, function (err, result){
        res.json(result.rows)
    })
}

const getMovie = (req, res) => {
    pool.query(`SELECT * FROM movies`, function (err, result){
        res.json(result.rows)
    })
}

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

const uploadMovieDetails = async (req, res) => {
    const {director, title, movie, poster} = req.body
    const { id } = req.session

    pool.query('BEGIN', err => {
        pool.query(`INSERT INTO movies (title, director, id, movieurl, posterurl, user_id) VALUES( $1, $2, $3, $4, $5, $6)`, [title, director, uuidv4(), movie, poster, id], function(err, result) {
            if(err){
                console.log(err)
            }
            pool.query('COMMIT', err => {
                if (err) {
                    console.error('Error committing transaction', err.stack)
                }
            })

            res.status(200).json({success: true, message: 'Movie Added'})
            })
    })
}

module.exports = {
    getAllMovies,
    getMovie,
    generateUrl,
    initializeMultipartUpload,
    getMultipartPreSignedUrls,
    finalizeMultipartUpload,
    uploadMovieDetails
}
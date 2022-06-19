const express = require("express");
const router = express.Router();

const { generateUrl, initializeMultipartUpload, finalizeMultipartUpload, getMultipartPreSignedUrls, uploadMovieDetails } = require("../controller/movieController");

router.post("/uploadmoviedetails", uploadMovieDetails)
router.post("/generateurl", generateUrl)
router.post("/initializemultipartupload", initializeMultipartUpload)
router.post("/getmultipartpresignedUrls", getMultipartPreSignedUrls)
router.post("/finalizemultipartupload", finalizeMultipartUpload)

module.exports = router;
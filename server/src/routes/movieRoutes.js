const express = require("express");
const router = express.Router();

const { getAllMovies, getMovie, generateUrl, initializeMultipartUpload, finalizeMultipartUpload, getMultipartPreSignedUrls, uploadMovieDetails } = require("../controller/movieController");

router.get("/getallmovie", getAllMovies)

router.post("/getmovie", getMovie)
router.post("/uploadmoviedetails", uploadMovieDetails)
router.post("/generateurl", generateUrl)
router.post("/initializemultipartupload", initializeMultipartUpload)
router.post("/getmultipartpresignedUrls", getMultipartPreSignedUrls)
router.post("/finalizemultipartupload", finalizeMultipartUpload)

module.exports = router;
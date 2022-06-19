const express = require("express");
const router = express.Router();

const { generateUrl, initializeMultipartUpload, finalizeMultipartUpload, getMultipartPreSignedUrls } = require("../controller/movieController");

router.post("/generateUrl", generateUrl)
router.post("/initializeMultipartUpload", initializeMultipartUpload)
router.post("/getMultipartPreSignedUrls", getMultipartPreSignedUrls)
router.post("/finalizeMultipartUpload", finalizeMultipartUpload)

module.exports = router;
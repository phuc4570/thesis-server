var express = require('express');
const multer = require('multer');
const fs = require('fs');
const {spawn} = require('child_process');
const directoryGalleryPath = 'public/Image/Gallery';
var router = express.Router();

var prompt = "";

const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Image/Gallery'); // Specify the folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});

const paintInputStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Image/Paint/Input'); // Specify the folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, "input.png"); // Use the original filename
  },
});

const paintMaskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Image/Paint/Mask'); // Specify the folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, "mask.png"); // Use the original filename
  },
});

const galleryUpload = multer({ storage: galleryStorage });
const paintInputUpload = multer({ storage: paintInputStorage });
const paintMaskUpload = multer({ storage: paintMaskStorage });

/* GET home page. */
router.post('/image-sketch', function(req, res, next) {
  console.log(req.body.text);
  const python = spawn('python', [
    'D:/moving.py',
  ]);
  python.on('close', (code) => {
    res.send(code.toString());
  });
});

router.post('/image-generation', function(req, res, next) {
  console.log(req.body.text);
  const python = spawn('python', [
    'D:/moving.py',
  ]);
  python.on('close', (code) => {
    res.send(code.toString());
  });
});

router.post('/object-adjustment', function(req, res, next) {
  console.log(req.body.text);
  const python = spawn('python', [
    'D:/moving.py',
  ]);
  python.on('close', (code) => {
    res.send(code.toString());
  });
});

router.post('/object-addition', function(req, res, next) {
  console.log(req.body.text);
  const python = spawn('python', [
    'D:/moving.py',
  ]);
  python.on('close', (code) => {
    res.send(code.toString());
  });
});

router.post('/concept-generation', function(req, res, next) {
  console.log(req.body.text);
  const python = spawn('python', [
    'D:/moving.py',
  ]);
  python.on('close', (code) => {
    res.send(code.toString());
  });
});

router.post('/pose-transition', function(req, res, next) {
  console.log(req.body.text);
  const python = spawn('python', [
    'D:/moving.py',
  ]);
  python.on('close', (code) => {
    res.send(code.toString());
  });
});


router.get('/galleryName', function(req, res, next) {
  var arrayName = [];
  fs.readdirSync(directoryGalleryPath).forEach(file => {
    arrayName.push(file);
  });
  res.status(200).send(arrayName);
});

router.post('/upload', galleryUpload.single('file'), function(req, res, next) {
  var arrayName = [];
  fs.readdirSync(directoryGalleryPath).forEach(file => {
    arrayName.push(file);
  });
  res.status(200).send(arrayName);
});

router.post('/input', paintInputUpload.single('file'), function(req, res, next) {

});

router.post('/mask', paintMaskUpload.single('file'), function(req, res, next) {

});

router.post('/mask', paintMaskUpload.single('file'), function(req, res, next) {

});

module.exports = router;

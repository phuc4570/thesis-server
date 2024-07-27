var express = require('express');
const multer = require('multer');
const fs = require('fs');
const {spawn} = require('child_process');
const directoryGalleryPath = 'public/Image/Gallery';
var router = express.Router();
const axios = require('axios');
const Jimp = require('jimp');

var prompt = "";
const server_py_port = '20213'
const server_generate = '172.29.64.75'
const server_generate_port = '8000'

const input_dir = 'public/Image/Paint/Input/input.png'
const mask_dir = 'public/Image/Paint/Mask/mask.png'
const output_dir = 'public/Image/Paint/Output/output.png'
const output_gallery_dir = `public/Image/Gallery/z_output${Date.now()}.png`

var importSize = {
  width: 0,
  height: 0,
}

var offsetSize = {
  widthOffset: 0,
  heightOffset: 0,
}

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

router.post('/image_generation', async function(req, res, next) {
  console.log(req.body.text);
  /*fs.unlink(output_dir, (err) => {
    if (err) {
        console.error('Error deleting the file:', err);
    } else {
        console.log('File deleted successfully!');
    }
  });*/
  const data = {text: req.body.text};
  axios.post(`http://0.0.0.0:${server_py_port}/image-generation`, data).then((response) => {
    fs.copyFileSync(output_dir, output_gallery_dir);
    res.send(response.text);
  })
});

router.post('/add_item', async function(req, res, next) {
  //read Image
  const imageFile = fs.readFileSync(input_dir);
  const imageBase64String = Buffer.from(imageFile).toString('base64');

  //read Mask
  const maskFile = fs.readFileSync(mask_dir)
  const maskBase64String = Buffer.from(maskFile).toString('base64');

  const data = {
    image: imageBase64String,
    mask: maskBase64String,
    prompt: req.body.text,
  };
  console.log(data)
  await axios.post(`http://${server_generate}:${server_generate_port}/add_item`, data).then((response) => {
    console.log(response.data);
    fs.writeFileSync(output_dir, response.data.data, { encoding: 'base64' }, (err) => {
      if (err) {
          console.error('Error writing file:', err);
      } else {
          console.log('Image saved');
      }
    });
    fs.copyFileSync(output_dir, output_gallery_dir);
    res.send(response.data);
  })
});

router.post('/alter_background', async function(req, res, next) {
  //read Image
  const imageFile = fs.readFileSync(input_dir);
  const imageBase64String = Buffer.from(imageFile).toString('base64');

  //read Mask
  const maskFile = fs.readFileSync(mask_dir)
  const maskBase64String = Buffer.from(maskFile).toString('base64');

  const data = {
    image: imageBase64String,
    mask: maskBase64String,
    prompt: req.body.text,
  };
  console.log(data)
  await axios.post(`http://${server_generate}:${server_generate_port}/alter_background`, data).then((response) => {
    console.log(response.data);
    fs.writeFileSync(output_dir, response.data.data, { encoding: 'base64' }, (err) => {
      if (err) {
          console.error('Error writing file:', err);
      } else {
          console.log('Image saved');
      }
    });
    fs.copyFileSync(output_dir, output_gallery_dir);
    res.send(response.data);
  })
});

router.post('/change_pose_view', async function(req, res, next) {
  //read Image
  const imageFile = fs.readFileSync(input_dir);
  const imageBase64String = Buffer.from(imageFile).toString('base64');

  //read Mask
  const maskFile = fs.readFileSync(mask_dir)
  const maskBase64String = Buffer.from(maskFile).toString('base64');

  const data = {
    image: imageBase64String,
    mask: maskBase64String,
    prompt: req.body.text,
  };
  console.log(data)
  await axios.post(`http://${server_generate}:${server_generate_port}/change_pose_view`, data).then((response) => {
    console.log(response.data);
    fs.writeFileSync(output_dir, response.data.data, { encoding: 'base64' }, (err) => {
      if (err) {
          console.error('Error writing file:', err);
      } else {
          console.log('Image saved');
      }
    });
    fs.copyFileSync(output_dir, output_gallery_dir);
    res.send(response.data);
  })
});

router.post('/replace_object_fixed', async function(req, res, next) {
  //read Image
  const imageFile = fs.readFileSync(input_dir);
  const imageBase64String = Buffer.from(imageFile).toString('base64');

  //read Mask
  const maskFile = fs.readFileSync(mask_dir)
  const maskBase64String = Buffer.from(maskFile).toString('base64');

  const data = {
    image: imageBase64String,
    mask: maskBase64String,
    prompt: req.body.text,
  };
  console.log(data)
  await axios.post(`http://${server_generate}:${server_generate_port}/replace_object_fixed`, data).then((response) => {
    console.log(response.data);
    fs.writeFileSync(output_dir, response.data.data, { encoding: 'base64' }, (err) => {
      if (err) {
          console.error('Error writing file:', err);
      } else {
          console.log('Image saved');
      }
    });
    fs.copyFileSync(output_dir, output_gallery_dir);
    res.send(response.data);
  })
});

router.post('/replace_object_dynamic', async function(req, res, next) {
  //read Image
  const imageFile = fs.readFileSync(input_dir);
  const imageBase64String = Buffer.from(imageFile).toString('base64');

  //read Mask
  const maskFile = fs.readFileSync(mask_dir)
  const maskBase64String = Buffer.from(maskFile).toString('base64');

  const data = {
    image: imageBase64String,
    mask: maskBase64String,
    prompt: req.body.text,
  };
  console.log(data)
  await axios.post(`http://${server_generate}:${server_generate_port}/replace_object_dynamic`, data).then((response) => {
    console.log(response.data);
    fs.writeFileSync(output_dir, response.data.data, { encoding: 'base64' }, (err) => {
      if (err) {
          console.error('Error writing file:', err);
      } else {
          console.log('Image saved');
      }
    });
    fs.copyFileSync(output_dir, output_gallery_dir);
    res.send(response.data);
  })
});

router.post('/thematic_collection_fixed', async function(req, res, next) {
  //read Image
  const imageFile = fs.readFileSync(input_dir);
  const imageBase64String = Buffer.from(imageFile).toString('base64');

  //read Mask
  const maskFile = fs.readFileSync(mask_dir)
  const maskBase64String = Buffer.from(maskFile).toString('base64');

  const data = {
    image: imageBase64String,
    mask: maskBase64String,
    prompt: req.body.text,
  };
  console.log(data)
  await axios.post(`http://${server_generate}:${server_generate_port}/thematic_collection_fixed`, data).then((response) => {
    console.log(response.data);
    fs.writeFileSync(output_dir, response.data.data, { encoding: 'base64' }, (err) => {
      if (err) {
          console.error('Error writing file:', err);
      } else {
          console.log('Image saved');
      }
    });
    fs.copyFileSync(output_dir, output_gallery_dir);
    res.send(response.data);
  })
});

router.post('/thematic_collection', async function(req, res, next) {
  //read Image
  const imageFile = fs.readFileSync(input_dir);
  const imageBase64String = Buffer.from(imageFile).toString('base64');

  //read Mask
  const maskFile = fs.readFileSync(mask_dir)
  const maskBase64String = Buffer.from(maskFile).toString('base64');

  const data = {
    image: imageBase64String,
    mask: maskBase64String,
    prompt: req.body.text,
  };
  console.log(data)
  await axios.post(`http://${server_generate}:${server_generate_port}/thematic_collection`, data).then((response) => {
    console.log(response.data);
    fs.writeFileSync(output_dir, response.data.data, { encoding: 'base64' }, (err) => {
      if (err) {
          console.error('Error writing file:', err);
      } else {
          console.log('Image saved');
      }
    });
    fs.copyFileSync(output_dir, output_gallery_dir);
    res.send(response.data);
  })
});

router.post('/remove_object', async function(req, res, next) {
  //read Image
  const imageFile = fs.readFileSync(input_dir);
  const imageBase64String = Buffer.from(imageFile).toString('base64');

  //read Mask
  const maskFile = fs.readFileSync(mask_dir)
  const maskBase64String = Buffer.from(maskFile).toString('base64');

  const data = {
    image: imageBase64String,
    mask: maskBase64String,
    prompt: req.body.text,
  };
  console.log(data)
  await axios.post(`http://${server_generate}:${server_generate_port}/remove_object`, data).then((response) => {
    console.log(response.data);
    fs.writeFileSync(output_dir, response.data.data, { encoding: 'base64' }, (err) => {
      if (err) {
          console.error('Error writing file:', err);
      } else {
          console.log('Image saved');
      }
    });
    fs.copyFileSync(output_dir, output_gallery_dir);
    res.send(response.data);
  })
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

router.post('/input', paintInputUpload.single('file'), async function(req, res, next) {
  await Jimp.read(input_dir, async (err, image) => {
    if (err) throw err;
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    if(importSize.width === 0){
      importSize.width = width
      importSize.height = height
      offsetSize.widthOffset = 66;
      offsetSize.heightOffset = 66;
    }
    await image.crop((width - importSize.width)/2 + offsetSize.widthOffset, (height - importSize.height)/2 + offsetSize.heightOffset, importSize.width - 2 * offsetSize.widthOffset, importSize.height - 2 * offsetSize.heightOffset).write('public/Image/Paint/Input/input.png');
    res.send('inputDone');
    const imageFile = fs.readFileSync(input_dir);
  });
});

router.post('/mask', paintMaskUpload.single('file'), async function(req, res, next) {
  await Jimp.read(mask_dir, async (err, image) => {
    if (err) throw err;
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    if(importSize.width === 0){
      importSize.width = width
      importSize.height = height
      offsetSize.widthOffset = 66;
      offsetSize.heightOffset = 66;
    }
    await image.crop((width - importSize.width)/2 + offsetSize.widthOffset, (height - importSize.height)/2 + offsetSize.heightOffset, importSize.width - 2 * offsetSize.widthOffset, importSize.height - 2 * offsetSize.heightOffset).greyscale().normalize().invert().threshold({ max: 10 }).write('public/Image/Paint/Mask/mask.png');
    res.send('maskDone');
  });
});

router.post('/import-size', function(req, res, next) {
  importSize.width = req.body.width
  importSize.height = req.body.height

  offsetSize.widthOffset = 66;
  offsetSize.heightOffset = 66;

  if(importSize.width > importSize.height){
    offsetSize.widthOffset = offsetSize.widthOffset * (importSize.width/importSize.height)
  }else if(importSize.height > importSize.width){
    offsetSize.heightOffset = offsetSize.heightOffset * (importSize.height/importSize.width)
  }

});

module.exports = router;

const express = require('express');

const path = require('path');

const app = express();

const multer = require('multer');

// * Assigning folder for 'File Upload'
const upload = multer({ dest: 'uploads/' });

const merge_pdf = require('./merge');

// Serving Static File
app.use('/static', express.static('public'));

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "template/index.html"));
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  console.log(`Requested Files (req.files) : `, req.files);
  console.log(`Requested Option (req.body) : `, req.body);
  
  const { option, page_no } = req.body;

  // Merging Uploaded Files
  let d = await merge_pdf(option, path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path), page_no);

  // ? Redirecting to Merged PDF download Page
  res.redirect(`http://localhost:3000/static/${d}.pdf`);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});

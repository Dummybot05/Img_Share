const express = require('express')
const app = express()
const fs = require("fs")
const multer  = require('multer')
const PORT = 3000 || process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"))

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })
app.post('/profile', upload.single('imz'), function (req, res, next) {
  res.redirect('/')
})

app.get("/", async (req, res) => {
  fs.readdir('./public', (err, fila) => {
    const fileListJSON = JSON.stringify(fila);
    let imageElements = fila.map(ec => `<img src='${ec}' class='uploaded-image' />`).join('');
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <title>Image Upload</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            background-color:#f1f1f1;
          }

          #ttt {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;
          }

          .uploaded-image {
            width: 100%;
            max-width: 300px;
            height: auto;
            margin: 10px;
            border-radius: 5px;
            background-color:#3f3f3f;
          }

          @media (min-width: 150px) {
            .uploaded-image {
              width: calc(33.33% - 20px);
            }
          }

          @media (min-width: 150px) {
            .uploaded-image {
              width: calc(33.33% - 20px);
            }
          }

          form {
            margin-top: 20px;
            text-align: center;
          }

          input[type='file'] {
            margin-right: 10px;
          }

          input[type='submit'] {
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
          <form action='/profile' method='post' enctype='multipart/form-data'>
             <input type='file' name='imz' />
             <input type='submit' value='Done' />
          </form>
          <div id='ttt'>${imageElements}</div>
      </body>
      </html>
    `);
  });
});

app.listen(PORT, () => {
   console.log("App Listening");
})

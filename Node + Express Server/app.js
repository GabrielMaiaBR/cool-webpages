const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/process-form', (req, res) => {
  const { name, email } = req.query;
  res.send(`Nome: ${name}, Email: ${email}`);
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo foi enviado.');
  }

  res.send('Arquivo enviado com sucesso.');
});

app.get('/data.json', (req, res) => {
  const jsonData = { message: 'Isso é um exemplo de dados JSON.' };
  res.json(jsonData);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

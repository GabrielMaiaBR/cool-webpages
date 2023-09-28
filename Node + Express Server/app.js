const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Configuração do Multer para uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Configuração do Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Rota para processar dados do formulário via GET
app.get('/process-form', (req, res) => {
  const { name, email } = req.query;
  res.send(`Nome: ${name}, Email: ${email}`);
});

// Rota para upload de arquivo via POST
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo foi enviado.');
  }

  // O arquivo foi enviado com sucesso
  res.send('Arquivo enviado com sucesso.');
});

// Rota AJAX para obter dados JSON
app.get('/data.json', (req, res) => {
  const jsonData = { message: 'Isso é um exemplo de dados JSON.' };
  res.json(jsonData);
});

// Rota raiz, onde seu arquivo HTML será servido
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
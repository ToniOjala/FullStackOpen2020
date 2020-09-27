import express from 'express';
const app = express();
app.use(express.json());

app.get('/ping', (_request, response) => {
  console.log('ping pong');
  response.send('pong');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
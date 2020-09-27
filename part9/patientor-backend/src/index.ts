import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnoses';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_request, response) => {
  console.log('ping pong');
  response.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
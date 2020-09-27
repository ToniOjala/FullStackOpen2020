import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
  const height = Number(request.query.height);
  const weight = Number(request.query.weight);

  if ( !height || !weight || isNaN(height) || isNaN(weight) ) {
    response.send({
      error: 'malformatted parameters'
    });
  }

  const bmi = calculateBmi(height, weight);

  response.send({
    weight,
    height,
    bmi
  });
});

app.post('/exercises', (request, response) => {
  const dailyExercises:Array<number> = request.body.dailyExercises as Array<number>;
  const target = Number(request.body.target);

  if ( !dailyExercises || !target ) response.send({ error: 'parameters missing'});
  if ( isNaN(target) ) response.send({ error: 'malformatted parameters' });

  dailyExercises.forEach((de: number) => {
    if (isNaN(de)) response.send({ error: 'malformatted parameters' });
  });

  const result = calculateExercises(dailyExercises, target);
  response.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
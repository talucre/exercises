import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    const isNumbers = isNaN(height) || isNaN(weight);
    const isZero = height === 0 || weight === 0;

    if (isNumbers || isZero) {
        res.json({ error: 'malformatted parameters' });
    }

    const bmi = calculateBmi(height, weight);

    res.send({ height, weight, bmi });
});

app.post('/exercise', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises: hours } = req.body;

    if (!target || !hours) {
        res.send({ error: 'parameters missing' });
    }

    if (isNaN(Number(target))) {
        res.send({ error: 'malformatted parameters' });
    }

    if (hours instanceof Array) {
        if (hours.length < 2) {
            res.send({ error: 'parameters missing' });
        }

        for (const h of hours) {
            if (isNaN(Number(h))) {
                res.send({ error: 'malformatted parameters' });
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(target, hours);

    res.send({ result });
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height)
    const weight = Number(req.query.weight)

    const isNumbers = isNaN(height) || isNaN(weight)
    const isZero = height === 0 || weight === 0

    if (isNumbers || isZero) {
        res.json({ error: 'malformatted parameters' })
    }

    const bmi = calculateBmi(height, weight)

    res.send({ height, weight, bmi })
})

const PORT = 3002

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

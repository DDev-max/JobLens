import express from 'express'
import { jobRouter } from './routes/jobRouter.ts'

const app = express()

const PORT = process.env.PORT ?? 777

app.use('/jobs', jobRouter)

app.use((_req, res) => {
  res.status(404).send('Not found')
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`\n Server listening on port http://localhost:${PORT}/jobs \n`)
})

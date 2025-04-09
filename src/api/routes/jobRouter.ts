import { validateJobRequest } from '#api/schemas/jobRequest.ts'
import { getJobInfo } from '#Utils/getJobInfo/getJobInfo.ts'
import { Router } from 'express'

export const jobRouter = Router()

jobRouter.get('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const params = validateJobRequest(req.query)

  if (params.error) {
    res.status(400).json({ error: JSON.parse(params.error.message) })
    return
  }

  const jobInfo = await getJobInfo({ jobLocation: params.data.location, jobPosition: params.data.position })

  res.json(jobInfo)
})
//in case we would like to add more routes

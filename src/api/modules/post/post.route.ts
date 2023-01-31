import { Router } from 'express'

export const blogRouter = Router()

blogRouter.get('/', (req, res) => {
  res.send('Hello World!')
})

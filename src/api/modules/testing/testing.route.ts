import { Router } from 'express'
import { deleteAllDataHandler } from './testing.controller'

export const TestingRouter = Router()

TestingRouter.delete('/all-data', deleteAllDataHandler)

import { Router } from 'express'
import { deleteAllDataHandler } from './testing.controller'

export const testingRouter = Router()

testingRouter.delete('/all-data', deleteAllDataHandler)

import { videos } from '../../db'
import { Request, Response } from 'express'

export async function deleteAllDataHandler(req: Request, res: Response) {
  videos.length = 0
  res.sendStatus(204)
}

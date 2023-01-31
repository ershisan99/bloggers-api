import { db } from '../../db'
import { Request, Response } from 'express'

export async function deleteAllDataHandler(req: Request, res: Response) {
  db.videos.length = 0
  db.blogs.length = 0
  res.sendStatus(204)
}

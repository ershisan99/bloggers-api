import app from './app'
import mongoose from 'mongoose'

const port = process.env.PORT || 5274
;(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '')
    console.log('Connected to MongoDB')
  } catch (error: any) {
    console.log(error.message)
  }
})()
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`)
  /* eslint-enable no-console */
})

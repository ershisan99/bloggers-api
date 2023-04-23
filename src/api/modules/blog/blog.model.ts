import { Schema, InferSchemaType, model } from 'mongoose'
import { websiteRegex } from './blog.schema'

const blogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 15,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    websiteUrl: {
      type: String,
      required: true,
      maxlength: 100,
      match: websiteRegex,
    },
  },
  {
    timestamps: true,
  },
)
blogSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

blogSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  },
})
interface IBlog extends Document {
  id: string
  name: string
  description: string
  websiteUrl: string
}

export type Blog = InferSchemaType<typeof blogSchema>
export const BlogModel = model<IBlog>('Blog', blogSchema)

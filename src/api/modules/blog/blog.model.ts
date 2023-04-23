import { model, Schema, InferSchemaType } from 'mongoose'
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
    isMembership: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
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
interface IBlog extends InferSchemaType<typeof blogSchema> {
  id: string
  createdAt: Date
}

export const BlogModel = model<IBlog>('Blog', blogSchema)

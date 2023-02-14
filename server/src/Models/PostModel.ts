import { Schema, model } from "mongoose"
import { User } from "./UserModel"

export interface Post {
  title: string
  content: string
  author: User
}

const PostSchema = new Schema<Post>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
})

const PostModel = model<Post>("Post", PostSchema)
export default PostModel

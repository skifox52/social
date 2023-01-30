import { Schema, model } from "mongoose"

export interface User {
  name: string
  password: string
  mail: string
  age: number
  friends: User[]
}

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: "User",
    },
  ],
})

const UserModel = model<User>("User", UserSchema)
export default UserModel

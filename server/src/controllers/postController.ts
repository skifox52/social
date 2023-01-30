import expressAsyncHandler from "express-async-handler"
import { Request, Response } from "express"
import PostModel from "../Models/PostModel.js"
import { readdirSync } from "fs"

//Get all posts
export const getPosts = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const allPosts = await PostModel.find()
      res.status(200).json(allPosts)
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)

//Post a post
export const postPost = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { title, content } = req.body
      if (!title || !content) {
        res.status(400)
        throw new Error("Empty fields!")
      }
      const userId = req.user
      await PostModel.create({ title, content, author: userId })
      res.status(201).json("Post created successfully")
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)

//Get a post by [ID] of a certain user
export const findById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.id
      const posts = await PostModel.find({ author: userId })
      res.status(200).json(posts)
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)

//Delete a users Post
export const deleteUserPost = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await PostModel.findByIdAndDelete(id)
      res.status(202).json(`Post ${id} deleted successfully!`)
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)
//Update a post
interface Post {
  title: string
  content: string
}
export const updatePost = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { title, content }: Post = req.body
      if (!title && !content) {
        res.status(200).json("Nothing has been changed!")
      }
      const { id } = req.params
      const user = await PostModel.findById(id)
      console.log(user)
      if (!user) {
        res.status(400).json("Post dosn't exist!")
      }
      await PostModel.findByIdAndUpdate(id, req.body)
      res.status(200).json(`User ${id} has been updated successfully!`)
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)

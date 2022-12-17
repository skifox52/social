import express, { Application, Request, Response } from "express"
import ErrorMiddleware from "./middleware/errorHandler.js"
import UserRouter from "./routes/userRouter.js"
import { connect } from "mongoose"
import "dotenv/config"

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/user", UserRouter)

app.use(ErrorMiddleware)

connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`App running at port ${process.env.PORT}`)
    )
  })
  .catch((err) => console.error(err))

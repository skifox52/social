import axios from "axios"

export interface User {
  name: string
  password: string
  mail: string
  age: number
}

const registerUser = async (userInput: User) => {
  const response = await axios.post("/user/register", userInput)
  if (response.data) {
    localStorage.setItem("User", response.data)
  }
  return response.data
}

const userService = {
  registerUser,
}

export default userService

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userService, { User } from "./userService"

interface initialStateType {
  user: string | null
  state: string
  message: any
}
//Get user token
const user = localStorage.getItem("User")

const initialState: initialStateType = {
  user: user ? user : null,
  state: "default",
  message: "",
}

//Register a user
export const register = createAsyncThunk(
  "user/register",
  async (user: User, thunkAPI) => {
    try {
      return await userService.registerUser(user)
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
//Creating the users slice
const userSlice = createSlice({
  name: "user",
  reducers: {
    //Reset default state
    reset: (state) => {
      state.state = "default"
      state.message = ""
    },
  },
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.state = "loading"
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.state = "success"
        state.user = payload
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.state = "rejected"
        state.user = null
        state.message = payload
      })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer

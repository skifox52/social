import { ChangeEvent, FormEvent, useState } from "react"

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const onChange = (e: any) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
  }
  return (
    <div className="flex justify-center w-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-1/3"
      >
        <h2 className="text-lg font-medium mb-4">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={onChange}
            className="border border-gray-400 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={onChange}
            className="border border-gray-400 p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded-full w-full"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login

import React, { useState } from "react"

const Register: React.FC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Name:", name)
    console.log("Email:", email)
    console.log("Password:", password)
    console.log("Confirm Password:", confirmPassword)
  }

  return (
    <div className="flex justify-center items-center w-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-1/3"
      >
        <h2 className="text-lg font-medium mb-4">Register</h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-400 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirm-password"
            className="block text-gray-700 font-medium mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-400 p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded-full w-full"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register

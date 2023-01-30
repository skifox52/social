import React from "react"

const Post = () => {
  const [likes, setLikes] = React.useState(0)

  const handleLike = () => {
    setLikes(likes + 1)
  }

  return (
    <div className="mx-auto max-w-sm shadow-lg rounded overflow-hidden bg-slate-400 p-8 bor">
      <img className="w-full" src={"image"} alt="Post cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{"title"}</div>
        <p className="text-gray-700 text-base">{"content"}</p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {"author"}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Likes: {likes}
        </span>
      </div>
      <div className="px-6 py-4">
        <button
          onClick={handleLike}
          className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded"
        >
          Like
        </button>
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded ml-4">
          Comment
        </button>
      </div>
    </div>
  )
}

export default Post

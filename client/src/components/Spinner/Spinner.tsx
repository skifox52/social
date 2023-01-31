import "./Spinner.css"
function Spinner() {
  return (
    <div className="  bg-slate-200 h-screen w-screen absolute top-0 flex justify-center items-center">
      <div className="w-12 h-12 border-8 border-gray-600 rounded-full loader"></div>
    </div>
  )
}

export default Spinner

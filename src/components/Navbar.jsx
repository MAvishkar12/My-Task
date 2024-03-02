

function Navbar() {
  return (
  <nav className="flex justify-between shadow-lg shadow-cyan-500/50 bg-slate-900 text-white py-3">
    <div className="logo">
      <span className="font-bold  text-xl mx-9 ">MY-Task</span>
    </div>
    <ul className="flex gap-8 mx-9">
      <li className="cursor-pointer hover:font-bold transition-all duration-75">Home</li>
      <li  className="cursor-pointer hover:font-bold transition-all duration-75">You_Task</li>
    </ul>
  </nav>
  )
}

export default Navbar

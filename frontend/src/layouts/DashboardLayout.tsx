import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"


const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 overflow-auto bg-light text-dark font-inter">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
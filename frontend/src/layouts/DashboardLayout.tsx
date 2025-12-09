import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import DashboardHeader from "../components/DashboardHeader"


const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 overflow-auto bg-light text-dark font-inter">
        <DashboardHeader />
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
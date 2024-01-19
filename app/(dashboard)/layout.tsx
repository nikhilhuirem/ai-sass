import Navbar from "@/components/navbar"
import SideBar from "@/components/sideBar"

export default function DashboardLayout({
    children,
}:
  {
    children: React.ReactNode //type of children
}) {
    return <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 x-80 bg-gray-900">
            <div className="text-white">
                <SideBar />
            </div>
        </div>
        <main className="md:pl-72">
            <Navbar />
            {children}
        </main>
    </div>
}
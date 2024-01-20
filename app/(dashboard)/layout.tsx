import Navbar from "@/components/navbar"
import SideBar from "@/components/sideBar"
import { getApiLimitCount } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription";

export default async function DashboardLayout({
    children,
}:
  {
    children: React.ReactNode //type of children
}) { 
    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();

    return <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 x-80 bg-gray-900">
            <div className="text-white">
                <SideBar apiLimitCount={apiLimitCount} isPro={isPro} />
            </div>
        </div>
        <main className="md:pl-72">
            <Navbar />
            {children}
        </main>
    </div>
}
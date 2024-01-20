
import { UserButton } from '@clerk/nextjs'
import MobileSideBar from './mobile-sidebar'
import { getApiLimitCount } from '@/lib/api-limit'

export default async function Navbar() {
    const apiLimitCount = await getApiLimitCount();
    return (
        <div className="flex items-senter p-4">
            <MobileSideBar apiLimitCount={apiLimitCount} />
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl='/'/>
            </div>
        </div>
    )
}
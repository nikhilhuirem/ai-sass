
import { UserButton } from '@clerk/nextjs'
import MobileSideBar from './mobile-sidebar'

export default function Navbar() {
    return (
        <div className="flex items-senter p-4">
            <MobileSideBar />
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl='/'/>
            </div>
        </div>
    )
}
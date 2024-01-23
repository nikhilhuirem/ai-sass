import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return <SignIn />
}

// import { UserButton } from "@clerk/nextjs";
 
// export default function Home() {
//   return (
//     <div className="h-screen">
//       <UserButton afterSignOutUrl="/"/>
//     </div>
//   )
// }
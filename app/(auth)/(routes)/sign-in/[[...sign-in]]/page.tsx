import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return <SignIn after/>
}

// import { UserButton } from "@clerk/nextjs";
 
// export default function Home() {
//   return (
//     <div className="h-screen">
//       <UserButton afterSignOutUrl="/"/>
//     </div>
//   )
// }
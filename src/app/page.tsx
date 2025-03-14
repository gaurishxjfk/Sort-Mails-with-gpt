"use client";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/app/components/ui/Button";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  if (session) redirect(`/gmail`);

  async function handleSubmit(){
    try {
      const resp = await fetch('/api/register',{
        method: "POST",
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        body: JSON.stringify({email: "a@b.com"})
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <main className="text-center flex flex-col w-[95%] md:w-[85%] lg:w-[65%]  mx-auto h-screen ">
      <div className=" bg-white rounded-md my-auto ">
          {/* <p className="text-gray-500 text-[12px] mt-2">Not signed in</p>
          <Button
            text={"Login with Google"}
            btnHandler={signIn}
            className="bg-blue-600 my-2"
          /> */}
          <input type="text" placeholder="enter email" />
          <Button
            text={"Login with Google"}
            btnHandler={handleSubmit}
            className="bg-blue-600 my-2"
          /> 
      </div>
    </main>
  );
}

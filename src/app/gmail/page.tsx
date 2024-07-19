"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import { Button } from "../components/ui/Button";
import EmailList from "../components/EmailList";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="flex flex-col w-[95%] md:w-[85%] lg:w-[65%]  mx-auto h-screen ">
      <div className="rounded-md my-auto shadow-md ">
        {session ? (
          <>
            <div className="flex justify-around items-center py-4 bg-gray-100 rounded-t-lg mt-4 border border-t-0 border-x-0 border-b-2">
              <div className="flex items-center">
                <div>
                  <Image
                    src={session.user?.image || ''}
                    alt="user icon"
                    width={45}
                    height={45}
                    className="rounded-full"
                  />
                </div>
                <div className="text-gray-800 ml-2">
                  <p>{session.user?.name} </p>
                  <p>{session.user?.email} </p>
                </div>
              </div>
              <Button
                text={"Sign out"}
                btnHandler={signOut}
                className="bg-white text-gray-700 border p-2 !mx-0"
              />
            </div>

            <EmailList />
          </>
        ) : (
          <>
            <div className=" bg-white rounded-md text-center ">
          <p className="text-gray-500 text-[12px] mt-2">Not signed in</p>
          <Button
            text={"Login with Google"}
            btnHandler={signIn}
            className="bg-blue-600 my-2"
          />
      </div>
          </>
        )}
      </div>
    </main>
  );
}

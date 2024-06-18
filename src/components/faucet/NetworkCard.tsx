import React from "react";
import Link from "next/link";
import { spaceAfterCapital } from "@/lib/utils";

function NetworkCard({ name }: { name: string }) {
  const network = name.substring(3).toUpperCase();
  if (network === "STYLUS") {
    return (
      <div>
        <div className=" bg-electric-blue hover:bg-[#7898aa] active:bg-[#7898aa] w-64 p-4 rounded-lg text-white font-bold text-lg tracking-wider border-4 border-white text-center">
          {spaceAfterCapital(name)} (Soon)
        </div>
      </div>
    );
  }

  return (
    <Link href={`/${name}`} className="my-5 m-5 ">
      <div className=" bg-electric-blue hover:bg-[#12a8ffe7] active:bg-[#0E8AD1] w-64 p-4 rounded-lg text-white font-bold text-lg tracking-wider border-4 border-white text-center">
        {spaceAfterCapital(name)}
      </div>
    </Link>
  );
}

export default NetworkCard;

import NetworkCard from "@/components/faucet/NetworkCard";
import { Me } from "@/components/me";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between">
      <div className=" text-center flex flex-col items-center">
        <h1 className="text-4xl text-center font-bold">
          Arbitrum Faucet Dripper
        </h1>
        <div className=" p-10 ">
          <NetworkCard name="arbStylus" />
          <NetworkCard name="arbSepolia" />
        </div>
      </div>
    </main>
  );
}

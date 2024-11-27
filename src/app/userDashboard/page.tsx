"use client";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DataTableColumn from "@/components/dashboard/dataTable";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

import { WASTE_CONTRACT_ABI } from "@/abi/wasteContractAbi";
import UserGradesTable from "@/components/dashboard/userDataTable";
import { WASTE_CONTRACT_ADDRESS } from "@/constants";
import { useGetRole } from "@/hooks/use-get-role";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useRouter } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import { IRequest } from "../dashboard/page";

ChartJS.register(ArcElement, Tooltip, Legend);

const page =  () => {
	const { data: role, isLoading:roleLoading } = useGetRole();
	const router = useRouter();
	const account = useAccount();
	const { data:user, isLoading:userLoaading, isError:isUserError, error:userError } = useReadContract({
		abi: WASTE_CONTRACT_ABI,
		address: WASTE_CONTRACT_ADDRESS	 as `0x${string}`,
		functionName: "getUser",
		args: [account.address as `0x${string}`],
	  });
	const { data:requests, isLoading, isError, error, } = useReadContract({
		abi: WASTE_CONTRACT_ABI,
		address: WASTE_CONTRACT_ADDRESS	 as `0x${string}`,
		functionName: "getAllUserRequests",
		args: [account.address as `0x${string}`],

	  });
	
	
	
	useEffect(() => {
		if (role) {
		  if (role[0] !== "User") router.push("/");
	
	
		}
	  }, [role]);
	  if(!account.address) return <div className="w-full h-screen flex items-center justify-center">
	  <w3m-connect-button/>
	 </div>
	  if(roleLoading || userLoaading || isLoading ) return (
		<div className="w-full h-screen flex items-center justify-center">
		  <Loader2 className="animate-spin h-10 w-10" />
		</div>
	  );
	//   const activeRequests =
	//   requests?.filter((request) => request.status === 1) ?? [];
	// const pendingRequests =
	//   requests?.filter((request) => request.status === 0) ?? [];
	// const rejectedRequests =
	//   requests?.filter((request) => request.status === 2) ?? [];
	// const acceptedRequests =
	//   requests?.filter((request) => request.isAccepted) ?? [];
	// const data = {
	//   labels: ["Accepted", "Pending", "Rejected"],
	//   datasets: [
	// 	{
	// 	  label: "Waste Status",
	// 	  data: [
	// 		acceptedRequests.length,
	// 		pendingRequests.length,
	// 		rejectedRequests.length,
	// 	  ],
	// 	  backgroundColor: ["#37D837", "#F3FF0E", "#FF0E0E"],
	// 	  hoverOffset: 4,
	// 	},
	//   ],
	// };
	  


	



	return (
		<div className="pb-5 px-10">
			<div className="flex w-full justify-between">
				<h1 className="text-4xl text-[#285528]">Overview</h1>
				<Image
					src="/filter.svg"
					alt="overview"
					width={20}
					height={20}
				/>
			</div>

			<div className="grid grid-cols-3 gap-4 mt-4">
				<DashboardCard
					description="Total Waste Submitted"
					title={`${user?.totalWasteSubmited} kg`}
					image="/processed.svg"
					percent="29"
				/>
				<DashboardCard
					description="Reward Balances"
					title={`$${user?.totalReward}`}
					image="/revenue.svg"
					percent="59"
				/>
				<DashboardCard
					description="Eco-market purchases"
					title="10"
					image="/profile-2green.svg"
					percent="100"
				/>
			</div>

			<div className="grid grid-cols-5 gap-6 mt-8">
				<div className="col-span-3">
					<div className="flex w-full justify-between">
						<h1 className="text-xl ">Request</h1>
						<Image
							src="/filter.svg"
							alt="overview"
							width={25}
							height={25}
						/>
					</div>
					<DataTableColumn requests={requests as IRequest[]} />
				</div>
				<div className="col-span-2 mt-5">
					<div className="flex w-full justify-between pb-5">
						<h1 className="text-xl ">Leaderboard</h1>
						<Image
							src="/filter.svg"
							alt="overview"
							width={20}
							height={20}
						/>
					</div>
					<UserGradesTable/>
					
				</div>
			</div>
		</div>
	);
};

export default page;

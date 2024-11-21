import React from "react";
import Image from "next/image";
import RequestDataTable from "@/components/dashboard/requestTable";

const page = () => {
	return (
		<div className="px-10">
			<div className="flex items-center justify-between w-full">
				<h1 className="text-3xl font-bold mb-6 text-[#228B22]">Request</h1>

				<Image
					src="/filter.svg"
					alt="filter"
					width={30}
					height={30}
				/>
			</div>

			<div>
				<RequestDataTable />
			</div>
		</div>
	);
};

export default page;

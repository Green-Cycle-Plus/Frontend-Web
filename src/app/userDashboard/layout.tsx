import Nav from "@/components/dashboard/Nav";
import UserSidebar from "@/components/dashboard/userSidebar";
import React from "react";

function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="p-4 xl:p-0 flex w-screen h-screen bg-[#F8FFF8]">
			<div className="hidden xl:block xl:w-[20%] border h-full p-5 bg-white ">
				<UserSidebar />
			</div>
			<div className="w-full h-full overflow-y-scroll ">
				<div className=" mb-10 ">
					<Nav />
				</div>
				<div className="children">{children}</div>
			</div>
		</div>
	);
}

export default Layout;

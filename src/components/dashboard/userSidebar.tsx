"use client";
import Image from "next/image";
import { Londrina_Solid } from "next/font/google";

// import { Input } from "../ui/input";
// import { ChevronsUpDown, PieChart, Search } from "lucide-react";
// import { Button } from "../ui/button";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { FolderOpen, Home, Messages2, NoteFavorite, Notification, Profile, Setting2, Verify } from "iconsax-react";
// import { usePRouter } from "@/config/provider";

const londrina = Londrina_Solid({
	variable: "--font-londrina",
	weight: "400",
	subsets: ["latin"],
});

const UserSidebar = () => {
	const router = usePRouter();
	const pathname = usePathname();

	const routes = useMemo(
		() => [
			{
				title: "Dashboard",
				href: "/userDashboard",
				icon: "/dashboard.svg",
			},
			{
				title: "Browse",
				href: "/userDashboard/browseUser",
				icon: "/global.svg",
			},
			{
				title: "Requests",
				href: "/userDashboard/userRequest",
				icon: "/trash.svg",
			},
			{
				title: "Rewards",
				href: "/userDashboard/rewards",
				icon: "/profile-2user.svg",
			},
			{
				title: "Profile",
				href: "/dashboard/analytics",
				icon: "/chart.svg",
			},
		],
		[]
	);

	return (
		<div>
			<h1 className={`mt-2 text-[#228B22] text-3xl font-bold text-center ${londrina.className}`}>GreenCycle</h1>
			<div className="mt-8 space-y-2">
				{routes.map(({ title, href, icon }) => (
					<div
						key={title}
						className={`flex items-center gap-4 cursor-pointer hover:bg-primary10 text-border2 px-5 py-5 rounded-lg font-semibold ${pathname === href && "!text-white bg-[#497E5D]"}`}>
						<Image
							src={icon}
							alt="icon"
							width={20}
							height={20}
							// size={20}
							// color={pathname === href ? "#693EFE" : "#717680"}
						/>
						<div
							onClick={() => router.push(href)}
							className={"cursor-pointer"}>
							{title}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default UserSidebar;

export const usePRouter = () => {
	const router = useRouter();
	router.prefetch = (href) => {
		// NProgress.start();
		router.push(href);
	};

	return router;
};

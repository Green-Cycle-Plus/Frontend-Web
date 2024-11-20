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

const Sidebar = () => {
	const router = usePRouter();
	const pathname = usePathname();

	const routes = useMemo(
		() => [
			{
				title: "Dashboard",
				href: "/dashboard",
				icon: "/dashboard.svg",
			},
			{
				title: "Offers",
				href: "/dashboard/offers",
				icon: "/offers.svg",
			},
			{
				title: "Requests",
				href: "/dashboard/verification-status",
				icon: "/trash.svg",
			},
			{
				title: "Collectors",
				href: "/dashboard/generate-zk-proof",
				icon: "/profile-2user.svg",
			},
			{
				title: "Analytics",
				href: "/dashboard/data-verification",
				icon: "/chart.svg",
			},
			{
				title: "Settings",
				href: "/dashboard/settings",
				// href: "#",
				icon: "/setting-2.svg",
			},
		],
		[]
	);

	return (
		// <div className="relative h-full">
		// 	<div className="relative h-10 w-[150px] md:w-[137px]">
		// 		<Image
		// 			src={"/images/GuardZeroLogoBlue.png"}
		// 			fill
		// 			alt="logo"
		// 			className="object-contain mr-auto"
		// 		/>
		// 	</div>
		// 	<Input
		// 		className="mt-4 rounded-lg border-[#D5D7DA]"
		// 		leftIcon={<Search color="#717680" />}
		// 		placeholder="Search"
		// 		rightIcon={
		// 			<Button
		// 				variant={"outline"}
		// 				className="bg-white text-border2 text-sm border border-border px-2 py-[1px] placeholder:text-[#717680]">
		// 				⌘ K
		// 			</Button>
		// 		}
		// 	/>
		// <div className="mt-5 space-y-2">
		// 	{routes.map(({ title, href, icon: Icon }) => (
		// 		<div
		// 			key={title}
		// 			className={`flex items-center gap-4 cursor-pointer hover:bg-primary10 text-border2 px-3 py-2 rounded-lg font-semibold ${pathname === href && "!text-primary bg-[#FAFAFA]"}`}>
		// 			<Icon
		// 				size={20}
		// 				color={pathname === href ? "#693EFE" : "#717680"}
		// 			/>
		// 			<div
		// 				onClick={() => router.push(href)}
		// 				className={"cursor-pointer"}>
		// 				{title}
		// 			</div>
		// 		</div>
		// 	))}
		// </div>
		// 	<div className="w-full border rounded-lg flex p-3 absolute bottom-0 left-0 justify-between">
		// 		<div className="flex gap-3">
		// 			<div className="bg-gray-100 rounded-full w-10 h-10 flex justify-center items-center">
		// 				<Profile
		// 					size="20"
		// 					color="#535862"
		// 				/>
		// 			</div>
		// 			<div className="">
		// 				<h1 className="font-semibold text-sm">User Name</h1>
		// 				<p className="text-[#A4A7AE] text-sm font-normal">userid</p>
		// 			</div>
		// 		</div>
		// 		<ChevronsUpDown color="#A4A7AE" />
		// 	</div>
		// </div>
		<div>
			<h1 className={`text-[#228B22] text-3xl font-bold text-center ${londrina.className}`}>GreenCycle</h1>
			<div className="mt-5 space-y-2">
				{routes.map(({ title, href, icon }) => (
					<div
						key={title}
						className={`flex items-center gap-4 cursor-pointer hover:bg-primary10 text-border2 px-3 py-2 rounded-lg font-semibold ${pathname === href && "!text-white bg-[#497E5D]"}`}>
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

export default Sidebar;

export const usePRouter = () => {
	const router = useRouter();
	router.prefetch = (href) => {
		// NProgress.start();
		router.push(href);
	};

	return router;
};

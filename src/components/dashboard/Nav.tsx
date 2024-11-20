"use client";

import { Button } from "../ui/button";

import Image from "next/image";
import { useAccount } from "wagmi";

function Nav() {
	const { isConnected } = useAccount();

	return (
		<>
			<nav className=" h-[80px] lg:h-[40px] flex items-center justify-between lg:items-center lg:justify-end border-b border-[#D4D4D4] space-x-4 py-10 px-5 bg-white">
				<Image
					src={"/notifs.svg"}
					alt="notification"
					width={30}
					height={30}
				/>
				<div className="flex">
					<Image
						src="/profile-circle.svg"
						alt="avatar"
						width={40}
						height={40}
						className="rounded-full"
					/>
					<div>
						<h3>Soloscan</h3>
						<p className="text-sm">Admin</p>
					</div>
				</div>
				{/* <Button className="rounded-full bg-[#228B22] text-white">0xl4.....4DLq</Button> */}
				{isConnected ? (
					<Button className="bg-[#228B22] text-white px-0 py-5 rounded-[24px] font-semibold text-base font-dms_sans hover:bg-green-700 transition-colors">
						<w3m-account-button balance="hide" />{" "}
					</Button>
				) : (
					<w3m-connect-button />
				)}
				{/* <div className="relative h-12 w-[150px] md:w-[197px] lg:hidden">
					<Image
						src={"/images/logo.svg"}
						fill
						alt="logo"
					/>
				</div>
				<div className="flex items-center gap-4">
					{pathname.includes("/dashboard") && (
						<div className="hidden md:block">
							<ConnectButton />
						</div>
					)}
					<div>
						{pathname.includes("/dashboard") && (
							<Button
								onClick={() => setIsOpen(!isOpen)}
								className="xl:hidden">
								<Menu />
							</Button>
						)}
					</div>
					{pathname === "/" && (
						<Link
							href="/login"
							className="text-white text-xs hover:scale-105 transition-all duration-200 ease-in-out bg-primary px-6 rounded-lg py-3">
							Get Started
						</Link>
					)}
				</div>
				<MobileSideBar
					onClose={() => setIsOpen(!isOpen)}
					isOpen={isOpen}
				/> */}
			</nav>
			{/* {pathname.includes("/dashboard") && (
				<div className="px-2.5 mb-2.5 md:hidden">
					<ConnectButton />
				</div>
			)} */}
		</>
	);
}

export default Nav;

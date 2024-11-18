"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Footer = () => {
	return (
		<footer className="relative  bg-[#497E5D] text-[#E8FFE8] flex flex-col lg:flex-row w-[95%] mx-auto p-5 lg:p-12 justify-between rounded-lg space-y-10 lg:space-y-0 mb-3">
			<div className="space-y-4 lg:pb-[200px]">
				<p className="text-2xl">Sign Up For Our Newsletter</p>
				<div className="flex items-center">
					<input
						type="text"
						name=""
						id=""
						placeholder="Email Address"
						className="p-4 w-[320px] bg-[#CFFFE1] rounded-lg rounded-r-none placeholder:text-[#437957]"
					/>
					<button className="bg-[#71BE8E] p-4 rounded-lg rounded-l-none">
						<ArrowRight className="w-10" />
					</button>
				</div>
			</div>
			<div className="flex flex-col space-y-3 pb-[50px]">
				<Link
					href={"/"}
					className="text-xl">
					Home
				</Link>
				<Link
					href={"/"}
					className="text-xl">
					Contact Us
				</Link>
				<Link
					href={"/"}
					className="text-xl">
					Blog
				</Link>
			</div>

			<Image
				src="/Greencycle.svg"
				alt="greencycle"
				width={1200}
				height={400}
				className="absolute bottom-0 left-1/2 -translate-x-1/2"
			/>
		</footer>
	);
};

export default Footer;

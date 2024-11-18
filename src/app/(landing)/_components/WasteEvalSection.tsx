"use client";
import React from "react";
import Image from "next/image";

const WasteEvalSection = () => {
	return (
		<div className="relative ">
			<section
				className="pb-[160px] px-5 lg:px-[100px]"
				style={{
					backgroundImage: "url(/swirl.svg)",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					backgroundSize: "cover",
				}}>
				{/* lg:w-[80%] */}
				<h2 className="text-[#082608] text-4xl font-semibold text-center py-10">Waste Evaluation</h2>

				<div className="grid lg:grid-cols-2 gap-14 pt-[88px]">
					<div className="relative border-2 border-[#228B22] rounded-lg bg-[#F5FFF9] flex w-full h-full items-center justify-center">
						<Image
							src="/glass.png"
							alt="glassBottle"
							width={"300"}
							height={"450"}
						/>
						<Image
							src="/recycle.svg"
							alt="recycle"
							width={"60"}
							height={"60"}
							className="absolute -bottom-5 -left-5"
						/>
					</div>
					<div className="space-y-5 mt-5 lg:mt-0">
						<div className="border border-[#228B22] rounded-lg p-5 space-y-3 bg-[#F5FFF9]">
							<h3 className="text-[#3C664C] text-3xl">Glass</h3>
							<p className="text-[#515151]">Dispose your waste to earn reward and make the environment a better place</p>
							<div className="flex text-[#515151] space-x-3">
								<p>1kg of glass</p>
								<Image
									src={"/arrowSwap.svg"}
									alt="arrow"
									width={24}
									height={24}
								/>
								<p>300 - 500 Gotokens</p>
							</div>
						</div>
						<div className="text-[#082608] text-3xl border border[#A3A3A3] rounded-lg p-5 bg-[#F5FFF9]">Plastic</div>
						<div className="text-[#082608] text-3xl border border[#A3A3A3] rounded-lg p-5 bg-[#F5FFF9]">Batteries</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default WasteEvalSection;

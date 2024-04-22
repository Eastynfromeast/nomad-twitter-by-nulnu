import { NextPage } from "next/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { cls } from "../lib/client/utils";

const Enter: NextPage = () => {
	const { register, handleSubmit } = useForm();
	const [method, setMethod] = useState<"email" | "phone">("email");
	return (
		<div className="px-5 max-w-xl mx-auto min-h-screen bg-[#F4F5F0] text-[#060504]">
			<h1 className="text-4xl font-bold pt-32 pb-8 border-transparent border-[1px] border-b-[#060504]">
				Welcome to
				<br />
				Nomad Twitter
			</h1>
			<div className="flex flex-col items-center mt-9">
				<h2 className="text-2xl font-bold py-4">Log in</h2>
				<ul className="grid grid-cols-2 w-full mb-7">
					<li className="text-center">
						<button
							onClick={() => setMethod("email")}
							className={cls(
								"inline-block mx-auto px-2 text-lg font-bold transition-all ",
								method === "email" ? "border-transparent border-[1px] border-b-[#060504]" : "text-neutral-500"
							)}
						>
							Email
						</button>
					</li>
					<li className="text-center">
						<button
							onClick={() => setMethod("phone")}
							className={cls(
								"inline-block mx-auto px-2 text-lg font-bold transition-all ",
								method === "phone" ? "border-transparent border-[1px] border-b-[#060504]" : "text-neutral-500"
							)}
						>
							Phone
						</button>
					</li>
				</ul>
				<form className="flex flex-col w-full px-5">
					<div className=" flex flex-col w-full">
						{method === "email" ? (
							<>
								<label>Email address</label>
								<input
									{...register("email", { required: true })}
									name="email"
									type="email"
									className="bg-transparent outline-none border-transparent border-[1px] border-b-[#060504] "
								/>
							</>
						) : (
							<>
								<label>Phone</label>
								<input
									{...register("phone", { required: true })}
									name="phone"
									type="number"
									className="bg-transparent outline-none border-transparent border-[1px] border-b-[#060504] "
								/>
							</>
						)}
					</div>
					<button className="block mt-7 w-full py-3 border-[1px] border-[#060504] ">Log in</button>
				</form>
			</div>
		</div>
	);
};

export default Enter;

import { UseFormRegisterReturn } from "react-hook-form";

interface IIputProps {
	label: string;
	name: string;
	kind?: "text" | "phone" | "email";
	placeholder?: string;
	type: string;
	register: UseFormRegisterReturn;
	[key: string]: any;
}

export default function Input({ label, name, kind = "text", placeholder, register, type, ...rest }: IIputProps) {
	return (
		<div className=" border-transparent border-[1px] border-b-[#060504]">
			<label className="block w-full mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">{label}</label>
			{kind === "text" ? (
				<div className="">
					<input
						id={name}
						{...register}
						{...rest}
						type={type}
						placeholder={placeholder}
						className="bg-transparent outline-none w-full invalid:border invalid:border-pink-500 invalid:text-pink-600"
					/>
				</div>
			) : null}
			{kind === "email" ? (
				<div className="">
					<input
						id={name}
						{...register}
						{...rest}
						type={type}
						placeholder={placeholder}
						className="bg-transparent outline-none w-full invalid:border invalid:border-pink-500 invalid:text-pink-600"
					/>
				</div>
			) : null}
			{kind === "phone" ? (
				<div className="flex space-x-2">
					<span>+82</span>
					<input
						id={name}
						{...register}
						{...rest}
						type={type}
						placeholder={placeholder}
						className="bg-transparent outline-none w-full invalid:border-pink-500 invalid:text-pink-600 invalid:bg-pink-50"
					/>
				</div>
			) : null}
		</div>
	);
}

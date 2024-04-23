import { UseFormRegisterReturn } from "react-hook-form";

interface IIputProps {
	label: string;
	name: string;
	kind?: "text" | "phone";
	placeholder?: string;
	type: string;
	register: UseFormRegisterReturn;
	[key: string]: any;
}

export default function Input({ label, name, kind = "text", placeholder, register, type, ...rest }: IIputProps) {
	return (
		<div className=" border-transparent border-[1px] border-b-[#060504] ">
			<label className="block w-full mb-2">{label}</label>
			{kind === "text" ? (
				<div className="">
					<input id={name} {...register} {...rest} type={type} placeholder={placeholder} className="bg-transparent outline-none w-full" />
				</div>
			) : null}
			{kind === "phone" ? (
				<div className="flex space-x-2">
					<span>+82</span>
					<input id={name} {...register} {...rest} type={type} placeholder={placeholder} className="bg-transparent outline-none w-full" />
				</div>
			) : null}
		</div>
	);
}

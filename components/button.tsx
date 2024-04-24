interface IButtonProps {
	text: string;
	[key: string]: any;
}

export default function Button({ onClick, text, ...rest }: IButtonProps) {
	return (
		<button
			{...rest}
			className="flex justify-center items-center mt-7 w-full py-3 border-[1px] border-[#060504] hover:bg-[#060504] hover:text-white focus:ring-2 focus:ring-offset-1 focus:ring-red-400 focus:outline-none transition-all"
		>
			{text}
		</button>
	);
}

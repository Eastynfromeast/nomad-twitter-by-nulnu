import Link from "next/link";
import IconPen from "./icon/IconPen";

interface IFloatingButtonProps {
	link: string;
	text: string;
	type?: string;
	[key: string]: any;
}

export default function FloatingButton({ link, text, type }: IFloatingButtonProps) {
	return (
		<div className="fixed bottom-[5%] -right-3 md:bottom-[10%] md:right-[24%] 2xl:right-[33.33%] z-50 -translate-x-1/2 -translate-y-1/2">
			<Link href={link}>
				<a className="w-16 h-16 flex justify-center items-center text-center rounded-full bg-[#060504] text-white text-sm shadow-lg  transition-transform hover:scale-90">
					{type === "write" ? <IconPen className="w-7 h-7" /> : <span className="block">{text}</span>}
				</a>
			</Link>
		</div>
	);
}

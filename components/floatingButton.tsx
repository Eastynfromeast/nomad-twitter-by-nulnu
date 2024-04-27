import Link from "next/link";

interface IFloatingButtonProps {
	link: string;
	text: string;
	[key: string]: any;
}

export default function FloatingButton({ link, text }: IFloatingButtonProps) {
	return (
		<div className="fixed bottom-[5%] -right-3 md:bottom-[10%] md:right-[24%] z-50 -translate-x-1/2 -translate-y-1/2">
			<Link href={link}>
				<a className="w-16 h-16 flex justify-center items-center text-center rounded-full bg-[#060504] text-white text-sm shadow-lg  transition-transform hover:scale-90">
					{text}
				</a>
			</Link>
		</div>
	);
}

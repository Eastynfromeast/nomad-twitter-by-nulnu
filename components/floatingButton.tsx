import Link from "next/link";

interface IFloatingButtonProps {
	link: string;
	text: string;
	[key: string]: any;
}

export default function FloatingButton({ link, text }: IFloatingButtonProps) {
	return (
		<div className="fixed bottom-[10%] -right-3 md:right-[22%] z-50 -translate-x-1/2 -translate-y-1/2">
			<Link href={link}>
				<a className="w-14 h-14 flex justify-center items-center text-center rounded-full bg-[#060504] text-white text-sm">{text}</a>
			</Link>
		</div>
	);
}

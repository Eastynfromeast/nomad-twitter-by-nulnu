import React from "react";
import { cls } from "../lib/client/utils";
import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps {
	title?: string;
	canGoBack?: boolean;
	hasTabBar?: boolean;
	children: React.ReactNode;
}

export default function Layout({ title, canGoBack, hasTabBar, children }: LayoutProps) {
	const router = useRouter();
	const onClickBack = () => {
		router.back();
	};
	return (
		<div className="max-w-xl mx-auto min-h-screen bg-[#F4F5F0] text-[#060504] overflow-hidden relative">
			<div className="w-full max-w-xl flex justify-center text-lg px-5 pt-5 ">
				{canGoBack ? (
					<button
						onClick={onClickBack}
						className="absolute inline-block align-middle font-semibold left-4 border-transparent border  text-[#060504] px-2 py-1 text-sm after:content-[''] after:w-0 after:h-[1px] after:bg-[#060504] after:transition-all hover:after:w-full"
					>
						Back
					</button>
				) : null}
				{title ? (
					<h1 className={cls("font-bold text-2xl border-b-[1px] border-[#060504] w-full pb-3", canGoBack ? "pt-6 text-center" : "pt-5")}>{title}</h1>
				) : null}
			</div>
			<div className={cls("pt-4", hasTabBar ? "pb-24" : "")}>{children}</div>
			{hasTabBar ? (
				<nav className="flex justify-between bg-[#F4F5F0] border-t-[1px] border-[#060504] p-4 fixed bottom-0 w-full max-w-xl box-border">
					<Link href="/enter">
						<a className="font-bold">Log In</a>
					</Link>
					<Link href="/">
						<a className="font-bold">Home</a>
					</Link>
					<Link href="/profile">
						<a className="font-bold">Profile</a>
					</Link>
				</nav>
			) : null}
		</div>
	);
}

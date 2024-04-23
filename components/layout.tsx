import React from "react";
import { cls } from "../lib/client/utils";
import Link from "next/link";

interface LayoutProps {
	title?: string;
	canGoBack?: boolean;
	hasTabBar?: boolean;
	children: React.ReactNode;
}

export default function Layout({ title, canGoBack, hasTabBar, children }: LayoutProps) {
	return (
		<div className="max-w-xl mx-auto min-h-screen bg-[#F4F5F0] text-[#060504] overflow-hidden">
			<div className="w-full max-w-xl flex justify-center text-lg px-5 pt-5 ">
				{canGoBack ? <button className="absolute left-4 bg-[#060504] text-[#f4f5f0] rounded-full p-3">Go back</button> : null}
				{title ? <h1 className="font-bold text-2xl border-b-[1px] border-[#060504] w-full pt-5 pb-3">{title}</h1> : null}
			</div>
			<div className={cls("pt-6", hasTabBar ? "pb-24" : "")}>{children}</div>
			{hasTabBar ? (
				<nav className="flex justify-between bg-[#F4F5F0] border-t-[1px] border-[#060504] p-4 fixed bottom-0 w-full max-w-xl">
					<Link href="#none">
						<a className="font-bold">Log out</a>
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

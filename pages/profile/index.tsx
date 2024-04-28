import type { NextPage } from "next";
import Layout from "../../components/layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import useSWR from "swr";
import IconPen from "../../components/icon/IconPen";
import TweetItem from "../../components/tweet";
import { TweetWithUser } from "../tweets/[id]";
import { User } from "@prisma/client";

const Profile: NextPage = () => {
	const { data } = useSWR("/api/users/profile");
	console.log(data);
	const [signInMethod, setSignInMethod] = useState<"email" | "phone">("email");

	useEffect(() => {
		if (data && data.userProfile.phone !== null) {
			setSignInMethod("phone");
		}
	}, [data]);

	return (
		<Layout title="My Profile" hasTabBar>
			<Head>
				<title>Profile</title>
			</Head>
			<div className="flex items-center space-x-5">
				<div className="w-full h-40 pt-4 flex items-start space-x-5 border border-b-[#060504] border-dashed border-transparent">
					<div className="w-24 h-24 rounded-lg drop-shadow-md empty" />
					<div className="*:w-full">
						<div className="flex flex-col *:w-full">
							<h6 className="font-bold text-base mb-1">{data?.userProfile.name}</h6>
							{signInMethod === "email" ? (
								<p className="text-[14px] text-gray-400 font-medium">{data?.userProfile.email}</p>
							) : (
								<p className="text-[14px]">{data?.userProfile.phone}</p>
							)}
						</div>
						<div className="flex items-center space-x-4 mt-2">
							<div className="flex items-center py-1 text-neutral-600">
								<IconPen className=" w-4 h-4 mr-1" />
								<span className="inline-block leading-none text-base self-center">{data?.userProfile._count.tweets}</span>
							</div>
							<div className="flex items-center py-1 text-neutral-600">
								<svg
									className="flex-initial w-4 h-4 mr-1"
									fill="none"
									strokeWidth={1.5}
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
									/>
								</svg>
								<span className="inline-block leading-none text-base self-center">{data?.userProfile._count.favs}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			{data?.usersTweets &&
				data?.usersTweets.map((tweet: TweetWithUser) => (
					<TweetItem
						key={tweet.id}
						userName={tweet?.user?.name ? tweet.user.name : "Anonymous"}
						id={tweet.id}
						createdAt={tweet.createdAt}
						hearts={tweet?._count?.favs}
						contents={tweet.context}
					/>
				))}
		</Layout>
	);
};

export default Profile;

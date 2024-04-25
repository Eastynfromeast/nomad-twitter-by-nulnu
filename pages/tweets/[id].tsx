import type { NextPage } from "next";
import Layout from "../../components/layout";
import Head from "next/head";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import { Tweet, User } from "@prisma/client";
import { cls } from "../../lib/client/utils";
import useMutation from "../../lib/client/useMutation";

interface TweetWithUser extends Tweet {
	user: User;
}
interface ITweetDataResponse {
	ok: boolean;
	tweet: TweetWithUser;
	relatedTweets: Tweet[];
	isLiked: boolean;
}
const TweetPage: NextPage = () => {
	const router = useRouter();
	const { data, mutate, isValidating } = useSWR<ITweetDataResponse>(router.query.id ? `/api/tweets/${router.query.id}` : null);
	const [createdDate, setCreatedDate] = useState("");
	const changeDateFormat = (createdAt: Date) => {
		const date = new Date(createdAt);
		let formattedDate = date.toLocaleDateString("en-Us", { month: "short", day: "2-digit" });
		return formattedDate;
	};

	const [toggleFav] = useMutation(`/api/tweets/${router.query.id}/fav`);
	const onFavClick = () => {
		if (!data) return;
		mutate(prev => prev && { ...prev, isLiked: !prev.isLiked }, false);
		toggleFav({});
	};
	useEffect(() => {
		console.log(data);
		if (data) setCreatedDate(() => changeDateFormat(data?.tweet?.createdAt));
	}, [data]);

	return (
		<Layout canGoBack hasTabBar title="Tweets!">
			<Head>
				<title>Tweets</title>
			</Head>
			<div className="px-5">
				{isValidating ? <Loading text="We are calling..." /> : null}
				{data?.tweet !== null ? (
					<div className="flex justify-between space-x-3 min-h-[160px] border-b-[1px] border-[#060504] border-dashed relative">
						<div className="w-14 h-14  border border-[#060504] border-dashed" />
						<div className="w-[90%] *:w-full">
							<div className="flex justify-between">
								<h6 className="font-bold">{data?.tweet?.user.name}</h6>
								<p>{createdDate}</p>
							</div>
							<div>
								<p>{data?.tweet?.context}</p>
							</div>
							<div className="flex space-x-2 items-end justify-end absolute right-0 bottom-4">
								<button
									onClick={onFavClick}
									className={cls(
										"flex items-stretch transition-colors",
										data?.isLiked ? "text-rose-600 hover:text-rose-400" : " text-neutral-600 hover:text-neutral-400"
									)}
								>
									<svg
										className="w-5 h-5 mr-1"
										fill={data?.isLiked ? "currentColor" : "none"}
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
								</button>
							</div>
						</div>
					</div>
				) : (
					<Loading text="there was no tweet you are looking for... " />
				)}
			</div>
		</Layout>
	);
};

export default TweetPage;

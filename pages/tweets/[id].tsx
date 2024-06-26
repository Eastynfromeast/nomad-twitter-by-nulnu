import type { NextPage } from "next";
import Layout from "../../components/layout";
import Head from "next/head";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Tweet, User } from "@prisma/client";
import { cls } from "../../lib/client/utils";
import useMutation from "../../lib/client/useMutation";
import TweetItem from "../../components/tweet";
import SkeletonTweet from "../../components/skeletonTweet";

export interface TweetWithUser extends Tweet {
	user: User;
	_count: {
		favs: number;
	};
}
interface ITweetDataResponse {
	ok: boolean;
	tweet: TweetWithUser;
	relatedTweets: TweetWithUser[];
	isLiked: boolean;
}
const TweetPage: NextPage = () => {
	const router = useRouter();
	const { data, mutate } = useSWR<ITweetDataResponse>(router.query.id ? `/api/tweets/${router.query.id}` : null);
	const [isLiked, setIsLiked] = useState(data?.isLiked);
	const [likedNum, setLikedNum] = useState(data?.tweet?._count?.favs);
	const [createdDate, setCreatedDate] = useState("");
	const changeDateFormat = (createdAt: Date) => {
		const date = new Date(createdAt);
		let formattedDate = date.toLocaleDateString("en-Us", { month: "short", day: "2-digit" });
		return formattedDate;
	};

	const [toggleFav] = useMutation(`/api/tweets/${router.query.id}/fav`);
	const onFavClick = () => {
		if (!data) return;
		setIsLiked(!isLiked);
		mutate(
			prev =>
				prev && {
					...prev,
					isLiked: !prev.isLiked,
					tweet: {
						...prev.tweet,
						_count: {
							...prev.tweet._count,
							favs: isLiked ? likedNum - 1 : likedNum + 1,
						},
					},
				},
			false
		);
		setLikedNum(prev => prev + (isLiked ? -1 : 1));
		toggleFav({});
	};
	useEffect(() => {
		console.log(data);
		if (data) {
			setCreatedDate(() => changeDateFormat(data?.tweet?.createdAt));
			setLikedNum(data?.tweet?._count?.favs);
		}
	}, [data]);

	return (
		<Layout canGoBack hasTabBar title="Tweets!">
			<Head>
				<title>Tweets</title>
			</Head>
			<div>
				{/* {isValidating ? <Loading text="We are calling..." /> : null} */}
				{data?.tweet !== null ? (
					<div className="flex justify-between space-x-3 min-h-[160px] border-b-[1px] border-[#060504] border-dashed relative">
						<div className={cls("profile_img", data?.tweet?.user.avatar !== null ? "" : "empty")}>
							{data?.tweet?.user.avatar !== null ? <img src={data?.tweet?.user.avatar} className="w-full rounded-md" /> : null}
						</div>
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
									<span>{likedNum}</span>
								</button>
							</div>
						</div>
					</div>
				) : (
					<SkeletonTweet />
				)}
				<div className="mt-6">
					<h2 className="text-lg font-semibold pb-4">Maybe you will like this post too...</h2>
					<div className="flex flex-col">
						{data?.relatedTweets && data?.relatedTweets.length > 0 ? (
							data?.relatedTweets?.map((tweet: TweetWithUser) => (
								<TweetItem
									key={tweet.id}
									userName={tweet.user.name ? tweet.user.name : "Anonymous"}
									id={tweet.id}
									createdAt={tweet.createdAt}
									hearts={tweet?._count?.favs}
									contents={tweet.context}
									userAvatar={tweet?.user.avatar ? tweet?.user.avatar : ""}
								/>
							))
						) : (
							<p className="text-center text-neutral-400 font-medium text-lg py-2">There is no related tweet :(</p>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default TweetPage;

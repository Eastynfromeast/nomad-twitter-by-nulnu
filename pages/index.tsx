import { NextPage } from "next/types";
import React, { useEffect } from "react";
import Layout from "../components/layout";
import Head from "next/head";
import TweetItem from "../components/tweet";
import FloatingButton from "../components/floatingButton";
import useUser from "../lib/client/useUser";
import { useRouter } from "next/router";
import Loading from "../components/loading";
import useSWR from "swr";
import { Tweet } from "@prisma/client";
import { TweetWithUser } from "./tweets/[id]";

interface ITweetDataResponse {
	ok: boolean;
	tweets: TweetWithUser[];
}

const Home: NextPage = () => {
	const { user, isLoading } = useUser();
	const { data } = useSWR<ITweetDataResponse>("/api/tweets");
	console.log(data);
	const router = useRouter();
	useEffect(() => {
		if (user === null) {
			alert("You need to login first");
			router.push("/enter");
		}
	}, [user]);
	return (
		<Layout title={isLoading ? "Nulnu Twitter" : "What's going on?"} hasTabBar>
			<Head>
				<title>Home</title>
			</Head>
			{isLoading ? (
				<Loading text="checking login status" />
			) : (
				<>
					<div className="flex flex-col space-y-5  px-5">
						{data?.tweets.map(tweet => (
							<TweetItem
								key={tweet.id}
								userName={tweet?.user?.name ? tweet.user.name : "Anonymous"}
								id={tweet.id}
								createdAt={tweet.createdAt}
								hearts={tweet._count.favs}
								contents={tweet.context}
							/>
						))}
					</div>
					<FloatingButton text="write" link="/tweets/write" />
				</>
			)}
		</Layout>
	);
};

export default Home;

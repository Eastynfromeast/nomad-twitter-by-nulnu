import type { NextPage } from "next";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import Head from "next/head";
import useSWR from "swr";
import TweetItem from "../components/tweet";
import FloatingButton from "../components/floatingButton";
import useUser from "../lib/client/useUser";
import Loading from "../components/loading";
import { TweetWithUser } from "./tweets/[id]";

interface ITweetDataResponse {
	ok: boolean;
	tweets: TweetWithUser[];
}

const Home: NextPage = () => {
	const { user, isLoading } = useUser();
	const { data } = useSWR<ITweetDataResponse>("/api/tweets");
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
			{isLoading ? <Loading text="checking login status" /> : null}
			<div className="flex flex-col">
				{data?.tweets?.map(tweet => (
					<TweetItem
						key={tweet.id}
						userName={tweet?.user?.name ? tweet.user.name : "Anonymous"}
						id={tweet.id}
						createdAt={tweet.createdAt}
						hearts={tweet._count.favs}
						contents={tweet.context}
						userAvatar={tweet?.user.avatar ? tweet?.user.avatar : ""}
					/>
				))}
			</div>
			<FloatingButton text="Write" type="write" link="/tweets/write" />
		</Layout>
	);
};

export default Home;

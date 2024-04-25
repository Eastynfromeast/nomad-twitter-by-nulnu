import { NextPage } from "next/types";
import React, { useEffect } from "react";
import Layout from "../components/layout";
import Head from "next/head";
import Tweet from "../components/tweet";
import FloatingButton from "../components/floatingButton";
import useUser from "../lib/client/useUser";
import { useRouter } from "next/router";
import Loading from "../components/loading";

const Home: NextPage = () => {
	const { user, isLoading } = useUser();
	const router = useRouter();
	console.log(user);
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
						{[1, 2, 3, 4, 5, 6].map((_, i) => (
							<Tweet key={i} userId="userId" id={i} createdAt="Apr 22" hearts={10} contents={`${i}. text text text text`} />
						))}
					</div>
					<FloatingButton text="write" link="/tweets/write" />
				</>
			)}
		</Layout>
	);
};

export default Home;

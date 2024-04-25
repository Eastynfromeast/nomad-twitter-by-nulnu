import { NextPage } from "next/types";
import React from "react";
import Layout from "../components/layout";
import Head from "next/head";
import Tweet from "../components/tweet";
import FloatingButton from "../components/floatingButton";

const Home: NextPage = () => {
	return (
		<Layout title="What's going on?" hasTabBar>
			<Head>
				<title>Home</title>
			</Head>
			<div className="flex flex-col space-y-5  px-5">
				{[1, 2, 3, 4, 5, 6].map((_, i) => (
					<Tweet key={i} userId="userId" id={i} createdAt="Apr 22" hearts={10} contents={`${i}. text text text text`} />
				))}
			</div>
			<FloatingButton text="write" link="/tweets/write" />
		</Layout>
	);
};

export default Home;

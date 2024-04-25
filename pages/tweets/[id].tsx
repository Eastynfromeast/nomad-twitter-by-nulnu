import type { NextPage } from "next";
import Layout from "../../components/layout";
import Head from "next/head";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";

const TweetPage: NextPage = () => {
	const router = useRouter();
	console.log(router.query.id);
	const { data, isLoading } = useSWR(router.query.id ? `/api/tweets/${router.query.id}` : null);
	useEffect(() => {
		console.log(data);
	}, [data]);
	return (
		<Layout canGoBack title="Tweets!">
			<Head>
				<title>Tweets</title>
			</Head>
		</Layout>
	);
};

export default TweetPage;

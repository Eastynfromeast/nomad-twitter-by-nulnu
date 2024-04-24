import type { NextPage } from "next";
import Layout from "../../components/layout";
import Head from "next/head";

const TweetPage: NextPage = () => {
	return (
		<Layout canGoBack title="Tweets!">
			<Head>
				<title>Tweets</title>
			</Head>
		</Layout>
	);
};

export default TweetPage;

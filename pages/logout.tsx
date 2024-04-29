import Layout from "components/layout";
import Loading from "components/loading";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function Logout() {
	const router = useRouter();
	const { data } = useSWR("/api/users/logout");
	useEffect(() => {
		if (data?.ok && data?.session) {
			router.push("/");
		}
	}, [data]);
	return (
		<Layout title="Logout">
			<Head>
				<title>Log out</title>
			</Head>
			<div>
				<Loading text="Loading..." />
			</div>
		</Layout>
	);
}

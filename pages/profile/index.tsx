import type { NextPage } from "next";
import Layout from "../../components/layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import useSWR from "swr";

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
			<div className="flex flex-col justify-center items-center space-y-4">
				<div className=" w-24 h-24 drop-shadow-md empty" />
				<div className=" w-full flex flex-col justify-center items-center text-center border border-transparent border-t-[#060504] border-dashed ">
					<h3 className="text-lg font-bold text-left w-full p-2">User Information</h3>
					<ul>
						<li>
							<h3 className="font-semibold"> {data?.userProfile.name}</h3>
						</li>
						{signInMethod === "email" ? <li>{data?.userProfile.email}</li> : <li>{data?.userProfile.phone}</li>}
					</ul>
				</div>
			</div>
		</Layout>
	);
};

export default Profile;

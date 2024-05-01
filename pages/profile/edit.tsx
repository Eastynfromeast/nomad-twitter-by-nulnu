import Layout from "components/layout";
import useSWR from "swr";
import Head from "next/head";
import Input from "components/input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Button from "components/button";

export default function ProfileEdit() {
	const { data } = useSWR("/api/users/profile");
	console.log(data);
	const [signInMethod, setSignInMethod] = useState<"email" | "phone">("email");
	const { register, handleSubmit } = useForm();

	useEffect(() => {
		if (data && data.userProfile.phone !== null) {
			setSignInMethod("phone");
		}
	}, [data]);

	return (
		<Layout title="Edit profile" canGoBack>
			<Head>
				<title> Edit profile</title>
			</Head>

			<form className="flex flex-col space-y-10">
				<div className="flex flex-col space-y-4">
					<Input register={register("name", { required: true })} name="name" label="Name" type="text" value={data?.userProfile?.name} />
					<Input register={register("email", { required: true })} name="email" label="Email address" type="email" value={data?.userProfile?.email} />
					<Input
						register={register("phone", { required: true })}
						name="phone"
						label="Phone number"
						type="number"
						kind="phone"
						value={data?.userProfile?.phone}
					/>
				</div>
				<Button text="Update your profile" />
			</form>
		</Layout>
	);
}

import Layout from "components/layout";
import useSWR from "swr";
import Head from "next/head";
import Input from "components/input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Button from "components/button";
import useMutation from "lib/client/useMutation";

interface IValidProfileForm {
	id?: string;
	name?: string;
	email?: string;
	phone?: number;
}

export default function ProfileEdit() {
	const { data } = useSWR("/api/users/profile");
	console.log(data);
	const { register, handleSubmit } = useForm();
	const [updateProfile] = useMutation("/api/users/profile/update");
	const [emailRequired, setEmailRequired] = useState(true);
	const [phoneRequired, setPhoneRequired] = useState(false);

	const onValid = (data: IValidProfileForm) => {
		updateProfile(data);
	};

	useEffect(() => {
		if (data && data.userProfile.phone !== null) {
			setPhoneRequired(prev => !prev);
			setEmailRequired(prev => !prev);
		}
	}, [data]);

	return (
		<Layout title="Edit profile" canGoBack>
			<Head>
				<title> Edit profile</title>
			</Head>

			<form onSubmit={handleSubmit(onValid)} className="flex flex-col space-y-10">
				<div className="flex flex-col space-y-4">
					<Input register={register("userId", { required: true, disabled: true })} name="userId" label="User Id" type="text" value={data?.userProfile?.id} />
					<Input register={register("name", { required: true })} name="name" label="Name" type="text" value={data?.userProfile?.name} />
					<Input register={register("email", { required: emailRequired })} name="email" label="Email address" type="email" value={data?.userProfile?.email} />
					<Input
						register={register("phone", { required: phoneRequired })}
						name="phone"
						label="Phone number"
						type="number"
						kind="phone"
						value={data?.userProfile?.phone ? data?.userProfile?.phone : undefined}
					/>
				</div>
				<Button text="Update your profile" />
			</form>
		</Layout>
	);
}

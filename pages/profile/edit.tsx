import Layout from "components/layout";
import useSWR from "swr";
import Head from "next/head";
import Input from "components/input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Button from "components/button";
import useMutation from "lib/client/useMutation";

interface IValidProfileForm {
	id?: number;
	name?: string;
	email?: string;
	phone?: number;
}

export default function ProfileEdit() {
	const { data } = useSWR("/api/users/profile");

	const { register, handleSubmit } = useForm({
		defaultValues: {
			id: data?.userProfile?.id,
			name: data?.userProfile?.name,
			email: data?.userProfile?.email ? data?.userProfile?.email : undefined,
			phone: data?.userProfile?.phone ? data?.userProfile?.phone : undefined,
		},
	});
	const [updateProfile, { data: updatedProfileData, loading, error }] = useMutation("/api/users/profile/update");
	const [emailRequired, setEmailRequired] = useState(true);
	const [phoneRequired, setPhoneRequired] = useState(false);

	const onValid = (data: IValidProfileForm) => {
		if (loading) return;
		updateProfile(data);
	};

	useEffect(() => {
		if (data && data.userProfile.phone !== null) {
			setPhoneRequired(prev => !prev);
			setEmailRequired(prev => !prev);
		}
	}, [data]);

	useEffect(() => {
		if (updatedProfileData?.ok) {
			console.log(updatedProfileData);
		} else {
			console.log(error);
		}
	}, [updatedProfileData]);

	return (
		<Layout title="Edit profile" canGoBack>
			<Head>
				<title> Edit profile</title>
			</Head>

			<form onSubmit={handleSubmit(onValid)} className="flex flex-col space-y-10">
				<div className="flex flex-col space-y-4">
					<Input register={register("id", { required: true })} name="userId" label="User Id" type="number" value={data?.userProfile?.id} readOnly={true} />
					<Input register={register("name", { required: true })} name="name" label="Name" type="text" />
					<Input register={register("email", { required: emailRequired })} name="email" label="Email address" type="email" />
					<Input register={register("phone", { required: phoneRequired })} name="phone" label="Phone number" type="number" kind="phone" />
				</div>
				<Button text="Update your profile" />
			</form>
		</Layout>
	);
}

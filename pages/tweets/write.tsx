import type { NextPage } from "next";
import Layout from "../../components/layout";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import useUser from "../../lib/client/useUser";
import useMutation from "../../lib/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface IValidTweet {
	context: string;
}

const Write: NextPage = () => {
	const { user } = useUser();

	const { register, handleSubmit } = useForm<IValidTweet>();
	const [postTweet, { loading, data }] = useMutation("/api/tweets");
	const onValid = (validTweet: IValidTweet) => {
		if (loading) return;
		postTweet(validTweet);
	};
	const router = useRouter();
	useEffect(() => {
		if (data?.ok) {
			console.log(data);
			router.push(`/tweets/${data.newTweet.id}`);
		}
	}, [data]);

	return (
		<Layout canGoBack title="Write a tweet">
			<div className=" w-full px-5">
				<form onSubmit={handleSubmit(onValid)} className="w-full clear-both">
					<div className="flex space-x-4">
						<div className="w-14 h-14  border border-[#060504] border-dashed" />
						<div className="w-[85%]">
							<textarea
								{...register("context", { required: true })}
								placeholder="What is happening?"
								className="bg-transparent w-full h-32 border border-[#060504] border-dashed p-2 outline-none transition-all  focus:border-orange-500 focus:bg-white"
							/>
						</div>
					</div>
					<Button text="Post a tweet" className="btn pt-5" />
				</form>
			</div>
		</Layout>
	);
};

export default Write;

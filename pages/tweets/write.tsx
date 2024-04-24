import type { NextPage } from "next";
import Layout from "../../components/layout";
import { useForm } from "react-hook-form";

const Write: NextPage = () => {
	const { register, handleSubmit } = useForm();
	return (
		<Layout canGoBack title="Write a tweet">
			<div className="flex space-x-4 w-full px-5">
				<div className="w-14 h-14  border border-[#060504] border-dashed" />
				<form className="w-[90%] *:w-full">
					<textarea {...register("context", { required: true })} placeholder="What is happening?" className="bg-transparent w-full" />
				</form>
			</div>
		</Layout>
	);
};

export default Write;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { cls } from "../../lib/client/utils";
import Input from "../../components/input";
import Link from "next/link";
import Button from "../../components/button";
import useMutation from "../../lib/client/useMutation";
import { useRouter } from "next/router";

interface IJoinForm {
	email?: string;
	phone?: string;
}

export default function CreateAcount() {
	const [join, { loading, data, error }] = useMutation("/api/users/create-account");
	const { register, handleSubmit, reset } = useForm();
	const [method, setMethod] = useState<"email" | "phone">("email");

	const onClickEmail = () => {
		reset();
		setMethod("email");
	};
	const onClickPhone = () => {
		reset();
		setMethod("phone");
	};

	const onValid = (validForm: IJoinForm) => {
		if (loading) return;
		join(validForm);
	};

	const router = useRouter();
	useEffect(() => {
		if (data?.user !== undefined) {
			alert("Thank you for joining! We are moving to the login page");
			router.push("/enter");
		}
	}, [data]);

	return (
		<div className="px-5 max-w-xl mx-auto min-h-screen base_color">
			<h1 className="text-4xl font-bold pt-32 pb-8 border-transparent border-[1px] border-b-[#060504]">
				Come and
				<br />
				Join us!
			</h1>
			<div className="flex flex-col items-center mt-8">
				<h2 className="text-2xl font-bold pb-6 ">Create an account</h2>
				<ul className="grid grid-cols-2 w-full mb-7">
					<li className="text-center">
						<button
							onClick={onClickEmail}
							className={cls(
								"inline-block mx-auto px-2 text-lg font-bold transition-all ",
								method === "email" ? "border-transparent border-[1px] border-b-[#060504]" : "text-neutral-500"
							)}
						>
							Email
						</button>
					</li>
					<li className="text-center">
						<button
							onClick={onClickPhone}
							className={cls(
								"inline-block mx-auto px-2 text-lg font-bold transition-all ",
								method === "phone" ? "border-transparent border-[1px] border-b-[#060504]" : "text-neutral-500"
							)}
						>
							Phone
						</button>
					</li>
				</ul>
				<form onSubmit={handleSubmit(onValid)} className="flex flex-col w-full  px-5">
					<div className=" flex flex-col gap-y-4 w-full">
						<Input register={register("name", { required: true })} name="name" label="Name" type="text" placeholder="Put your name here!" />
						{method === "email" ? (
							<Input register={register("email", { required: true })} name="email" label="Email address" type="email" placeholder="Put your email address" />
						) : (
							<Input
								register={register("phone", { required: true })}
								name="phone"
								label="Phone number"
								type="number"
								kind="phone"
								placeholder="Put your phone number"
							/>
						)}
					</div>
					<Button text={loading ? "...loading" : "Join us!"} />
				</form>
				<div className="pt-7">
					<Link href="/enter">
						<a className="hover:border-b-[1px] border-[#060504] transition-all text-center">
							Already have an account? <br />
							then <span className="text-red-500">come here to log in!</span>
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}

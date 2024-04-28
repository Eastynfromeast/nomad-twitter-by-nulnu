import { NextPage } from "next/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { cls } from "../lib/client/utils";
import Link from "next/link";
import Input from "../components/input";
import useMutation from "../lib/client/useMutation";
import { useRouter } from "next/router";
import Button from "../components/button";
import useUser from "../lib/client/useUser";
import Loading from "../components/loading";

interface IEnterForm {
	email?: string;
	phone?: string;
}

interface ITokenForm {
	token: string;
}

interface IMutationResult {
	ok: boolean;
	data?: string;
}

const Enter: NextPage = () => {
	const { user: userData, isLoading } = useUser();

	const [enter, { loading, data }] = useMutation("/api/users/enter");
	const [confirmToken, { loading: tokenLoading, data: tokenData }] = useMutation<IMutationResult>("/api/users/confirm");
	const { register, handleSubmit, reset } = useForm();
	const { register: tokenRegister, handleSubmit: tokenHandleSubmit } = useForm<ITokenForm>();
	const [method, setMethod] = useState<"email" | "phone">("email");
	const router = useRouter();

	const onClickEmail = () => {
		reset();
		setMethod("email");
	};
	const onClickPhone = () => {
		reset();
		setMethod("phone");
	};

	const onValid = (validForm: IEnterForm) => {
		if (loading) return;
		enter(validForm);
	};

	const onTokenValid = (validForm: ITokenForm) => {
		if (tokenLoading) return;
		confirmToken(validForm);
	};

	useEffect(() => {
		if (userData !== undefined) {
			alert("You are already logged in!");
			router.push("/");
		}
	}, [userData]);

	useEffect(() => {
		if (data?.sendData === null) {
			alert("You don't have an account. Please join us!");
			router.push("/create-account");
		} else if (data?.sendData.payload !== undefined) {
			alert("You are token is generated! Open the console.");
			console.log(`Your token : ${data?.sendData.payload}`);
		}
	}, [data]);

	useEffect(() => {
		if (tokenData?.ok) {
			router.push("/");
			alert("Yay! We are moving to homepage!");
		}
	}, [tokenData]);

	return (
		<div className="px-5 max-w-xl mx-auto min-h-screen base_color">
			{isLoading ? (
				<Loading text="Checking login status" />
			) : (
				<>
					<h1 className="text-4xl font-bold pt-32 pb-8 border-transparent border-[1px] border-b-[#060504]">
						Welcome to
						<br />
						Nomad Twitter
					</h1>
					<div className="flex flex-col items-center mt-8">
						{data?.ok ? (
							<form onSubmit={tokenHandleSubmit(onTokenValid)} className="flex flex-col w-full px-5">
								<div className=" flex flex-col w-full">
									<Input
										register={tokenRegister("token", { required: true })}
										name="token"
										label="Confirmation token"
										type="number"
										placeholder="Put the token you got"
									/>
								</div>
								<Button text={loading ? "...loading" : "Confirm token"} />
							</form>
						) : (
							<>
								<h2 className="text-2xl font-bold pb-6">Log in</h2>
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
								<form onSubmit={handleSubmit(onValid)} className="flex flex-col w-full px-5">
									<div className=" flex flex-col w-full">
										{method === "email" ? (
											<Input
												register={register("email", { required: true })}
												name="email"
												label="Email address"
												type="email"
												placeholder="Put your email address"
											/>
										) : (
											<Input
												register={register("phone", { required: true })}
												name="phone"
												label="phone number"
												type="number"
												kind="phone"
												placeholder="Put your phone number"
											/>
										)}
									</div>
									<Button text={loading ? "...loading" : "Log in"} />
								</form>
							</>
						)}
						<div className="pt-7">
							<Link href="/create-account">
								<a className="hover:border-b-[1px] border-[#060504] transition-all">
									If you don't have an account, <span className="text-red-500">please join us!</span>
								</a>
							</Link>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Enter;

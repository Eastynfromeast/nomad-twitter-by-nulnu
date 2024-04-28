import Link from "next/link";

export interface ITweetProps {
	id: number;
	createdAt: Date;
	hearts: number;
	contents: string;
	userName: string;
	[key: string]: any;
}

export default function TweetItem({ id, userName, createdAt, hearts, contents, ...rest }: ITweetProps) {
	const changeDateFormat = (createdAt: Date) => {
		const date = new Date(createdAt);
		let formattedDate = date.toLocaleDateString("en-Us", { month: "short", day: "2-digit" });
		return formattedDate;
	};
	return (
		<Link href={`/tweets/${id}`} {...rest}>
			<a className="h-40 py-4 border-b-[1px] border-[#060504] border-dashed relative">
				<div className="flex justify-between space-x-3">
					<div className="profile_img empty" />
					<div className="w-[90%] *:w-full">
						<div className="flex justify-between">
							<h6 className="font-bold text-base">{userName}</h6>
							<p className="text-[15px]">{changeDateFormat(createdAt)}</p>
						</div>
						<div>
							<p className="text-base">{contents}</p>
						</div>
						<div className="flex space-x-2 items-end justify-end absolute right-0 bottom-4">
							<div className="flex items-center text-neutral-600">
								<svg
									className="w-4 h-4 mr-1"
									fill="none"
									strokeWidth={1.5}
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
									/>
								</svg>
								<span>{hearts}</span>
							</div>
						</div>
					</div>
				</div>
			</a>
		</Link>
	);
}

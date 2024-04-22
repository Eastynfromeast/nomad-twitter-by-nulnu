import Link from "next/link";

interface TweetProps {
	userId: string;
	id: number;
	createdAt: string;
	hearts: number;
	contents: string;
}

export default function Tweet({ userId, id, createdAt, hearts, contents }: TweetProps) {
	return (
		<Link href={`/tweets/${id}`}>
			<a className="h-40 py-2 border-b-[1px] border-[#060504] border-dashed relative">
				<div className="flex justify-between space-x-3">
					<div className="w-14 h-14  border border-[#060504] border-dashed" />
					<div className="w-[90%] *:w-full">
						<div className="flex justify-between">
							<h6 className="font-bold">{userId}</h6>
							<p>{createdAt}</p>
						</div>
						<div>
							<p>{contents}</p>
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
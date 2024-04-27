export default function SkeletonTweet() {
	return (
		<div className="flex justify-between space-x-3 min-h-[160px] border-b-[1px] border-[#060504] border-dashed relative">
			<div className="profile_img empty" />
			<div className="w-[90%] *:w-full">
				<div className="flex justify-between *:w-20 *:h-7">
					<div className="skeleton" />
					<p className="skeleton " />
				</div>
				<div>
					<div className="skeleton w-full h-28" />
				</div>
				<div className="flex space-x-2 items-end justify-end absolute right-0 bottom-4">
					<button className="flex items-stretch transition-colors text-neutral-600">
						<svg
							className="w-5 h-5 mr-1"
							fill="currentColor"
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
						<span />
					</button>
				</div>
			</div>
		</div>
	);
}

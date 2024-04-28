import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../lib/server/db";
import { withApiSession } from "../../../../lib/server/withSession";
import withHandler from "../../../../lib/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { id },
		session: { user },
	} = req;

	const tweet = await db.tweet.findUnique({
		where: {
			id: +id.toString(),
		},
		include: {
			user: {
				select: {
					id: true,
					name: true,
					avatar: true,
				},
			},
			_count: {
				select: {
					favs: true,
				},
			},
		},
	});

	const terms = tweet?.context.split(" ").map(word => ({
		context: {
			contains: word,
		},
	}));

	const relatedTweets = await db.tweet.findMany({
		where: {
			OR: terms,
			AND: {
				id: {
					not: tweet?.id,
				},
			},
		},
		include: {
			user: {
				select: {
					name: true,
					avatar: true,
				},
			},
			_count: {
				select: {
					favs: true,
				},
			},
		},
	});

	const isLiked = Boolean(
		await db.fav.findFirst({
			where: {
				tweetId: tweet?.id,
				userId: user?.id,
			},
			select: {
				id: true,
			},
		})
	);

	res.json({
		ok: true,
		tweet,
		relatedTweets,
		isLiked,
	});
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

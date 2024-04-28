import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/server/db";
import { withApiSession } from "../../../lib/server/withSession";
import withHandler from "../../../lib/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		const tweets = await db.tweet.findMany({
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
		res.json({
			ok: true,
			tweets,
		});
	}
	if (req.method === "POST") {
		const {
			body: { context },
			session: { user },
		} = req;

		const newTweet = await db.tweet.create({
			data: {
				context,
				user: {
					connect: {
						id: user?.id,
					},
				},
			},
		});

		res.json({
			ok: true,
			newTweet,
		});
	}
}

export default withApiSession(withHandler({ methods: ["GET", "POST"], handler }));

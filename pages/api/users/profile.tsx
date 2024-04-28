import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/server/db";
import { withApiSession } from "../../../lib/server/withSession";
import withHandler from "../../../lib/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	let userProfile;
	if (req.session.user) {
		userProfile = await db.user.findUnique({
			where: {
				id: req.session.user?.id,
			},
			include: {
				_count: {
					select: {
						favs: true,
						tweets: true,
					},
				},
			},
		});

		const usersTweets = await db.tweet.findMany({
			where: {
				userId: req.session.user?.id,
			},
			include: {
				user: {
					select: {
						name: true,
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
			userProfile,
			usersTweets,
		});
	} else {
		return res.status(404).end();
	}
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

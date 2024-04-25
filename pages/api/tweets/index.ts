import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/server/db";
import { withApiSession } from "../../../lib/server/withSession";
import withHandler from "../../../lib/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
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

		console.log(newTweet);

		res.json({
			ok: true,
			newTweet,
		});
	}
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

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
				},
			},
		},
	});

	res.json({
		ok: true,
		tweet,
	});
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../lib/server/db";
import { withApiSession } from "../../../../lib/server/withSession";
import withHandler from "../../../../lib/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { id },
		session: { user },
	} = req;

	const alreadyLiked = await db.fav.findFirst({
		where: {
			tweetId: +id.toString(),
			userId: user?.id,
		},
	});

	if (alreadyLiked) {
		await db.fav.delete({
			where: {
				id: alreadyLiked.id,
			},
		});
	} else {
		await db.fav.create({
			data: {
				user: {
					connect: {
						id: user?.id,
					},
				},
				tweet: {
					connect: {
						id: +id.toString(),
					},
				},
			},
		});
	}

	res.json({
		ok: true,
	});
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

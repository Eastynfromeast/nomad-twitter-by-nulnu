import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/server/db";
import { withApiSession } from "../../../lib/server/withSession";
import withHandler from "../../../lib/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const presentUser = await db.user.findUnique({
		where: {
			id: req.session.user?.id,
		},
	});

	res.json({
		ok: true,
		presentUser,
	});
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

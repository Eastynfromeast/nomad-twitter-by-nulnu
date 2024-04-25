import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/server/db";
import withHandler from "../../../lib/server/withHandler";
import { withApiSession } from "../../../lib/server/withSession";

declare module "iron-session" {
	interface IronSessionData {
		user?: {
			id: number;
		};
	}
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { token } = req.body;
	const foundToken = await db.token.findUnique({
		where: {
			payload: token,
		},
	});
	if (!foundToken) return res.status(404).end();

	req.session.user = {
		id: foundToken.userId,
	};
	await req.session.save();
	await db.token.deleteMany({
		where: {
			userId: foundToken.userId,
		},
	});

	res.json({
		ok: true,
		foundToken,
	});
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

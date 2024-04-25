import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../lib/server/withSession";
import withHandler from "../../../lib/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = req.session;
	if (session) {
		await session.destroy();
		res.setHeader("Set-Cookie", "");
		res.status(200).send("Logge out successfully");
	} else {
		res.status(400).send("No session found");
	}

	res.json({
		ok: true,
		session,
	});
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

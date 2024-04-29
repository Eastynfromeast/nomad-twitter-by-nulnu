import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../lib/server/withSession";
import withHandler from "../../../lib/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = req.session;
	if (session) {
		await session.destroy();
		res.status(200).send("Logged out successfully");
	} else {
		res.status(400).send("No session found");
	}
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

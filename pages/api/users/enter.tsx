import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../lib/server/withHandler";
import db from "../../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const { phone, email } = req.body;
	const user = phone ? { phone } : email ? { email } : null;
	if (!user) return res.status(400).json({ ok: false });

	const payload = Math.floor(100000 + Math.random() * 900000) + "";

	const findUser = await db.user.findUnique({
		where: {
			...user,
		},
	});

	return res.json({
		ok: true,
		findUser,
	});
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });

import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../lib/server/withHandler";
import db from "../../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const { phone, email } = req.body;
	const userData = phone ? { phone } : { email };
	const user = await db.user.upsert({
		where: {
			...userData,
		},
		create: {
			name: "Jane Doe",
			...userData,
		},
		update: {},
	});
	console.log(user);
	return res.json({
		ok: true,
	});
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });

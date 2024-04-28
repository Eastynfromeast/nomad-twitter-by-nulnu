import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../lib/server/withHandler";
import db from "../../../lib/server/db";
import { withApiSession } from "../../../lib/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const { phone, email, name } = req.body;
	const userData = phone ? { phone } : { email };
	const user = await db.user.upsert({
		where: {
			...userData,
		},
		create: {
			name,
			...userData,
		},
		update: {},
	});
	console.log(user);
	return res.json({
		ok: true,
		user,
	});
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

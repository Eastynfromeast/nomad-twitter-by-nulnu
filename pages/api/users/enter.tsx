import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../lib/server/withHandler";
import db from "../../../lib/server/db";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
	const { phone, email } = req.body;
	const user = phone ? { phone } : email ? { email } : null;
	if (!user) return res.status(400).json({ ok: false });

	const payload = Math.floor(100000 + Math.random() * 900000) + "";
	let token;
	const findUser = await db.user.findUnique({
		where: {
			...user,
		},
	});

	if (findUser !== null) {
		token = await db.token.create({
			data: {
				payload,
				user: {
					connect: {
						...user,
					},
				},
			},
		});
	}
	const sendData = findUser ? "Your token is generated" : findUser;
	return res.json({
		ok: true,
		sendData,
	});
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });

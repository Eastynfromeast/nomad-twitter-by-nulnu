import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../lib/server/db";
import { withApiSession } from "../../../../lib/server/withSession";
import withHandler from "../../../../lib/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id, name, email, phone } = req.body;
	// 해당 유저 id에 특정 필드가 추가되었을 때
	// 유니크한 필드 (이메일, 폰)의 경우 겹치는 경우가 있는지 확인하고 업데이트 해야

	let updateUser;
	const thisUser = await db.user.findUnique({
		where: {
			id,
		},
	});
	if (!thisUser) return res.status(400).json({ ok: false, error: "사용자를 찾을 수 없습니다." });
	if (thisUser?.email === email && thisUser?.phone === phone) {
		updateUser = await db.user.update({
			where: {
				id,
			},
			data: {
				name,
				email,
				phone,
			},
		});
	} else {
		const existingUser = await db.user.findFirst({
			where: {
				OR: [{ email }, { phone }],
			},
		});

		if (existingUser && existingUser.id !== thisUser?.id) {
			return res.status(400).json({ ok: false, error: "다른 사용자가 사용 중인 값이 존재합니다." });
		}
	}

	res.json({
		ok: true,
		// updateUser,
	});
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

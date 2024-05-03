import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../lib/server/db";
import { withApiSession } from "../../../../lib/server/withSession";
import withHandler from "../../../../lib/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id, name, email, phone } = req.body;
	// 해당 유저 id에 특정 필드가 추가되었을 때
	// 유니크한 필드 (이메일, 폰)의 경우 겹치는 경우가 있는지 확인하고 업데이트 해야
	const updateUser = await db.user.update({
		where: {
			id,
		},
		data: {
			name,
			email,
			phone,
		},
	});

	res.json({
		ok: true,
		updateUser,
	});
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

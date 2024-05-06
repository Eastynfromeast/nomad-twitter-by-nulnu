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

	if (email) {
		const findEmailUser = await db.user.findFirst({
			where: {
				email,
			},
		});
		if (findEmailUser && findEmailUser.id !== thisUser.id) {
			return res.json({ ok: false, error: "이미 사용 중인 이메일입니다." });
		}
	}

	if (phone) {
		const findPhoneUser = await db.user.findFirst({
			where: {
				phone,
			},
		});
		if (findPhoneUser && findPhoneUser.id !== thisUser.id) {
			return res.json({ ok: false, error: "이미 사용 중인 휴대폰 번호입니다." });
		}
	}

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

		res.json({
			ok: true,
			updateUser,
		});
	} else {
		const existingUser = await db.user.findFirst({
			where: {
				OR: [{ email }, { phone }],
			},
		});

		if (existingUser && existingUser.id !== thisUser?.id) {
			return res.json({ ok: false, error: "다른 사용자가 사용 중인 값이 존재합니다." });
		}
	}
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

/*
    어떻게 검증하지?
    일단 user id로 thisUser 찾아오고 
    thisUser의 비어있는 필드를 찾고?
    req.body에서 해당 필드가 있는지 확인하고? 
    뭔가 스키마 필드가 잘못된 것 같다...
    
*/

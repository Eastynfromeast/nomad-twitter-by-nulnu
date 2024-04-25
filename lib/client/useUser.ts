import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
	const { data, error } = useSWR("/api/users/me");
	const router = useRouter();
	useEffect(() => {
		if (data && data.presentUser !== null) {
			router.push("/");
		}
		if (data && !data.ok) {
			router.push("/enter");
		}
	}, [data]);
	return { user: data?.presentUser, isLoading: !data && !error };
}

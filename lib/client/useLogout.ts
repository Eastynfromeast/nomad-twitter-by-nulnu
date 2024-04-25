import useSWR from "swr";

export default function useLogout() {
	const { data, error } = useSWR("/api/users/logout");
	console.log(data);

	return { user: data?.presentUser, isLoading: !data && !error };
}

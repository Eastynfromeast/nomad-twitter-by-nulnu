import { useState } from "react";

interface IUseMutationState<T> {
	loading: boolean;
	data?: T;
	error?: object;
}

type IUseMutationResult<T> = [(data: any) => void, IUseMutationState<T>];

export default function useMutation<T = any>(url: string): IUseMutationResult<T> {
	const [state, setState] = useState<IUseMutationState<T>>({
		loading: false,
		data: undefined,
		error: undefined,
	});

	function mutation(data: any) {
		setState(prev => ({ ...prev, loading: true }));
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json().catch(() => {}))
			.then(data => setState(prev => ({ ...prev, data })))
			.catch(error => setState(prev => ({ ...prev, error })))
			.finally(() => setState(prev => ({ ...prev, loading: false })));
	}

	return [mutation, { ...state }];
}

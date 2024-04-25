interface ILoadingProps {
	text: string;
}

export default function Loading({ text }: ILoadingProps) {
	return <h2 className="text-3xl font-bold text-center py-16"> {text}</h2>;
}

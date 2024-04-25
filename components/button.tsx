interface IButtonProps {
	text: string;
	[key: string]: any;
}

export default function Button({ onClick, text, ...rest }: IButtonProps) {
	return (
		<button className="btn" {...rest}>
			{text}
		</button>
	);
}

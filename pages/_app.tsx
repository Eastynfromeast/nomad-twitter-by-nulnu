import { SWRConfig } from "swr";
import "../styles/global.css";

export default function App({ Component, pageProps }: any) {
	return (
		<SWRConfig
			value={{
				fetcher: (url: string) => fetch(url).then(response => response.json()),
			}}
		>
			<Component {...pageProps} />
		</SWRConfig>
	);
}

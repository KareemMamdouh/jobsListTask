import ProviderStore from "/store/ProviderStore";
import type { AppProps } from "next/app";
import "../styles/globals.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProviderStore>
      <Component {...pageProps} />
    </ProviderStore>
  );
}

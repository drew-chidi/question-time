import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster position="top-center"
        reverseOrder={false} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

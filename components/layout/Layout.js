import Footer from "./Footer";
import Navbar from "./Navbar";


export default function Layout({ children }) {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <main className="flex-1 flex-grow px-8 sm:px-16">{children}</main>
            <Footer />
        </div>
    )
}
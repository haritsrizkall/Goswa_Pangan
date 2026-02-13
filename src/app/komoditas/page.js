"use-client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Komoditas() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar/>

        <main className="flex-1 pt-16.75">
          <div className="text-center pt-16.75">
            <h1 className="text-[40px] font-semibold text-black">
              Harga Komoditas
            </h1>
            <p className="text-[15px] font-medium text-black pt-0.5 pb-8 px-4 md:px-0">
              Harga rata-rata dibandingkan dengan hari sebelumnya 08 Feb 2026
            </p>

            <div className="flex justify-center">
              <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 w-87.5">
                {/* Icon */}
                <svg
                  className="w-5 h-5 text-gray-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>

                {/* Input */}
                <input
                  type="text"
                  placeholder="Cari Komoditas"
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
                />

                {/* Button */}
                <button className="ml-10 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-1 rounded-full">
                  Cari
                </button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

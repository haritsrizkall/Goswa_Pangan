export default function Footer() {
  return (
    <footer className="w-full bg-neutral-primary-soft rounded-base shadow-xs border-t border-black">
      <div className="mx-auto max-w-7xl p-4 md:flex items-center justify-between">
        <span className="text-sm text-body sm:text-center text-black">
          © 2026{" "}
          <a
            href="https://flowbite.com/"
            className="hover:underline text-blue-500 font-bold"
          >
            Dinas Ketahanan Pangan Kota Palas
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-body sm:mt-0">
          <li>
            <a
              href="#"
              className="hover:underline text-black text-[15px] font-bold"
            >
              Go swa Pangan Palas.
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

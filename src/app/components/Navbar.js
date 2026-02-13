"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Beranda", href: "/" },
    { name: "Komoditas", href: "/komoditas" },
    { name: "Pasar", href: "/pasar" },
    { name: "Statistik", href: "/statistik" },
  ];

  return (
    <Disclosure as="nav" className="bg-white fixed w-full z-20 top-0 shadow-sm">
      {({ open }) => (
        <>
          <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-3">
            {/* ✅ LOGO */}
            <div className="flex shrink-0 items-center">
              <Link href="/">
                <Image
                  alt="GoSwa Pangan Palas"
                  src="/images/logo.png"
                  width={40}
                  height={0}
                  className="h-10"
                />
              </Link>
            </div>

            {/* ✅ RIGHT SIDE (Desktop Button + Mobile Toggle) */}
            <div className="flex items-center md:order-2 space-x-3">
              {/* Desktop Button */}
              <button className="hidden md:block bg-transparent hover:bg-amber-600 text-gray-600 hover:text-white font-medium text-sm py-2 px-6 rounded-3xl outline-1 outline-amber-500 transition">
                Hubungi Kami
              </button>

              {/* Mobile Toggle Button */}
              <DisclosureButton className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-600 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none">
                {open ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </DisclosureButton>
            </div>

            {/* ✅ DESKTOP MENU */}
            <div className="hidden md:flex md:items-center md:w-auto md:order-1">
              <ul className="flex flex-row space-x-8 font-medium">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={`px-2 py-1 transition ${
                          isActive
                            ? "text-white font-semibold border-2 rounded-[10px] px-3 py-2 bg-amber-600 hover:bg-amber-500"
                            : "text-gray-500 hover:bg-white/5 hover:text-black"
                        }`}
                      >
                        {item.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* ✅ MOBILE PANEL */}
          <DisclosurePanel className="md:hidden border-t">
            <div className="flex flex-col p-4 space-y-3 bg-white">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100"
                >
                  {item.name}
                </DisclosureButton>
              ))}

              {/* Mobile Hubungi Kami */}
              <button className="w-full mt-2 bg-amber-600 text-white py-2 rounded-3xl font-medium">
                Hubungi Kami
              </button>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

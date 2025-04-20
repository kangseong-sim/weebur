"use client";
import SearchBar from "@/app/products/_components/SearchBar";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between h-full bg-white border-b">
      <div className="cus-container py-5 mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center h-full sm:h-[48px] sm:justify-between">
          <div className="flex gap-15 sm:mb-0 mb-4">
            <Link href={"/"}>
              <Image
                src="https://cdn.weebur.com/assets/bi/logo.svg"
                alt="Logo"
                width={123}
                height={23}
                className="sm:w-[123px] sm:h-[23px] w-[95px] h-[20px]"
                priority={true}
                loading="eager"
              />
            </Link>
            <Link href={"/products"} className="text- sm:text-md font-semibold">
              상품
            </Link>
          </div>
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

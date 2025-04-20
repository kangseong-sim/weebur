"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    newParams.set("q", search);
    router.push(`/products?${newParams.toString()}`);
  };

  const handleClear = () => {
    setSearch("");
  };

  useEffect(() => {
    if (searchParams.get("q")) {
      setSearch(searchParams.get("q") || "");
    } else {
      setSearch("");
    }
  }, [pathname, searchParams]);

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-2 sm:flex-row"
    >
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="검색어를 입력해주세요."
          size={46}
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-5 py-2 border rounded-lg"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      {search && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute top-1.5 right-2 sm:right-[20%]  w-6 h-6 bg-[url('/icons/clear.svg')] bg-no-repeat bg-center bg-contain"
          aria-label="닫기"
        ></button>
      )}
      <Button
        type="submit"
        className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        검색
      </Button>
    </form>
  );
};

export default SearchBar;

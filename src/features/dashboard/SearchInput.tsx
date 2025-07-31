"use client";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SearchInputProps {
  keySearch: string;
  currentPathname: string;
}

const SearchInput = ({ keySearch, currentPathname }: SearchInputProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get(keySearch) || "";

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: keySearch,
          value: searchQuery
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === currentPathname) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: [keySearch]
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchParams, searchQuery, router, pathname, keySearch, currentPathname]);

  return (
    <div className="relative">
      <Input
        className="w-[264px] h-9 pl-9 bg-white"
        placeholder="キーワードで検索"
        type="search"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <Search
        className="text-text absolute left-2.5 top-1/2 -translate-y-1/2"
        size={20}
      />
    </div>
  );
};

export default SearchInput;

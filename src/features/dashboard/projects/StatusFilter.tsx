"use client";

import { Badge } from "@/components/ui/badge";
import { filterOptions } from "@/constants";
import { cn } from "@/lib/utils";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface StatusFilterProps {
  keySearch: string;
  currentPathname: string;
}

const StatusFilter = ({ keySearch, currentPathname }: StatusFilterProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get(keySearch) || "";

  const handleFilter = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = e.currentTarget.getAttribute("data-value");
    if (value) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: keySearch,
        value
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
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (filter) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: keySearch,
          value: filter
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
  }, [searchParams, filter, router, pathname, keySearch, currentPathname]);

  return (
    <div className="flex items-center gap-1">
      {filterOptions.map((option, index) => (
        <Badge
          key={index}
          className={cn(
            "rounded-full cursor-pointer small-text px-2.5 hover:bg-green-main hover:text-white",
            {
              "bg-transparent text-text": filter !== option.value,
              "bg-green-main text-white": filter === option.value
            }
          )}
          data-value={option.value}
          onClick={handleFilter}
        >
          {option.label}
        </Badge>
      ))}
    </div>
  );
};

export default StatusFilter;

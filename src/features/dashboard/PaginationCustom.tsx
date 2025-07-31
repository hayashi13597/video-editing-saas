import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { routesApp } from "@/constants/routesApp";
import { cn } from "@/lib/utils";

interface PaginationCustomProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (_page: number) => void;
}

const PaginationCustom: React.FC<PaginationCustomProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      ];
    }
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages
    ];
  };

  const pages = getPages();

  return (
    <Pagination className="bg-white w-fit rounded-6 p-1 mt-[60px]">
      <PaginationContent className="gap-1">
        <PaginationItem className="w-full aspect-square flex-center">
          <PaginationPrevious
            href="#"
            className={cn(
              "body-text [&_span]:hidden hover:text-white hover:opacity-100",
              {
                "opacity-50 hover:text-black hover:bg-transparent cursor-default hover:opacity-50":
                  currentPage === 1
              }
            )}
            aria-disabled={currentPage === 1}
            onClick={e => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>
        {pages.map((page, idx) => (
          <PaginationItem
            key={idx}
            className="w-full aspect-square flex-center"
          >
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={routesApp.projects + `?page=${page}`}
                isActive={page === currentPage}
                className={cn("hover:text-white border-none body-text", {
                  "text-white bg-green-main": page === currentPage
                })}
                onClick={e => {
                  e.preventDefault();
                  if (page !== currentPage && typeof page === "number")
                    onPageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem className="w-full aspect-square flex-center">
          <PaginationNext
            href="#"
            className={cn(
              "body-text [&_span]:hidden hover:text-white hover:opacity-100",
              {
                "opacity-50 hover:text-black hover:bg-transparent cursor-default hover:opacity-50":
                  currentPage === totalPages
              }
            )}
            aria-disabled={currentPage === totalPages}
            onClick={e => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationCustom;

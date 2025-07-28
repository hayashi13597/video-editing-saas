import { Input } from "@/components/ui/input"
import { ChevronDown, ListFilter, Search } from "lucide-react"

const FilterComponent = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Input
          className="w-[264px] pl-9"
          placeholder="キーワードで検索"
          type="search"
        />
        <Search className="text-text absolute left-2.5 top-1/2 -translate-y-1/2" size={20} />
      </div>

      <div className="border border-stroke rounded-6 p-2.5 flex-center gap-2">
        <ListFilter />
        <span className="text-sm leading-normal">Filter</span>
        <ChevronDown className="text-text" size={16} />
      </div>
    </div>
  )
}

export default FilterComponent
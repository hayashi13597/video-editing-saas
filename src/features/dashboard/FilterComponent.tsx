import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ListFilter, Plus, Search } from "lucide-react"

const FilterComponent = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Input
          className="w-[264px] h-9 pl-9"
          placeholder="キーワードで検索"
          type="search"
        />
        <Search className="text-text absolute left-2.5 top-1/2 -translate-y-1/2" size={20} />
      </div>

      <div className="h-9 border border-stroke rounded-6 px-2.5 flex-center gap-2 cursor-pointer">
        <ListFilter />
        <span className="text-sm leading-normal">Filter</span>
        <ChevronDown className="text-text" size={16} />
      </div>
      <Button className="button-text cursor-pointer">
        <Plus className="text-white" size={20} />
        新規案件追加
      </Button>
    </div>
  )
}

export default FilterComponent
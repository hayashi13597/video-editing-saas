import FilterComponent from "@/features/dashboard/FilterComponent"
import Table, { defaultColumns } from "./Table"
import { dummyDashboardTableData } from "@/constants"

const TaskCard = () => {
  return (
    <div className="space-y-5">
      <div className="flex-between">
        <h3 className="h3-title">募集中のタスク</h3>

        <FilterComponent />
      </div>

      <Table data={dummyDashboardTableData} columns={defaultColumns} />
    </div>
  )
}

export default TaskCard
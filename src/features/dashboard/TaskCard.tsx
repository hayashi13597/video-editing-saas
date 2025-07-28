import FilterComponent from "@/features/dashboard/FilterComponent"

const TaskCard = () => {
  return (
    <div className="space-y-5">
      <div className="flex-between">
        <h3 className="h3-title">募集中のタスク</h3>

        <FilterComponent />
      </div>
    </div>
  )
}

export default TaskCard
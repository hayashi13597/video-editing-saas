import { Badge } from '@/components/ui/badge'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Grip4 from '../../../public/icons/grip-4.svg';
import { cn } from '@/lib/utils';

// Define all possible field types
export type FieldType = 'status' | 'title' | 'applicant' | 'requestDate' | 'deadline' | 'points' | 'action'

// Define column configuration
export interface ColumnConfig {
  key: FieldType
  label: string
  colSpan: number
  className?: string
}

// Define row data structure
export interface TableRowData {
  id: string
  status?: {
    label: string
    variant?: string
  }
  title?: string
  applicant?: string
  requestDate?: string
  deadline?: string
  points?: string
  href?: string
}

// Table props interface
export interface TableProps {
  columns: ColumnConfig[]
  data: TableRowData[]
  showChevron?: boolean
}

// Default column configurations
export const defaultColumns: ColumnConfig[] = [
  { key: 'status', label: 'ステータス', colSpan: 1 },
  { key: 'title', label: '企業紹介動画', colSpan: 3 },
  { key: 'applicant', label: '応募者', colSpan: 1 },
  { key: 'requestDate', label: '依頼日', colSpan: 1 },
  { key: 'deadline', label: '納期', colSpan: 1 },
  { key: 'points', label: 'ポイント', colSpan: 1 },
  { key: 'action', label: '', colSpan: 1 }
]

// Render cell content based on field type
const renderCellContent = (field: FieldType, data: TableRowData, showChevron: boolean = true) => {
  switch (field) {
    case 'status':
      return data.status ? (
        <Badge className="rounded-full bg-badge text-white">
          {data.status.label}
        </Badge>
      ) : null

    case 'title':
      return data.title ? (
        <p className="body-text line-clamp-1">{data.title}</p>
      ) : null

    case 'applicant':
      return data.applicant ? (
        <p className="body-text line-clamp-1">{data.applicant}</p>
      ) : null

    case 'requestDate':
      return data.requestDate ? (
        <p className="body-text line-clamp-1">{data.requestDate}</p>
      ) : null

    case 'deadline':
      return data.deadline ? (
        <p className="body-text line-clamp-1">{data.deadline}</p>
      ) : null

    case 'points':
      return data.points ? (
        <p className="body-text line-clamp-1">{data.points}</p>
      ) : null

    case 'action':
      return showChevron ? (
        <div className="flex-center justify-end">
          <ChevronRight size={16} />
        </div>
      ) : null

    default:
      return null
  }
}

const Table: React.FC<TableProps> = ({
  columns = defaultColumns,
  data = [],
  showChevron = true
}) => {
  // Calculate total columns for grid
  const totalColumns = columns.reduce((sum, col) => sum + col.colSpan, 0)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {/* Header Row */}
        <div className={cn("grid px-3 gap-6 text-gray", {
          "grid-cols-7": totalColumns === 7,
          "grid-cols-9": totalColumns === 9,
        })}>
          {columns.map((column) => (
            <div key={column.key} className={cn(column.className, {
              "col-span-1": column.colSpan === 1,
              "col-span-3": column.colSpan === 3,
              "col-span-2": column.colSpan === 2,
              "col-span-4": column.colSpan === 4,
            })}>
              <p className="body-text">{column.label}</p>
            </div>
          ))}
        </div>

        {/* Data Rows */}
        {data.map((row) => (
          <Link
            key={row.id}
            href={row.href || "#"}
            className={cn("grid gap-6 px-3 py-2 bg-white rounded-6", {
              "grid-cols-7": totalColumns === 7,
              "grid-cols-9": totalColumns === 9,
            })}
          >
            {columns.map((column) => (
              <div key={column.key} className={cn(column.className, {
                "col-span-1": column.colSpan === 1,
                "col-span-3": column.colSpan === 3,
                "col-span-2": column.colSpan === 2,
                "col-span-4": column.colSpan === 4,
              })}>
                {renderCellContent(column.key, row, showChevron)}
              </div>
            ))}
          </Link>
        ))}
      </div>

      <Link
        href="/projects"
        className="body-text text-green-main flex-end gap-2"
      >
        <Grip4 /> View all
      </Link>
    </div>
  )
}

export default Table
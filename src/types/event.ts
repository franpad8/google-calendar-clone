export interface EventType {
  id: number
  title: string
  startDate: string
  endDate: string
}

export interface EventDataType {
  [startDate: string]: EventType[]
}

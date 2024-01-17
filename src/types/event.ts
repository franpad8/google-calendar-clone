export interface EventType {
  id: string
  title: string
  startDate: string
  endDate: string
}

export interface EventDataType {
  [startDate: string]: EventType[]
}

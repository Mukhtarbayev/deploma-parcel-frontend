export interface Option {
  value: string,
  label: string
}

export interface UserCard {
  id?: number
  userId?: number
  userName?: string
  weight?: number
  transport?: string
  type?: string
  cityFrom?: string
  cityTo?: string
  arrivingTime?: string
  updatedTime?: string
  phoneNumber?: string
}

export interface CreateUserCard {
  userId: number
  weight: number
  transportType: string
  cardType: string
  cityFrom: string
  cityTo: string
  arrivingTime: string
}

export interface CardsFilter {
  from: string,
  to: string,
  when?: string
}

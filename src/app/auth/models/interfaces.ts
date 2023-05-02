export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  id: number
}

export interface SignUpCredentials {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber: string
}

export interface SignUpResponse {
  token: string
  id: number
}

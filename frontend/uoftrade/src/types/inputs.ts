export type RegistrationInputs = {
    first_name: string
    last_name: string
    password: string
    password_confirmation: string
    email: string
    user_name: string
  }

export type LoginInputs = {
    password: string
    email: string
    signedin: boolean
  }

export type ProfileEditInputs = {
    first_name: string
    last_name: string
    user_name:string
  }

export type CreatePostInputs = {
  title: string
  price: number
  description: string
  location: string
  category: string
  sold: boolean
}


type RegistrationInputs = {
    first_name: string
    last_name: string
    password: string
    password_confirmation: string
    email: string
    user_name: string
  }

type LoginInputs = {
    password: string
    email: string
    signedin: boolean
  }

type ProfileEditInputs = {
    first_name: string
    last_name: string
    user_name:string
  }

type CreatePostInputs = {
  title: string
  price: number
  description: string
  location: string
  category: string
  sold: boolean
}


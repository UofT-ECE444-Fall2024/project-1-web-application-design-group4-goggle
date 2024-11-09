type RegistrationInputs = {
    first_name: string
    last_name: string
    password: string
    password_confirmation: string
    email: string
  }

type LoginInputs = {
    password: string
    email: string
    signedin: boolean
  }

type ProfileEditInputs = {
    first_name: string
    last_name: string
    email: string
  }

type CreatePostInputs = {
  title: string
  price: number
  description: string
  pickup_location: string
  category: string
}


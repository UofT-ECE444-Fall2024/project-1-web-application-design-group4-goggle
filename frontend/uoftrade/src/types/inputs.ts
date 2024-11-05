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
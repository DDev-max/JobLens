import type { InputsSearch } from '@/data/types'

interface ValidateFormParams {
  e: React.FormEvent<HTMLFormElement>
  setFormErrors: React.Dispatch<React.SetStateAction<Record<InputsSearch, boolean>>>
  formValues: Record<InputsSearch, string>
}

export function validateForm({ e, setFormErrors, formValues }: ValidateFormParams) {
  e.preventDefault()

  const newErrors = Object.fromEntries(Object.entries(formValues).map(([key, value]) => [key, !value]))

  setFormErrors(newErrors as Record<InputsSearch, boolean>)

  const formIsValid = Object.values(newErrors).every(error => error === false)

  if (formIsValid) {
    console.log('ENVIADO')
  }
}

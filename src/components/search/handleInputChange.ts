import type { InputsSearch } from '@/data/types'

interface HandleInputChangeParams {
  e: React.ChangeEvent<HTMLInputElement>
  setFormErrors: React.Dispatch<React.SetStateAction<Record<InputsSearch, boolean>>>
  setFormValues: React.Dispatch<React.SetStateAction<Record<InputsSearch, string>>>
}

export function handleInputChange({ e, setFormErrors, setFormValues }: HandleInputChangeParams) {
  const validators: Record<InputsSearch, (value: string) => boolean> = {
    position: value => value.trim().length <= 3,
    skills: value => !/\S+,\S+/.test(value.replaceAll(' ', '')),
    location: value => value.trim().length <= 2,
  }

  const { name, value } = e.target
  setFormValues(prev => ({ ...prev, [name]: value }))

  if (validators[name as InputsSearch]) {
    setFormErrors(prev => ({ ...prev, [name]: validators[name as InputsSearch](value) }))
  }
}

import type { InputsSearchName } from '#search/shared/types.ts'

interface HandleInputChangeParams {
  e: React.ChangeEvent<HTMLInputElement>
  setFormErrors: React.Dispatch<React.SetStateAction<Record<InputsSearchName, boolean>>>
  setFormValues: React.Dispatch<React.SetStateAction<Record<InputsSearchName, string>>>
}

export function handleInputChange({ e, setFormErrors, setFormValues }: HandleInputChangeParams) {
  const validators: Record<InputsSearchName, (value: string) => boolean> = {
    position: value => value.trim().length <= 3,
    skills: value => !/\S+,\S+/.test(value.replaceAll(' ', '')),
    location: value => value.trim().length <= 2,
  }

  const { name, value } = e.target
  setFormValues(prev => ({ ...prev, [name]: value }))

  if (validators[name as InputsSearchName]) {
    setFormErrors(prev => ({ ...prev, [name]: validators[name as InputsSearchName](value) }))
  }
}

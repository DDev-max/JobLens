import type { InputsSearchName } from '#search/shared/types.ts'
import type { InputProps } from '@heroui/input'
import { Input } from '@heroui/input'

interface InputSearchParams extends InputProps {
  name: InputsSearchName
}

export function InputSearch({ name, ...rest }: InputSearchParams) {
  return <Input name={name} {...rest} />
}

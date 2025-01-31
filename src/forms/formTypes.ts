import { InputProps } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

type Options = string[]

export type RenderFormInputProps<T extends object = object> =  Omit<InputProps, 'value' | 'onBlur'>& {
  label?: string
  options?: Options
  setFieldValue?: (field: string, value: string | boolean | string[], shouldValidate?: boolean) => void
  hasError?: boolean
  value?: string | number | string[] | boolean
  renderComponentProps?: T
  onBlur?: (event: React.FocusEvent<unknown>) => void
}

export type InputRenderList<T extends object = object> = {
  [key: string]: (props: RenderFormInputProps<T>) => JSX.Element
}

export type FormField<TInputTypes extends InputRenderList, T extends object = object> = {
  name: string
  label: string
  placeholder?: string
  type?: string
  colSpan: number
  required: boolean
  validation: Yup.AnySchema
  inputRender: keyof TInputTypes
  initialValue?: string 
  options?: Options
  renderComponentProps?: T
}

type FormikProp = ReturnType<typeof useFormik>

export interface FormGeratorProps<TInputTypes extends InputRenderList> {
  inputTypes: TInputTypes
  formFields: FormField<TInputTypes>[]
  templateColumns: string
  formik: FormikProp
  gap?: number
  formRef?: React.RefObject<HTMLFormElement>
}

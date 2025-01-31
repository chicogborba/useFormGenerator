import { FormField, InputRenderList } from '../formTypes'

const useFormFormat = () => {
  const updateOptions = (
    selectData: { [key: string]: string[] },
    formFields: FormField<InputRenderList>[],
  ) => {
    const updatedFormFields = formFields.map((field) => {
      const options = selectData[field.name]
      return options ? { ...field, options } : field
    })
    return updatedFormFields
  }

  const updateLabels = (
    labelsData: { [key: string]: string },
    formFields: FormField<InputRenderList>[],
  ) => {
    const updatedFormFields = formFields.map((field) => {
      const label = labelsData[field.name]
      return label ? { ...field, label } : field
    })
    return updatedFormFields
  }

  const updateInitialValues = (
    initialValues: { [key: string]: string },
    formFields: FormField<InputRenderList>[],
  ) => {
    const updatedFormFields = formFields.map((field) => {
      const initialValue = initialValues[field.name]
      return initialValue ? { ...field, initialValue } : field
    })
    return updatedFormFields
  }

  return {
    updateOptions,
    updateLabels,
    updateInitialValues
  }
}

export default useFormFormat

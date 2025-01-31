import * as Yup from 'yup'
import { FormField, InputRenderList } from '../formTypes'
import { useFormik } from 'formik'

const useFormGenerator = ({
  formFields,
  validateOnBlur = true,
  validateOnChange,
  onSubmit,
  enableReinitialize = false
}: {
  formFields: FormField<InputRenderList>[]
  onSubmit: (values: { [key: string]: string }) => void
  validateOnBlur?: boolean
  validateOnChange?: boolean
  enableReinitialize?: boolean
}) => {

  const generateValidationSchema = <TInputTypes extends InputRenderList>(
    formFields: FormField<TInputTypes>[],
  ) => {
    const schemaFields: { [key: string]: Yup.AnySchema } = {}

    formFields.forEach(({ name, validation }) => {
      schemaFields[name] = validation
    })

    return Yup.object(schemaFields)
  }

  const generateInitialValues = <TInputTypes extends InputRenderList>(
    formFields: FormField<TInputTypes>[],
  ) => {
    const initialValues: { [key: string]: string } = {}

    formFields.forEach(({ name, initialValue = '' }) => {
      initialValues[name] = initialValue || ''
    })

    return initialValues
  }

  const formik = useFormik({
    initialValues: generateInitialValues(formFields),
    validationSchema: generateValidationSchema(formFields),
    validateOnBlur,
    validateOnChange,
    onSubmit,
    enableReinitialize,
  })

  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } =
    formik

  const initialValues = formFields.reduce(
    (acc, { name, initialValue }) => {
      acc[name] = initialValue || ''
      return acc
    },
    {} as { [key: string]: string },
  )

  return {
    formik,
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
    errors,
    initialValues,
    touched,
  }
}

export default useFormGenerator

import { Box, Grid } from "@chakra-ui/react";
import { FormGeratorProps, InputRenderList, RenderFormInputProps } from "./formTypes";
import { memo } from "react";

const FormGerator = <TInputTypes extends InputRenderList>({
  inputTypes,
  formFields,
  templateColumns,
  gap = 4,
  formRef,
  formik,
}: FormGeratorProps<TInputTypes>) => {

  const { handleSubmit, handleChange, setFieldValue, errors, touched } = formik;

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <Grid w={"100%"} templateColumns={templateColumns} gap={gap}>
        {formFields.map(
          ({
            name,
            label,
            placeholder,
            type = "text",
            colSpan,
            required,
            inputRender,
            options,
            renderComponentProps,
          }) => (
            <Box key={name} gridColumn={`span ${colSpan}`}>
              <div>
                {(() => {
                  const InputComponent = inputTypes[inputRender] as (
                    props: RenderFormInputProps
                  ) => JSX.Element;
                  return (
                    <InputComponent
                      label={label}
                      options={options}
                      isRequired={required}
                      placeholder={placeholder}
                      type={type}
                      setFieldValue={setFieldValue}
                      hasError={
                        !!(
                          errors[name as keyof typeof errors] &&
                          touched[name as keyof typeof touched] &&
                          required
                        )
                      }
                      {...formik.getFieldProps(name)}
                      renderComponentProps={renderComponentProps}
                      onChange={handleChange}
                    />
                  );
                })()}
              </div>
            </Box>
          )
        )}
      </Grid>
    </form>
  );
};

export default memo(FormGerator);

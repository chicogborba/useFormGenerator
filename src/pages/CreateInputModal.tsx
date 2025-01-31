import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as Yup from "yup";
import useFormGenerator from "../forms/hooks/useFormGenerator";
import FormGenerator from "../forms/FormGenerator";
import { inputTypes } from "../forms/inputRender";
import useFormFormat from "../forms/hooks/useFormFormat";

const CreateInputModal = ({
  isOpen,
  onClose,
  colSpan,
  setCode,
  addOccupiedCell,
}: {
  isOpen: boolean;
  onClose: () => void;
  colSpan: number;
  setCode: React.Dispatch<React.SetStateAction<{[key: string]: string | boolean| string[]}[]>>
  addOccupiedCell: (element: keyof typeof inputTypes, gridColumnSpan: number, label: string, placeholder: string) => void
}) => {

    const formFields =[
    {
      name: "name",
      label: "Name",
      placeholder: "",
      colSpan: 1,
      required: true,
      validation: Yup.string().required(),
      inputRender: "text",
    },
    {
      name: "label",
      label: "Label",
      placeholder: "",
      colSpan: 1,
      required: true,
      validation: Yup.string().required(),
      inputRender: "text",
    },
    {
      name: "placeholder",
      label: "Placeholder",
      placeholder: "",
      colSpan: 1,
      required: false,
      validation: Yup.string().optional(),
      inputRender: "text",
    },
    {
      name: "colSpan",
      label: "colSpan",
      placeholder: "",
      colSpan: 1,
      required: true,
      validation: Yup.string().required(),
      inputRender: "text",
      initialValue: colSpan.toString(),
    },
    {
      name: "inputRender",
      label: "Input to Render",
      placeholder: "",
      colSpan: 1,
      required: true,
      validation: Yup.string().required(),
      inputRender: "select",
      options: Object.keys(inputTypes),
    },
    {
      name: "required",
      label: "Required",
      placeholder: "",
      colSpan: 3,
      required: false,
      validation: Yup.boolean(),
      inputRender: "checkbox",
    },
  ]

  const {updateInitialValues} = useFormFormat()    

  const initialvalues =  {
    colSpan: colSpan.toString()
  }
  

  const mapResponse = (obj: {[key: string]: string}) => {
    return {
        name: obj.name,
        label: obj.label,
        placeholder: obj.placeholder,
        colSpan: obj.colSpan,
        required: !!obj.required,
        inputRender: obj.inputRender,
        validation: "Yup.string().required()",
        initialValue: "",
        options: [],
    }
  }

  const { formik, handleSubmit, values } = useFormGenerator({
    formFields: updateInitialValues(initialvalues, formFields),
    enableReinitialize: true,
    onSubmit: async (values) => {
      setCode((p) => [...p, mapResponse(values)]);
        addOccupiedCell(
            values.inputRender as keyof typeof inputTypes,
            parseInt(values.colSpan),
            values.label,
            values.placeholder
        );
        onClose();
    },
  });


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Stack gap={"2rem"} alignItems={"center"}>
            <Text fontWeight={"bold"} fontSize={"xl"}>
                Preview
            </Text>
            {values.inputRender in inputTypes ?
              inputTypes[values.inputRender as keyof typeof inputTypes]({
                label: values.label || "Label",
                placeholder: values.placeholder || "Placeholder",
                isRequired: !!values.required,
                value: "",
                options: ["Option 1", "Option 2"],
                hasError: false,
                setFieldValue: formik.setFieldValue,
                onBlur: formik.handleBlur,
                name: "preview",
                renderComponentProps: {},
              }) : 
                <Text color={"gray.600"}>No Component Selected</Text>
              }
            <FormGenerator
              formFields={formFields}
              inputTypes={inputTypes}
              templateColumns="repeat(3, 1fr)"
              gap={4}
              formik={formik}
            />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => handleSubmit()} variant="ghost">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateInputModal;

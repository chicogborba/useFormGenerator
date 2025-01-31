export const docsTexts = {
  description: `O objetivo do useFormGenerator é fornecer uma solução padronizada e eficiente para a criação e manutenção
  de formulários controlados em React. Ele simplifica o processo de desenvolvimento ao integrar validações com Yup e Formik,
  gerando automaticamente esquemas de validação dinâmicos com base em um objeto que define a estrutura do formulário`,
  installation: `Atualmente o projeto não faz parte de nenhum pacote npm mas você pode clonar o repositório e utilizar os hooks
   e componentes de maneira isolada. Recomendo criar uma pasta 'forms' no src do seu projeto e adicionar os arquivos 'hooks',
    'formTypes.ts', 'utils.ts', 'FormGenerator.tsx' dentro dela. O arquivo 'inputTypes.tsx' deve ser criado por você com seus componentes especificos.` ,
  exempleCode: `
  const formFields = [
      {
        name: 'name',
        label: 'Name',
        placeholder: 'Full Name',
        colSpan: '3',
        required: false,
        inputRender: 'text',
        validation: Yup.string().required(),
        initialValue: '',
        options: []
      },
      {
        name: 'age',
        label: 'Age',
        placeholder: '',
        colSpan: '2',
        required: false,
        inputRender: 'text',
        validation: Yup.string().required(),
        initialValue: '',
        options: []
      },
      {
        name: 'country',
        label: 'Country',
        placeholder: '',
        colSpan: '2',
        required: true,
        inputRender: 'autocomplete',
        validation: Yup.string().required(),
        initialValue: '',
        options: []
      },
      {
        name: 'email',
        label: 'Email',
        placeholder: '',
        colSpan: '4',
        required: true,
        inputRender: 'text',
        validation: Yup.string().required(),
        initialValue: '',
        options: []
      },
      {
        name: 'password',
        label: 'Password',
        placeholder: '',
        colSpan: '3',
        required: true,
        inputRender: 'text',
        validation: Yup.string().required(),
        initialValue: '',
        options: []
      }
    ];

  const { formik, handleSubmit, values, finalFormFields } = useFormGenerator({
    formFields,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <FormGenerator
      formFields={finalFormFields}
      inputTypes={inputTypes} // inputTypes é um objeto com os tipos de componente input
      templateColumns="repeat(7, 1fr)"
      gap={4}
      formik={formik}
    />
  )
    `,
};

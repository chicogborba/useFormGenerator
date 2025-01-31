import { Checkbox, Stack, Text } from '@chakra-ui/react'
import CustomAutoComplete from '../components/base/CustomAutoComplete'
import Input from '../components/base/Input'
import Seletor from '../components/base/Seletor'
import { RenderFormInputProps } from './formTypes'
import TextArea from '../components/base/TextArea'



export const inputTypes = {
  textReadOnlyGray: (props: RenderFormInputProps) => (
    <Input
      bg={'gray_300'}
      border={'none'}
      isReadOnly={true}
      rotulo={props.label}
      cursor={'not-allowed'}
      obrigatorio={props.isRequired}
      {...{ ...props, width: props.width?.toString() }}
      value={props.value?.toString()}
    />
  ),
  textReadOnly: (props: RenderFormInputProps) => (
    <Input
      isReadOnly={true}
      rotulo={props.label}
      cursor={'not-allowed'}
      obrigatorio={props.isRequired}
      {...{ ...props, width: props.width?.toString() }}
      value={props.value?.toString()}
    />
  ),
  text: (props: RenderFormInputProps) => (
    <Input
      textAlign={'left'}
      rotulo={props.label}
      obrigatorio={props.isRequired}
      estaErrado={props.hasError}
      type="texto"
      {...{ ...props, width: props.width?.toString() }}
      value={props.value?.toString()}
    />
  ),
  select: (props: RenderFormInputProps) => (
    <Seletor
      opcoes={props.options || []}
      rotulo={props.label}
      obrigatorio={props.isRequired}
      name={props.name}
      estaErrado={props.hasError}
      onBlur={props.onBlur as React.FocusEventHandler<HTMLButtonElement>}
      onSelectChange={(value) => props.setFieldValue?.(props.name || '', value)}
    />
  ),
  autocomplete: (props: RenderFormInputProps) => (
    <CustomAutoComplete
      opcoes={props.options || []}
      rotulo={props.label}
      obrigatorio={props.isRequired}
      onSelectChange={(value) => props.setFieldValue?.(props.name || '', value)}
      estaErrado={props.hasError}
    />
  ),
  checkbox: (props: RenderFormInputProps<{mensagemErro?: string}>) => (
    <Stack>
      <Checkbox
        name={props.name}
        checked={!!props.value}
        onChange={() => props.setFieldValue?.(props.name || '', !props.value)}
      >
        <Text fontSize="0.875rem">{props.label}</Text>
      </Checkbox>
      {!!props.renderComponentProps?.mensagemErro && <Text hidden={!props.value} fontSize="0.75rem" fontWeight="500">
        {props.renderComponentProps?.mensagemErro}
      </Text>}
    </Stack>
  ),
  textarea: (props: RenderFormInputProps) => (
    <TextArea
      name={props.name}
      maxLength={500}
      rotulo={props.label}
      value={props.value?.toString()}
      onChange={(e) => props.setFieldValue?.(props.name || '', e.target.value)}
    />
  ),
} as const


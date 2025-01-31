import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Tag,
  Text,
  TagCloseButton,
  TagLabel,
  useToast,
} from '@chakra-ui/react'
import React from 'react'
import { IoAddSharp } from 'react-icons/io5'
import { useState } from 'react'

interface InputMultiplaEscolhaProps extends InputProps {
  multiplaEscolha?: boolean
  rotulo?: string
  label?: string
  onSelectChange?: (valor: string | string[]) => void
  selecionados?: string[]
}

export default function InputMultiplaEscolha({
  multiplaEscolha,
  label,
  onSelectChange,
  selecionados,
  ...props
}: InputMultiplaEscolhaProps): React.ReactElement {
  const toast = useToast()

  const [selecionado, setSelecionado] = useState<string | string[]>(
    selecionados ?? [],
  )
  const [valor, setValor] = useState<string>('')
  const mensagemJaAdicionado =
    label + ""

  return (
    <Flex
      width={props.width}
      w={props.w}
      direction="column"
      gap="0.5rem"
      fontFamily="Arial"
      fontSize="0.875rem"
      fontWeight={500}
    >
      <Text>{label}</Text>
      <InputGroup>
        <Input
          placeholder={props.placeholder || ''}
          padding={4}
          display="flex"
          alignItems={'center'}
          justifyContent={'center'}
          height="2.25rem"
          fontSize="0.75rem"
          borderColor="gray_400"
          color="#000"
          focusBorderColor="transparent"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          onFocus={(e) => {
            e.target.placeholder = ''
            if (props.onFocus) props.onFocus(e)
          }}
          onBlur={(e) => {
            e.target.placeholder = props.placeholder || ''
            if (props.onBlur) props.onBlur(e)
          }}
          _active={{ borderColor: 'gray_600' }}
          _focus={{ borderColor: 'gray_600' }}
          _hover={{ borderColor: 'gray_600' }}
        />
        <InputRightElement textAlign="center" w="fit-content" paddingBottom={1}>
          <Button
            variant="unstyled"
            onClick={() => {
              if (!valor) return
              if (multiplaEscolha) {
                if (Array.isArray(selecionado) && selecionado.includes(valor)) {
                  toast({
                    title: mensagemJaAdicionado,
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                  })
                  return
                }
                setSelecionado((prev) => [
                  ...(Array.isArray(prev) ? prev : [prev]),
                  valor,
                ])
              } else setSelecionado(valor)
              if (onSelectChange)
                onSelectChange(
                  multiplaEscolha
                    ? [
                        ...(Array.isArray(selecionado)
                          ? selecionado
                          : [selecionado]),
                        valor,
                      ]
                    : valor,
                )
              setValor('')
            }}
            p="0.75rem"
          >
            <IoAddSharp />
          </Button>
        </InputRightElement>
      </InputGroup>
      <Flex w="100%" flexWrap="wrap" justify="flex-start" gap="0.5rem">
        {Array.isArray(selecionado) &&
          selecionado.map((item, index) => (
            <Tag
              key={index}
              size="sm"
              borderRadius="full"
              width="fit-content"
              color="orange_500"
              bg="orange_300"
              padding="0.2rem 0.5rem"
            >
              <TagLabel>{item}</TagLabel>
              <TagCloseButton
                bg="gray.400"
                color="white"
                fontSize={12}
                width={3}
                onClick={() => {
                  const newSelecionado = (
                    Array.isArray(selecionado) ? selecionado : []
                  ).filter((_, i) => i !== index)
                  setSelecionado(newSelecionado)
                  if (onSelectChange) onSelectChange(newSelecionado)
                }}
              />
            </Tag>
          ))}
      </Flex>
    </Flex>
  )
}

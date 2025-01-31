import React, { useRef } from 'react'
import {
  Flex,
  FormControl,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Button,
  ButtonProps,
  Portal,
} from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi'

export interface SeletorProps extends ButtonProps {
  opcoes: string[]
  multiplaEscolha?: boolean
  rotulo?: string
  estaErrado?: boolean
  obrigatorio?: boolean
  onSelectChange?: (valor: string | string[]) => void
  selecionados?: string[]
  itemSelecionado?: string
  placeholder?: string
  width?: string | number
}

export default function Seletor({
  opcoes,
  multiplaEscolha = false,
  onSelectChange,
  obrigatorio = false,
  selecionados,
  itemSelecionado,
  rotulo,
  estaErrado,
  placeholder = 'Selecione...',
  width = '100%',
  ...props
}: SeletorProps): React.ReactElement {
  const [selecionado, setSelecionado] = React.useState<string[]>(
    selecionados || [],
  )
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleSelectChange = (value: string) => {
    if (multiplaEscolha) {
      if (!selecionado.includes(value)) {
        const novoSelecionado = [...selecionado, value]
        setSelecionado(novoSelecionado)
        onSelectChange?.(novoSelecionado)
      }
    } else {
      setSelecionado([value])
      onSelectChange?.(value)
    }
  }

  const handleRemoveTag = (tag: string) => {
    if (multiplaEscolha) {
      const atualizado = selecionado.filter((item) => item !== tag)
      setSelecionado(atualizado)
      onSelectChange?.(atualizado)
    }
  }

  React.useEffect(() => {
    onSelectChange?.(multiplaEscolha ? selecionado : selecionado[0])
  }, [selecionado])

  return (
    <FormControl isInvalid={obrigatorio && estaErrado}>
      <Flex
        direction="column"
        gap="0.25rem"
        fontFamily="Arial"
        width={width}
      >
        {rotulo && (
          <Flex fontSize="0.875rem" gap="0.25rem">
            {obrigatorio && <Text textColor="red.500">*</Text>}
            <Text textColor={estaErrado ? 'red.500' : 'black'} isTruncated>
              {rotulo}
            </Text>
          </Flex>
        )}
        <Menu isLazy>
          <MenuButton
            as={Button}
            ref={buttonRef}
            w="100%"
            rightIcon={
              <FiChevronDown
                size={16}
                style={{
                  backgroundColor: "white",
                }}
              />
            }
            border={estaErrado ? '2px solid' : '1px solid'}
            borderColor={estaErrado ? 'red.500' : '#CFCFCF'}
            h="2.25rem"
            fontSize="0.875rem"
            bg="white"
            textAlign="left"
            borderRadius={estaErrado ? '0.5rem' : '0.25rem'}
            fontFamily="Arial"
            color={selecionado.length > 0 || itemSelecionado ? 'black' : 'gray_400'}
            _active={{ borderColor: 'gray_600', backgroundColor: 'white' }}
            _focus={{ borderColor: 'gray_600' }}
            fontWeight={400}
            _placeholder={{ color: 'gray_600', fontWeight: 400 }}
            _hover={
              estaErrado
                ? { borderColor: 'red.500' }
                : { borderColor: 'gray_600' }
            }
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            {...props}
            type='button'
          >
            {itemSelecionado && itemSelecionado !== 'undefined'
              ? itemSelecionado
              : selecionado.length > 0
                ? multiplaEscolha
                  ? `${selecionado.length} selecionados`
                  : selecionado[0]
                : placeholder}
          </MenuButton>
          <Portal>
            <MenuList
            zIndex={9999}
              maxH="20rem"
              overflow="auto"
              style={{
                width: buttonRef.current?.offsetWidth || '100%',
              }}
            >
              {opcoes.map((opcao, index) => (
                <MenuItem
                  key={index}
                  maxW="100%"
                  whiteSpace="normal"
                  wordBreak="break-word"
                  onClick={() => handleSelectChange(opcao)}
                  isDisabled={multiplaEscolha && selecionado.includes(opcao)}
                  _focus={{
                    backgroundColor: 'orange_300',
                    color: 'orange_500',
                  }}
                  _hover={{
                    backgroundColor: 'orange_300',
                    color: 'orange_500',
                  }}
                >
                  <Text
                    w="100%"
                    fontSize="0.875rem"
                  >
                    {opcao}
                  </Text>
                </MenuItem>
              ))}
            </MenuList>
          </Portal>
        </Menu>
        {multiplaEscolha && (
          <Flex w="100%" flexWrap="wrap" gap="0.5rem" mt="0.5rem">
            {selecionado.map((tag, index) => (
              <Tag
                key={index}
                size="sm"
                borderRadius="full"
                colorScheme="orange"
                padding="0.2rem 0.5rem"
              >
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={() => handleRemoveTag(tag)} />
              </Tag>
            ))}
          </Flex>
        )}
      </Flex>
    </FormControl>
  )
}

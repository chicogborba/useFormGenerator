import React, { useEffect, useState } from 'react'
import {
  Flex,
  FormControl,
  FormLabel,
  Text,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@chakra-ui/react'
import {
  AutoComplete,
  AutoCompleteItem,
  AutoCompleteInput,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'

export interface CustomAutoCompleteProps {
  opcoes: string[]
  multiplaEscolha?: boolean
  rotulo?: string
  estaErrado?: boolean
  obrigatorio?: boolean
  onSelectChange?: (valor: string | string[]) => void
  selecionados?: string[]
  placeholder?: string
  width?: string | number
  value?: string | string[]
  isDisabled?: boolean
}

export default function CustomAutoComplete({
  opcoes,
  multiplaEscolha = false,
  onSelectChange,
  obrigatorio = false,
  selecionados = [],
  rotulo,
  estaErrado,
  placeholder = 'Selecione...',
  width = '100%',
  value,
  isDisabled,
}: CustomAutoCompleteProps): React.ReactElement {
  const [selecionado, setSelecionado] = useState<string[]>(selecionados)

  useEffect(() => {
    if (value !== undefined) {
      setSelecionado(Array.isArray(value) ? value : [value])
    }
  }, [value])

  const handleSelectChange = (item: string | string[]) => {
    let novoSelecionado: string[]
    if (multiplaEscolha) {
      novoSelecionado = Array.isArray(item) ? item : [item]
    } else {
      novoSelecionado = [typeof item === 'string' ? item : item[0]]
    }
    setSelecionado(novoSelecionado)
    onSelectChange?.(multiplaEscolha ? novoSelecionado : novoSelecionado[0])
  }

  const handleRemoveTag = (item: string) => {
    const atualizado = selecionado.filter((v) => v !== item)
    setSelecionado(atualizado)
    onSelectChange?.(multiplaEscolha ? atualizado : atualizado[0] || '')
  }

  return (
    <FormControl
      isInvalid={obrigatorio && estaErrado}
      w={width}
      fontFamily="Arial"
    >
      {rotulo && (
        <FormLabel mb={1}>
          <Flex fontSize="0.875rem" alignItems="center" gap="0.25rem">
            {obrigatorio && <Text color="red.500">*</Text>}
            <Text color={estaErrado ? 'red.500' : 'black'}>{rotulo}</Text>
          </Flex>
        </FormLabel>
      )}
      <AutoComplete
        openOnFocus
        closeOnSelect={!multiplaEscolha}
        closeOnBlur
        listAllValuesOnFocus
        multiple={multiplaEscolha}
        onChange={(item) => handleSelectChange(item as string)}
        value={multiplaEscolha ? selecionado : selecionado[0]}
        emptyState={
          <Flex w={'100%'} justifyContent={'center'} py={'0.5rem'} h={'100%'}>
            <Text fontSize="0.8rem">Nenhum resultado encontrado</Text>
          </Flex>
        }
      >
        <AutoCompleteInput
          isDisabled={isDisabled}
          min-h="2.25rem"
          fontSize="0.875rem"
          bg="white"
          placeholder={placeholder}
          variant="outline"
          focusBorderColor={'transparent'}
          borderColor={estaErrado ? 'red_500' : 'gray_400'}
          boxShadow="none"
          color={'black'}
          fontWeight={selecionado.length === 0 ? 400 : 'normal'}
          textAlign={'left'}
          _active={{ borderColor: 'gray_600', backgroundColor: 'white' }}
          _focus={{ borderColor: 'gray_600' }}
          _hover={{ borderColor: 'gray_600' }}
          _placeholder={{
            color: 'gray_400',
            fontWeight: '400',
          }}
        />
        <AutoCompleteList
          border={'1px solid'}
          borderColor={'gray_200'}
          rounded={8}
          py={'0.5rem'}
          px={0}
          shadow={'none'}
        >
          {opcoes.map((option, index) => (
            <AutoCompleteItem
              key={index}
              value={option}
              _hover={{ backgroundColor: 'orange_300', color: "orange_500" }}
              _focus={{ backgroundColor: 'orange_300', color: "orange_500" }}
              rounded={0}
              padding="0.4rem 1rem"
              fontSize="0.875rem"
              fontFamily="Arial"
              color={!selecionado.includes(option) ? 'black' : 'gray_400'}
              fontWeight={!selecionado.includes(option) ? 'normal' : '400'}
              m={0}
            >
              {option}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
      {multiplaEscolha && (
        <Flex mt="0.5rem" flexWrap="wrap" gap="0.5rem">
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
    </FormControl>
  )
}

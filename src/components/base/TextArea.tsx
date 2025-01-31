import {
  Textarea,
  Text,
  TextareaProps as ChakraTextareaProps,
  Flex,
  FormControl,
} from '@chakra-ui/react'
import React from 'react'

interface TextareaProps extends ChakraTextareaProps {
  tamanho?: string
  legenda?: string
  rotulo?: string
  estaErrado?: boolean
  obrigatorio?: boolean
}

export default function TextArea(props: TextareaProps): React.ReactElement {
  return (
    <FormControl gap={4} isInvalid={props.estaErrado} fontFamily="Arial">
      <Flex
        flexDirection="column"
        width="100%"
        gap="0.25rem"
        fontFamily="Arial"
      >
        <Flex fontSize="0.875rem" gap="0.25rem">
          <Text hidden={!props.obrigatorio} textColor="red_500">
            *
          </Text>
          <Text fontSize="0.875rem">{props.rotulo}</Text>
        </Flex>
        <Textarea
          h="5.5rem"
          placeholder={props.legenda || ''}
          size={props.tamanho || 'md'}
          resize={'none'}
          fontSize="0.875rem"
          focusBorderColor="transparent"
          borderColor="gray_400"
          _active={{ borderColor: 'gray_600' }}
          _focus={{ borderColor: 'gray_600' }}
          _hover={{ borderColor: 'gray_600' }}
          {...props}
        />
        <Flex justifyContent="flex-end">
          <Text
            fontSize="0.875rem"
            textColor={
              typeof props.value === 'string' &&
              props.value.length === props.maxLength
                ? 'red_500'
                : ''
            }
          >
            {typeof props.value === 'string' && props.value.length}/
            {props.maxLength}
          </Text>
        </Flex>
      </Flex>
    </FormControl>
  )
}

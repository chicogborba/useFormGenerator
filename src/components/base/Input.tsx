import {
  Button,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Flex,
  FormControl,
  Image,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import MostrarSenha from "../../assets/imagens/showPassword.svg";
import OcultarSenha from "../../assets/imagens/hidePassword.svg";
import {
  mascaraData,
  mascaraMoedaEPorcentagem,
  mascaraNumero,
} from "../../utils/mascarasInput";

export interface InputProps extends ChakraInputProps {
  width?: string;
  leftElement?: React.ReactElement | string;
  placeholder?: string;
  estaErrado?: boolean;
  obrigatorio?: boolean;
  rotulo?: React.ReactElement | string;
  disable?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

export default function Input({
  disable = false,
  type,
  obrigatorio = false,
  ...props
}: InputProps): React.ReactElement {
  const [showPassword, setShowPassword] = useState("password");

  function renderizarPlaceholder() {
    switch (type) {
      case "password":
        return "Senha";
      case "moeda":
        return "00,00";
      case "data":
        return "dd/mm/aa";
      case "porcentagem":
        return "00,00";
      case "numero":
        return "0";
      default:
        return props.placeholder || "";
    }
  }

  return (
    <FormControl isInvalid={obrigatorio ? props.estaErrado : false}>
      <InputGroup w={props.w || props.width || "100%"} fontFamily="Arial">
        {(type === "moeda" || type === "porcentagem" || props.leftElement) && (
          <InputLeftElement
            pointerEvents="none"
            color="gray_600"
            h="100%"
            p="0"
          >
            {type === "moeda" && "R$"}
            {type === "porcentagem" && "%"}
            {props.leftElement}
          </InputLeftElement>
        )}
        <Flex
          flexDirection="column"
          width="100%"
          gap="0.25rem"
          fontFamily="arial"
        >
          <Flex hidden={!props.rotulo} fontSize="0.875rem" gap="0.25rem">
            <Text hidden={!obrigatorio} textColor="red_500">
              *
            </Text>
            <Text
              fontSize="0.875rem"
              textColor={props.estaErrado ? "red_500" : ""}
              isTruncated
            >
              {props.rotulo}
            </Text>
          </Flex>
          <ChakraInput
            disabled={disable ? true : false}
            fontSize={"0.875rem"}
            w="100%"
            placeholder={renderizarPlaceholder()}
            focusBorderColor="gray_400"
            borderColor={props.estaErrado ? "red_500" : "gray_400"}
            boxShadow="none"
            h="2.25rem"
            color="#000"
            textAlign={
              type === "texto" || type === "password" || !type
                ? "left"
                : "right"
            }
            _active={{ borderColor: "gray_600" }}
            _hover={{ borderColor: "gray_600" }}
            type={type === "password" ? showPassword : type}
            pl={props.leftElement ? "2.5rem" : "1rem"}
            onChange={(e) => {
              if (type === "moeda" || type === "porcentagem")
                e.target.value = mascaraMoedaEPorcentagem(e.target.value);
              else if (type === "data")
                e.target.value = mascaraData(e.target.value);
              else if (type === "numero")
                e.target.value = mascaraNumero(e.target.value);
              if (props.onChange) props.onChange(e);
            }}
            onFocus={(e) => {
              e.target.placeholder = "";
              if (props.onFocus) props.onFocus(e);
            }}
            onBlur={(e) => {
              e.target.placeholder = renderizarPlaceholder();
              if (props.onBlur) props.onBlur(e);
            }}
            paddingLeft={props.leftElement ? "2.5rem" : "1rem"}
            autoComplete="off"
            {...props}
          />
        </Flex>
        {type === "password" && (
          <InputRightElement textAlign="center" w="fit-content">
            <Button
              hidden={type !== "password"}
              variant="unstyled"
              onClick={() =>
                setShowPassword(
                  showPassword === "password" ? "text" : "password"
                )
              }
              p="0.75rem"
            >
              <Image
                src={showPassword === "password" ? OcultarSenha : MostrarSenha}
                w="100%"
                h="100%"
              />
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  );
}

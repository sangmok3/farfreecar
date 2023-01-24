import { Text, TextProps } from "@chakra-ui/react";
import React from "react";

type ErrorTextProps = {
  children: JSX.Element | JSX.Element[];
};

export const ErrorText = ({
  children,
  ...rest
}: ErrorTextProps & TextProps) => {
  return (
    <Text mt="10px" color="red.600" fontSize="12px" {...rest}>
      {children}
    </Text>
  );
};

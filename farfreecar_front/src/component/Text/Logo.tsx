import { Text } from "@chakra-ui/react";
import React from "react";

interface ILogo {
  logo: string;
  color?: string;
}

export const Logo = (props: ILogo) => {
  const { logo, color } = props;
  return (
    <Text
      fontSize="100px"
      color={color ? color : "#4285F4"}
      fontFamily="Berlin Sans FB"
    >
      {logo}
    </Text>
  );
};

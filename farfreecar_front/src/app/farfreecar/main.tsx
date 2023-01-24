import React from "react";
import { Box, Image } from "@chakra-ui/react";
import farfreecar from "../../assets/images/farfreecar.png";
import "react-datepicker/dist/react-datepicker.css";
import { Header } from "../../component/layout/Header";
import { FormBox } from "../../component/Box/FormBox";
import { Logo } from "../../component/Text/Logo";

export default function Main() {
  return (
    <>
      <Box h="100vh">
        <Header />
        <Box ml="37%" display="flex" pos="relative">
          <Image src={farfreecar} width="10%" ml="45%" pos="absolute" />
          <Box mt="2%" display="flex">
            <Logo logo="Far" color="#4285F4" />
            <Logo logo="Free" color="#EA3B30" />
            <Logo logo="Car" color="#34A853" />
          </Box>
        </Box>
        <FormBox />
      </Box>
    </>
  );
}

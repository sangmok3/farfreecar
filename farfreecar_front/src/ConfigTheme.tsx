import { extendTheme } from "@chakra-ui/react";

window.localStorage.setItem("chakra-ui-color-mode", "light");

const configTheme = extendTheme({
  colors: {
    brand: {
      100: "#F5F4AD",
    },
  },
  fonts: {
    heading: "Noto Sans KR",
    body: "Noto Sans KR",
  },
  initialColorMode: "light",
  useSystemColorMode: false,
});

export default configTheme;

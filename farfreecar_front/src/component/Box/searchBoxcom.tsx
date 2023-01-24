import { Box, Icon, Table, Tbody, Text, Thead, Td, Tr } from "@chakra-ui/react";

import React from "react";
import { IconType } from "react-icons";
import { IAirplain } from "../../api/commonInterface";

interface ISearch {
  title: string;
  icon: IconType;
  data?: IAirplain[];
}

export const SearchBoxCom = (props: ISearch): JSX.Element => {
  const { title, icon, data } = props;
  return (
    <Box p="5%" bg="white" w="500px" h="400px">
      {data ? (
        <>
          <Table size="sm">
            <Thead>
              <Text fontSize="18px">{title}</Text>
            </Thead>
            <Box
              borderBottom="1px solid"
              borderBottomColor="gray.200"
              m="2% 0% 2% 0%"
            />
            <Box mt="2%" fontSize="14px" h="300px" overflowY="scroll">
              <Tbody>
                {data.map((value, key) => (
                  <>
                    <Tr>
                      <Td>
                        <Icon as={icon} fontSize="20px" color="gray.400" />
                      </Td>
                      <Td>
                        <Text>{value.airlineNm}</Text>
                      </Td>
                      <Td>
                        <Text>{`${String(value.arrPlandTime).slice(
                          8,
                          10
                        )} : ${String(value.arrPlandTime).slice(
                          10,
                          12
                        )}  ~ ${String(value.depPlandTime).slice(
                          8,
                          10
                        )} : ${String(value.depPlandTime).slice(
                          10,
                          12
                        )}`}</Text>
                      </Td>
                      <Td>
                        {value.economyCharge ? (
                          <Text>{`${value.economyCharge}원`}</Text>
                        ) : (
                          <Text> - </Text>
                        )}
                      </Td>
                    </Tr>
                  </>
                ))}
              </Tbody>
            </Box>
          </Table>
        </>
      ) : (
        <Text>해당 일정이 없습니다.</Text>
      )}
    </Box>
  );
};

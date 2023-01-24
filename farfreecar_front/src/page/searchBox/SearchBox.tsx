import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SearchBoxCom } from "../../component/Box/searchBoxcom";
import { ImAirplane } from "react-icons/im";
import { IoMdTrain } from "react-icons/io";
import { MdDirectionsBus } from "react-icons/md";
import { NewInterface } from "../../api/ApiInterface";
import { IAirplain, IForm } from "../../api/commonInterface";
//import PerfectScrollbar from "react-perfect-scrollbar";

export const SearchBox = (info: IForm): JSX.Element => {
  const getAirPlaneAPI = () => {
    const service = NewInterface();
    service.GetAirplane(info).then((res) => {
      console.log("res123", res);
      setSearchInfo(res);
    });
  };
  const [searchInfo, setSearchInfo] = useState<IAirplain[] | undefined>(
    undefined
  );
  useEffect(() => {
    getAirPlaneAPI();
  }, [searchInfo]);
  /*
  const [scrollH, setScrollH] = useState<PerfectScrollbar | null>();
  useEffect(() => {
    if (scrollH) {
      scrollH.updateScroll();
    }
  }, [scrollH]);

  */
  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" w="1500px" m="auto" mt="1%">
        <GridItem h="400px" borderWidth="0px 2px 0px 0px" borderStyle="dashed">
          <SearchBoxCom title="항공권" icon={ImAirplane} data={searchInfo} />
        </GridItem>
        <GridItem h="400px" borderWidth="0px 2px 0px 0px" borderStyle="dashed">
          <SearchBoxCom title="KTX" icon={IoMdTrain} data={searchInfo} />
        </GridItem>
        <GridItem h="400px">
          <SearchBoxCom title="버스" icon={MdDirectionsBus} data={searchInfo} />
        </GridItem>
      </Grid>
    </Box>
  );
};

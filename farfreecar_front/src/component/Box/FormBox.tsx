import {
  Box,
  Button,
  forwardRef,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiLink } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { BsCalendarCheck } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { SearchBox } from "../../page/searchBox/SearchBox";
import { NewInterface } from "../../api/ApiInterface";
import { IAirport, IForm } from "../../api/commonInterface";
import moment from "moment";

export const FormBox = () => {
  const { register, handleSubmit } = useForm();

  const [goDate, setGoDate] = useState<Date | null>(null);
  const [goHour, setGoHour] = useState<Date | null>(null);
  const [startArea, setStartArea] = useState<string>("");
  const [endArea, setEndArea] = useState<string>("");
  const [airportNm, setAirportNm] = useState<IAirport[] | undefined>(undefined);

  const [form, setForm] = useState<IForm>({
    depAirportId: "",
    arrAirportId: "",
    depPlandTime: "",
  });

  const [showBox, setShowBox] = useState<boolean>(false);

  const GetAirportId = () => {
    const service = NewInterface();
    service.GetAirportId().then((res) => {
      console.log("res11", res);
      if (res) {
        setAirportNm(res);
      }
    });
  };

  const CustomDateInput = forwardRef(({ value, onClick, placeholder }, ref) => (
    <InputGroup size="md" onClick={onClick} ref={ref}>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={BsCalendarCheck} />}
      />
      <Input type="text" value={value} placeholder={placeholder} readOnly />
    </InputGroup>
  ));
  const CustomHourInput = forwardRef(({ value, onClick, placeholder }, ref) => (
    <InputGroup size="md" onClick={onClick} ref={ref}>
      <InputLeftElement pointerEvents="none" children={<Icon as={BiTime} />} />
      <Input type="text" value={value} placeholder={placeholder} readOnly />
    </InputGroup>
  ));
  const onSubmit = (data: any) => console.log(data);
  //form 상태 바뀔때 리랜더링
  useEffect(() => {
    GetAirportId();
  }, [startArea, endArea]);

  return (
    <>
      <Box
        bg="white"
        borderRadius="20px"
        w="1000px"
        h="150px"
        m="auto"
        boxShadow="3px 3px 3px 3px rgb(0 0 0 / 5%)"
      >
        <Box borderBottom="1px solid" borderBottomColor="gray.200" h="40px" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" pt="0.5%" pr="5%">
            <HStack w="100%">
              <VStack w="300px">
                <Text fontSize="35px">ICN</Text>
                <Select
                  w="150px"
                  textAlign="center"
                  size="sm"
                  placeholder="출발 지역"
                  borderColor="rgb(0 0 0 / 0%) !important"
                  {...register("start_area", {
                    required: true,
                    onChange: (e) => {
                      setStartArea(e.target.value);
                    },
                  })}
                  value={startArea}
                >
                  {airportNm &&
                    airportNm.map((data) => (
                      <option value={data.airportId} key={data.airportNm}>
                        {data.airportNm}
                      </option>
                    ))}
                </Select>
              </VStack>
              <Box>
                <Icon
                  as={FiLink}
                  fontSize="30px"
                  borderRadius="20px"
                  color="blue.300"
                />
              </Box>
              <VStack w="300px">
                <Text fontSize="35px">PUS</Text>
                <Select
                  w="150px"
                  textAlign="center"
                  size="sm"
                  placeholder="도착 지역"
                  borderColor="rgb(0 0 0 / 0%) !important"
                  {...register("end_area", {
                    required: true,
                    onChange: (e) => {
                      setEndArea(e.target.value);
                    },
                  })}
                  value={endArea}
                >
                  {airportNm &&
                    airportNm.map((data) => (
                      <option value={data.airportId} key={data.airportNm}>
                        {data.airportNm}
                      </option>
                    ))}
                </Select>
                {/*errors.end_area.type === 'required' && <Text>도착지역을 선택하세요</Text>*/}
              </VStack>
              <Box w="300px">
                <DatePicker
                  id="go_date"
                  placeholderText="가는 날"
                  selected={goDate}
                  onChange={(date: Date) => {
                    setGoDate(date);
                    setForm({
                      ...form,
                      depPlandTime: moment(date).format("YYYYMMDD"),
                    });
                  }}
                  locale={ko}
                  dateFormat="yyyy년 MM월 dd일"
                  minDate={new Date()}
                  customInput={<CustomDateInput />}
                />
              </Box>
              <Box w="300px">
                <DatePicker
                  id="go_hour"
                  placeholderText="가는 시간"
                  selected={goHour}
                  onChange={(date: Date) => setGoHour(date)}
                  locale={ko}
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat="HH:mm"
                  timeIntervals={10}
                  timeCaption="time"
                  dateFormat="h:mm aa"
                  customInput={<CustomHourInput />}
                />
              </Box>
              <Button
                size="lg"
                color="white"
                bg="#FBBC05"
                fontSize="20px"
                w="150px"
                onClick={() => {
                  if (startArea !== "" && endArea !== "" && goDate && goHour) {
                    setShowBox(true);
                  }
                }}
                type="submit"
              >
                Search
              </Button>
            </HStack>
          </Box>
        </form>
      </Box>
      {showBox && goDate && (
        <SearchBox
          arrAirportId={startArea}
          depAirportId={endArea}
          depPlandTime={form.depPlandTime}
        />
      )}
      {console.log(
        "resssssss:",
        startArea,
        endArea,
        goDate,
        goHour,
        form.depPlandTime
      )}
    </>
  );
};

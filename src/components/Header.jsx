import { BiSun } from "react-icons/bi"; 
import { BiSearch } from "react-icons/bi"; 
import { BiCategoryAlt } from "react-icons/bi";
import { BiMoon } from "react-icons/bi";
import { Box, Icon, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import btnData from "../config/contstants";
import { useLocation } from "react-router-dom";

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const { pathname } = useLocation()
    const headerBg = useColorModeValue("purple.400" , "gray.900")
    return (
        <Box borderBottom={"1px"} borderColor={"whiteAlpha.400"} backgroundColor={headerBg} px={"10px"} height={"60px"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Box display={"flex"} fontSize={"22px"} justifyContent={"center"} alignItems={"center"} gap={"10px"}>
                <Box padding={"5px"} width={"35px"} height={"35px"} display={"flex"} justifyContent={"center"} alignItems={"center"} rounded={"sm"} color={"white"} backgroundColor={"purple.500"}>
                    <Icon as={btnData.find(item => item.path === pathname).icon} />
                </Box>
                <Text fontWeight={"600"} color={"white"} fontSize={"18px"}>{btnData.find(item => item.path === pathname).title}</Text>
            </Box>
            <Box width={"50%"} display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"10px"}>
                <InputGroup>
                    <Input color={"white"} _placeholder={{color : "whiteAlpha.700"}} size={"md"}  rounded={"full"} placeholder="Search..." />
                    <InputRightElement>
                        <IconButton rounded={"full"} size={"sm"} icon={<BiSearch />}/>
                    </InputRightElement>
                </InputGroup>
            
            <Box>
                <IconButton size={"sm"} rounded={"full"}  icon={colorMode === "light"? <BiMoon /> : <BiSun />} onClick={() => toggleColorMode()}/>
            </Box>
            </Box>
        </Box>
    )
}

export default Header

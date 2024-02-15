import { Box, Button, Divider, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import btnData from "../config/contstants";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({setShowDash}) => {
    const hoverBtn = useColorModeValue("whiteAlpha.200", "blackAlpha.500")
    const activeBtn = useColorModeValue("purple.800", "blackAlpha.600")
    const hoverActiveBtn = useColorModeValue("purple.900", "blackAlpha.700")
    const {pathname} = useLocation()
    return (
        <Box width={"full"} padding={"5px"} mt={"15px"}>
            <Text textAlign={"center"} fontWeight={"600"} fontSize={"20px"} color={"white"}>Dashboard</Text>
            <Divider mb={"20px"} mt={"8px"} />
            <Box display={"flex"} flexDir={"column"} gap={"10px"}>
                {btnData.map(item => (
                    <Link to={item.path} key={item.id}>
                        <Button rounded={"sm"} onClick={() => setShowDash(false)} isActive={item.path === pathname? true : false} _active={{backgroundColor: activeBtn}} variant={"outline"} width={"full"} color={"white"} _hover={{backgroundColor : item.path === pathname? hoverActiveBtn : hoverBtn }}  justifyContent={"start"} gap={"10px"}>
                            <Icon as={item.icon} />
                            <Text>{item.title}</Text>
                        </Button>
                    </Link>
                ))}
            </Box>
        </Box>
    )
}

export default Sidebar

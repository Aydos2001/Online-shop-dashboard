import { AiOutlineEdit } from "react-icons/ai"; 
import { MdDeleteOutline } from "react-icons/md"; 
import { Box, Card, CardBody, IconButton, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const CategoryItem = ({ item, setItemId, onDeleteOpen, onUpdateOpen }) => {
    const cardBg = useColorModeValue("purple.500", "gray.900")
    
    function openAlertDelete(id) {
        setItemId(id)
        onDeleteOpen()
    }

    function openAlertUpdate(id) {
        setItemId(id)
        onUpdateOpen()
    }
    return (
        <Card rounded={"sm"} backgroundColor={cardBg} border={"1px"} borderColor={"whiteAlpha.300"}> 
            <CardBody display={"flex"} padding={"7px"} justifyContent={"space-between"} alignItems={"center"} gap={"10px"}>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"5px"}>
                    <Image src={item.image} rounded={"sm"} width={"45px"} height={"45px"} objectFit={"cover"} />
                    <Text color={"white"}>{item.title.slice(0,8)}...</Text>
                </Box>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"5px"}>
                    <IconButton onClick={() => openAlertDelete(item.id)} size={"sm"} fontSize={"15px"} colorScheme="red" icon={<MdDeleteOutline />}/>
                    <IconButton onClick={() => openAlertUpdate(item.id)} size={"sm"} fontSize={"15px"} colorScheme="blue" icon={<AiOutlineEdit />}/>
                </Box>
            </CardBody>
        </Card>
    )
}

export default CategoryItem

import { Box, Button, Card, CardBody, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import MainContext from '../../store/context'

const ProductItem = ({ item, onDeleteOpen, onUpdateOpen, setItemId }) => {
    const cardBg = useColorModeValue("purple.500", "gray.900")
    const [desActive, setDesActive] = useState(false)
    const {state} = useContext(MainContext)

    function setDeleteItem(id) {
        onDeleteOpen()
        setItemId(id)
    }

    function setUpdateItem(id) {
        onUpdateOpen()
        setItemId(id)
    }
    return (
        <Card rounded={"sm"} backgroundColor={cardBg} height={"100%"}>
            <CardBody padding={"10px"} display={"flex"} justifyContent={"space-between"} flexDir={"column"} gap={"10px"}>
                <Box>
                    <Box position={"relative"}>
                        <Image src={item.image} rounded={"sm"} maxH={"200px"} width={"100%"} minH={"200px"} objectFit={"cover"} />
                        <Text position={"absolute"} top={"10px"} left={"10px"} padding={"3px"} rounded={"sm"} backgroundColor={"blackAlpha.700"} color={"white"} fontSize={"12px"}>
                            {state.categories?.find(CatItem => CatItem.id == item.categoryId)?.title}
                        </Text>
                    </Box>
                    <Text color={"white"} fontWeight={"600"} fontSize={"18px"}>
                        {item.title}
                    </Text>
                    <Text color={"white"}>price : {item.price}$</Text>
                    <Box border={"1px"} color={"white"} rounded={"sm"} borderColor={"whiteAlpha.300"} padding={"3px"} overflowY={"auto"} height={"100px"}>
                        <Text cursor={"pointer"} onClick={() => setDesActive(!desActive)} fontSize={"12px"}>{desActive? item.description : item.description.slice(0,100)+"..."}</Text>
                    </Box>
                </Box>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"5px"}>
                    <Button onClick={() => setDeleteItem(item.id)} size={"sm"} rounded={"sm"} colorScheme='red' width={"100%"}>Delete</Button>
                    <Button onClick={() => setUpdateItem(item.id)} size={"sm"} rounded={"sm"} colorScheme='blue' width={"100%"}>Update</Button>
                </Box>
            </CardBody>
        </Card>
    )
}

export default ProductItem

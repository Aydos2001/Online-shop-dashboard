import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../../store/context'
import { getCategories, getProducts } from '../../hooks/getDataAxios'

const AlertUpdate = ({ isOpen, onOpen, onClose, state, itemId, url, type }) => {

    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const toast = useToast()
    const { dispatch } = useContext(MainContext)

    async function UpdateCategory(id) {
        const data = type==="product"? { image, title, price, description } : { image, title }
        await axios.patch(`${url}/${id}`, data)
            .then((res) => {
                toast({
                    title: `Updated ${type}`,
                    status: "success",
                    isClosable: true,
                    position: "bottom-right"
                })
            })
            .catch((err) => {
                toast({
                    title: `Updated ${type}`,
                    status: "error",
                    isClosable: true,
                    position: "bottom-right"
                })
            })
        onClose()
        if (type === "product") {
            getProducts(url, dispatch)
        } else {
            getCategories(url, dispatch)
        }
    }

    function CheckType() {
        if (type === "product") {
            setImage(`${state.products?.find(item => item.id == itemId)?.image}`)
            setTitle(`${state.products?.find(item => item.id == itemId)?.title}`)
            setPrice(`${state.products?.find(item => item.id == itemId)?.price}`)
            setDescription(`${state.products?.find(item => item.id == itemId)?.description}`)
        } else {
            setImage(`${state.categories?.find(item => item.id == itemId)?.image}`)
            setTitle(`${state.categories?.find(item => item.id == itemId)?.title}`)
        }
    }

    useEffect(() => {
        CheckType()
    }, [itemId])


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update {type}</ModalHeader>
                <ModalCloseButton />
                {type === "product" ?
                    <ModalBody pb={4}>
                        <FormControl size={"sm"}>
                            <FormLabel>Image url</FormLabel>
                            <Input size={"sm"} value={image} onChange={(e) => setImage(e.target.value)} placeholder='Image url' type='url' />
                        </FormControl>

                        <FormControl mt={2}>
                            <FormLabel>Title</FormLabel>
                            <Input size={"sm"} value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' type='text' />
                        </FormControl>

                        <FormControl mt={2}>
                            <FormLabel>Price</FormLabel>
                            <Input size={"sm"} value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price' type="number" />
                        </FormControl>

                        <FormControl mt={2}>
                            <FormLabel>Description</FormLabel>
                            <Textarea rounded={"sm"} p={"5px"} resize={"none"} value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' type='text' />
                        </FormControl>
                    </ModalBody>
                    :
                    <ModalBody pb={4}>
                        <FormControl>
                            <FormLabel>Image url</FormLabel>
                            <Input size={"sm"} value={image} onChange={(e) => setImage(e.target.value)} placeholder='Image url' type='url' />
                        </FormControl>

                        <FormControl mt={2}>
                            <FormLabel>Title</FormLabel>
                            <Input size={"sm"} value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' type='text' />
                        </FormControl>
                    </ModalBody>}

                <ModalFooter>
                    <Button size={"sm"} rounded={"sm"} onClick={() => UpdateCategory(itemId)} colorScheme='blue' mr={3}>
                        Save
                    </Button>
                    <Button size={"sm"} rounded={"sm"} onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AlertUpdate

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useToast } from "@chakra-ui/react"
import axios from "axios"

import React, { useContext, useEffect } from 'react'
import { getCategories, getProducts } from "../../hooks/getDataAxios"
import MainContext from "../../store/context"

const AlertDelete = ({ isOpen, onOpen, onClose, itemId, url, type }) => {

    const { dispatch } = useContext(MainContext)
    const toast = useToast()

    async function checkDeleteProduct() {
        await axios.get(`http://localhost:3000/products`)
            .then((res) => {
                for(const product of res.data) {
                    if(!product.categoryId) {
                        axios.delete(`http://localhost:3000/products/${product.id}`)
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async function deleteProduct(id) {
        await axios.delete(`${url}/${id}`)
            .then((res) => {
                toast({
                    title: `Delete ${type}`,
                    status: "success",
                    isClosable: true,
                    position: "bottom-right"
                })
                {type === "category"? checkDeleteProduct() : ""}
            })
            .catch((err) => {
                toast({
                    title: `Error delete ${type}`,
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

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                onClose={onClose}
                size={"sm"}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete {type}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button size={"sm"} rounded={"sm"} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button size={"sm"} rounded={"sm"} colorScheme={"red"} onClick={() => deleteProduct(itemId)} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>

    )
}

export default AlertDelete

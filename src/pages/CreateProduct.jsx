import { Box, Button, FormControl, FormLabel, Input, Select, Textarea, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import MainContext from '../store/context'
import { getCategories } from '../hooks/getDataAxios'
import axios from 'axios'

const CreateProduct = () => {
  const { state, dispatch } = useContext(MainContext)
  const urlCat = "https://online-shop-o62f.onrender.com/categories"
  const urlPro = "https://online-shop-o62f.onrender.com/products"
  const toast = useToast()

  const [image, setImage] = useState("")
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [categoryId, setCatId] = useState("")

  useEffect(() => {
    getCategories(urlCat, dispatch)
  }, [])

  function setProduct(e) {
    e.preventDefault()
    const data = { title, price, image, description, categoryId }
    axios.post(urlPro, data)
      .then((res) => {
        toast({
          title: "Added product",
          status: "success",
          isClosable: true,
          duration: 2000,
          rounded: "sm",
          position: "bottom-right"
        })
      })
      .catch((err) => {
        toast({
          title: "Error adding product",
          status: "error",
          isClosable: true,
          duration: 2000,
          rounded: "sm",
          position: "bottom-right"
        })
      })
      setImage("")
      setTitle("")
      setPrice("")
      setDescription("")
      setCatId("")
  }

  return (
    <Box>
      <form onSubmit={(e) => setProduct(e)}>
        <FormControl>
          <FormLabel mb={0} mt={"10px"}>Image url</FormLabel>
          <Input value={image} onChange={(e) => setImage(e.target.value)} type='url' required rounded={"sm"} size={"sm"} placeholder='Enter the image url' />
        </FormControl>
        <FormControl>
          <FormLabel mb={0} mt={"10px"}>Name</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} type='text' required rounded={"sm"} size={"sm"} placeholder='Enter the name' />
        </FormControl>
        <FormControl>
          <FormLabel mb={0} mt={"10px"}>Price</FormLabel>
          <Input value={price} onChange={(e) => setPrice(e.target.value)} type='number' required rounded={"sm"} size={"sm"} placeholder='Enter the price' />
        </FormControl>
        <FormControl>
          <FormLabel mb={0} mt={"10px"}>Description</FormLabel>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} resize="none" rounded={"sm"} padding={"5px"}></Textarea>
        </FormControl>
        <FormControl>
          <FormLabel mb={0} mt={"10px"}>Category name</FormLabel>
          <Select placeholder='Select option' rounded={"sm"} value={categoryId} required onChange={(e) => setCatId(e.target.value)}>
            {state.categories?.map(item => (
              <option key={item.id} value={item.id}>{item.title}</option>
            ))}
          </Select>
        </FormControl>
        <Button size={"sm"} rounded={"sm"} float={"right"} colorScheme='blue' mt={"10px"} type='submit'>Submit</Button>
      </form>
    </Box>
  )
}

export default CreateProduct

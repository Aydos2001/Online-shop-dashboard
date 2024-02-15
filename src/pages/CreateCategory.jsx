import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'

const CreateCategory = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const url = "https://online-shop-o62f.onrender.com/categories"
  const toast = useToast()

  function setCategories(e) {
    e.preventDefault()
    const data = { title, image }
    axios.post(url, data)
      .then((res) => {
        toast({
          title: "Added category",
          status: "success",
          isClosable: true,
          duration: 2000,
          rounded : "sm",
          position : "bottom-right"
        })
      })
      .catch((err) => {
        toast({
          title: "Error adding category",
          status: "error",
          isClosable: true,
          duration: 2000,
          rounded : "sm",
          position : "bottom-right"
        })
      })
    setImage("")
    setTitle("")

  }

  return (
    <Box>
      <form onSubmit={(e) => setCategories(e)}>
        <FormControl mt={"10px"}>
          <FormLabel>Image url</FormLabel>
          <Input size={"sm"} value={image} onChange={(e) => setImage(e.target.value)} rounded={"sm"} required type='url' placeholder='Enter the image url' />
        </FormControl>
        <FormControl mt={"10px"}>
          <FormLabel>Name</FormLabel>
          <Input size={"sm"} value={title} onChange={(e) => setTitle(e.target.value)} rounded={"sm"} required type='text' placeholder='Enter the name' />
        </FormControl>
        <Button type='submit' mt={"10px"} float={"right"} colorScheme='blue' rounded={"sm"} size={"sm"}>Submit</Button>
      </form>
    </Box>
  )
}

export default CreateCategory

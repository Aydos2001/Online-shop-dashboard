import React, { useContext, useEffect, useState } from 'react'
import { getCategories, getProducts } from '../hooks/getDataAxios'
import MainContext from '../store/context'
import { Box, Button, Card, CardBody, Grid, GridItem, Skeleton, Stack, useDisclosure } from '@chakra-ui/react'
import ProductItem from '../components/pagesComponets/ProductItem'
import AlertDelete from '../components/pagesComponets/AlertDelete'
import AlertUpdate from '../components/pagesComponets/AlertUpdate'

const Products = () => {
  const { state, dispatch } = useContext(MainContext)
  const url = "https://online-shop-o62f.onrender.com/products"
  const Caturl = "https://online-shop-o62f.onrender.com/categories"
  const fakeArray = [0, 1, 2, 3, 4]
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure()
  const [itemId, setItemId] = useState()

  useEffect(() => {
    getCategories(Caturl, dispatch)
    getProducts(url, dispatch)
  }, [])

  


  return (
    <>
      {state.isProLoading && state.products.length == 0 ?
        <Box>
          <Grid gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr", xl: "1fr 1fr 1fr 1fr" }} gap={"10px"}>
            {fakeArray.map(item => (
              <GridItem key={item}>
                <Card rounded={"sm"}>
                  <CardBody padding={"10px"}>
                    <Stack>
                      <Skeleton height={"200px"} />
                      <Skeleton height={"20px"} />
                      <Skeleton height={"20px"} />
                      <Skeleton height={"20px"} />
                      <Skeleton height={"20px"} />
                      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"10px"}>
                        <Skeleton height={"40px"} width={"100%"} />
                        <Skeleton height={"40px"} width={"100%"} />
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Box> :
        <>

          <AlertUpdate isOpen={isUpdateOpen} state={state} onOpen={onUpdateOpen} onClose={onUpdateClose} url={url} itemId={itemId} type={"product"} />
          <AlertDelete isOpen={isDeleteOpen} onClose={onDeleteClose} onOpen={onDeleteOpen} url={url} itemId={itemId} type={"product"} />
          <Grid gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr", xl: "1fr 1fr 1fr 1fr" }} gap={"10px"}>

            {state.products?.map(item => (
              <GridItem key={item.id}>
                <ProductItem item={item} onDeleteOpen={onDeleteOpen} onUpdateOpen={onUpdateOpen} setItemId={setItemId} />
              </GridItem>
            ))}
          </Grid>
        </>}
    </>
  )
}

export default Products

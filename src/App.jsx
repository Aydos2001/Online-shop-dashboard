import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Box, HStack, useColorModeValue } from '@chakra-ui/react'
import React, { useReducer, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import LayoutContent from './components/LayoutContent'
import Categories from './pages/Categories'
import Products from './pages/Products'
import CreateCategory from './pages/CreateCategory'
import CreateProduct from './pages/CreateProduct'
import MainContext from './store/context'
import { initialState, reducer } from './store/reducer'

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)
  const [showDash, setShowDash] = useState(false)

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      <HStack width={"100%"} alignItems={"start"} gap={"0"}>
        <Box width={"250px"} position={{ base: "absolute", md: "relative" }} transition={"ease .5s"} zIndex={"999"} left={{ base: showDash ? "0px" : "-250px", md: "0px" }} backgroundColor={useColorModeValue("purple.600", "gray.900")} height={"100vh"} borderRight={"1px"} borderColor={"whiteAlpha.400"}>
          <Sidebar setShowDash={setShowDash} />
          <Box display={{ sm: "flex", md: "none" }} onClick={() => setShowDash(!showDash)}  position={"absolute"} cursor={"pointer"} roundedRight={"lg"} py={"20px"} pr={"4px"} right={"-20px"} backgroundColor={useColorModeValue("purple.600", "gray.900")} top={"50%"} border={"1px"} borderLeft={"0"} borderColor={"whiteAlpha.400"} justifyContent={"center"} alignItems={"center"} color={"white"}>
            {showDash ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </Box>
        </Box>
        <Box width={{ sm: "100%", md: "calc(100% - 250px)" }}>
          <Header />
          <Routes>
            <Route path='/' element={<LayoutContent />}>
              <Route path='/' element={<Categories />} />
              <Route path='/products' element={<Products />} />
              <Route path='/create-category' element={<CreateCategory />} />
              <Route path='/create-product' element={<CreateProduct />} />
            </Route>
          </Routes>
        </Box>
      </HStack>
    </MainContext.Provider>
  )
}

export default App

import { FaCartPlus } from "react-icons/fa"; 
import { BiListPlus } from "react-icons/bi"; 
import { BsBasket2Fill } from "react-icons/bs"; 
import { BiCategoryAlt } from "react-icons/bi"; 

const btnData = [
    {
        id : 1,
        icon : BiCategoryAlt,
        title : "Categories",
        path : "/"
    },
    {
        id : 2,
        icon : BsBasket2Fill,
        title : "Products",
        path : "/products"
    },
    {
        id : 3,
        icon : BiListPlus,
        title : "Create categories",
        path : "/create-category"
    },
    {
        id : 4,
        icon : FaCartPlus,
        title : "Create product",
        path : "/create-product"
    }
]

export default btnData
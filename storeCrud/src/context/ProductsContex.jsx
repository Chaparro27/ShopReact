import { createContext, useContext, useState } from "react";
import {
createProductRequest,
deleteProductRequest,
getProductsRequest,
getProductRequest,
updateProductRequest,
} from "../api/products";

    const ProductContext = createContext();

    export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error("useProducts must be used within a TaskProvider");
    return context;
    };

    export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const res = await getProductsRequest();
        //console.log(res.data.products)
        setProducts(res.data.products);
    };

    const deleteProduct = async (id) => {
        try {
        const res = await deleteProductRequest(id);
        console.log(res.data);
        if (res.status === 200) setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
        console.log(error);
        }
    };

    const createProduct = async (product) => {
        try {
        const res = await createProductRequest(product);
        console.log(res.data);
        } catch (error) {
        console.log(error);
        }
    };

    const getProduct = async (id) => {
        try {
        const res = await getProductRequest(id);
        return res.data;
        } catch (error) {
        console.error(error);
        }
    };

    const updateProduct = async (id, product) => {
        try {
        const res=await updateProductRequest(id, product);
        console.log(res.data);
        
        } catch (error) {
        console.error(error);
        }
    };

    return (
        <ProductContext.Provider
        value={{
            products,
            getProduct,
            deleteProduct,
            createProduct,
            getProducts,
            updateProduct,
        }}
        >
        {children}
        </ProductContext.Provider>
    );
    }
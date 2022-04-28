import styled from 'styled-components';
import { useEffect, useState } from "react";
import Product from './Product';
import axios from 'axios';
import Pagination from './Pagination';
import Loader from './Loader';

const Container = styled.div`
    width: 100%;
    margin: 0px;
`;
const ProductsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const PaginationContainer = styled.div`
    width: 100%;
`;
const Products = ({cat,filters,sort}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(()=>{
        const getProducts = async () => {
            try {
               const res = await axios.get(
                   cat 
                   ? `https://lisafolawiyo-app.herokuapp.com/api/products?category=${cat}`
                   : "https://lisafolawiyo-app.herokuapp.com/api/products"
                );
                setProducts(res.data);
                setFilteredProducts(res.data);
            } catch (err) {}
        };
        getProducts();
    },[cat]);
    
    useEffect(() => {
        cat &&
        setFilteredProducts(
            products.filter((item) =>
             Object.entries(filters).every(([key, value]) =>
                item[key].includes(value)
             )
            )
        );
    }, [products, cat, filters]);

    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts((prev) => 
                [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            );
        } else if (sort === "asc"){
            setFilteredProducts((prev) => 
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setFilteredProducts((prev) => 
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort]);

    // PAGINATION
    // const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
            

    return ( 
            <Container>
                <ProductsContainer>
                    {products.length >= 1 && (() => {
                        if (cat || sort) {
                            return (filteredProducts.slice(indexOfFirstPost, indexOfLastPost).map((item) => <Product item={item} key={item._id} />))
                        } else {     
                            return (products.slice(indexOfFirstPost, indexOfLastPost).map((item) =><Product item={item} key={item._id} />))
                        }
                    })()}
                    {products.length === 0 && <><Loader type="products" /><Loader type="products"/><Loader type="products"/><Loader type="products"/><Loader type="products"/><Loader type="products"/><Loader type="products"/><Loader type="products" /></>}
                    {/* {products.length === 0 && (() => {
                        return (products.slice(indexOfFirstPost, indexOfLastPost).map((item) =><Loader />))
                    })()} */}

                </ProductsContainer>
                <PaginationContainer>
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={products.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </PaginationContainer>
            </Container>
            
     );
}
 
export default Products;
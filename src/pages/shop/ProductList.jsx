import styled from 'styled-components';
import Products from '../../components/Products';
import { mobile } from "../../responsive";
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { ExpandMoreOutlined} from '@material-ui/icons';


const Container = styled.div`
    width: 100%;
    padding: 0px 30px;
    ${mobile({ 
      padding: "0px 20px"
    })}
`;
const ShopContainer = styled.div`
    margin-top: 120px;
    margin-bottom: 80px;
    padding: 0px 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    ${mobile({ 
      padding: "0px 0px"
    })}
`;
const ShopSidebar = styled.div`
  width: 15%;
  ${mobile({ 
      display: "none"
    })}
`;
const ProductsWrap = styled.div`
  width: 80%;
  ${mobile({ 
      width: "100%"
    })}
`;
const SidebarTitle = styled.h1`
    font-size: 16px;
    font-weight: 600;
    color: #000;
`;
const SidebarCategoryWrapper = styled.div`
    margin-top: 20px;
    margin-bottom: 50px;
`;
const ProductCategories = styled.div`
    margin: 15px 0px;
`;
const ProductCategoryName = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #08080850;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
        color: #f7238d;
    }
`;
const FilterContainer = styled.div`
    margin-bottom: 20px;
`;
const Filter = styled.div`
    width: 200px;
    margin: 0px;
    padding: 0px 7px;
    border: 1px solid #00000030;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    ${mobile({ })}
`;
const FilterText = styled.span`
    font-size: 14px;
    font-weight: 600;
    margin-right: 20px;
    color: #00000060;
    ${mobile({ marginRight: "0px" })}
`;
const DropDownContainer = styled.div`
`;
const DropDownHeadWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const DropDownHeader = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: #000;
`;
const DropDownListContainer = styled.div`
  position: absolute;
  z-index: 8;
`;
const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  padding: 0px 14px;
  background: #ffffff;
  border: 2px solid #000;
  box-sizing: border-box;
  color: #000;
  font-size: 13px;
    font-weight: 600;
  &:first-child {
    padding-top: 0.8em;
  }
`;
const CListItem = styled.li`
  list-style: none;
  margin-bottom: 0.8em;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    color: #f7238d;
  }
`;
const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[3];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");


    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value,
        });
    };
    
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [selectedOptionFilter, setSelectedOptionFilter] = useState(null);
  
    const togglingFilter= () => setIsOpenFilter(!isOpenFilter);


    const onOptionClickedFilter = (value, key) => () => {
        setSort(value);
        setSelectedOptionFilter(key);
        setIsOpenFilter(false);
    };

    return ( 
            <Container>
                <ShopContainer>
                    <ShopSidebar>
                        <SidebarTitle>
                            CATEGORIES
                        </SidebarTitle>
                        <SidebarCategoryWrapper>
                            <ProductCategories>
                                <Link to={`/shop/products/`} style={{ textDecoration: 'none' }}>
                                    <ProductCategoryName>
                                        All Items
                                    </ProductCategoryName>
                                </Link>
                            </ProductCategories>
                            <ProductCategories>
                                <Link to={`/shop/products/dress`} style={{ textDecoration: 'none' }}>
                                    <ProductCategoryName>
                                        Tshirts
                                    </ProductCategoryName>
                                </Link>
                            </ProductCategories>
                            <ProductCategories>
                                <Link to={`/shop/products/top`} style={{ textDecoration: 'none' }}>
                                    <ProductCategoryName>
                                        Shorts
                                    </ProductCategoryName>
                                </Link>    
                            </ProductCategories>
                            <ProductCategories>
                                <ProductCategoryName>
                                    Skirts
                                </ProductCategoryName>
     
                            </ProductCategories>
                            <ProductCategories>
                                <ProductCategoryName>
                                    Jackets
                                </ProductCategoryName>
          
                            </ProductCategories>
                        </SidebarCategoryWrapper>

                        <SidebarTitle>
                            COLLECTIONS
                        </SidebarTitle>
                        <SidebarCategoryWrapper>
                            <ProductCategories>
                                <ProductCategoryName>
                                    LF Essentials
                                </ProductCategoryName>
     
                            </ProductCategories>
                            <ProductCategories>
                                <ProductCategoryName>
                                    COLL SS 2020
                                </ProductCategoryName>      
                            </ProductCategories>
                        </SidebarCategoryWrapper>

                    </ShopSidebar>

                    <ProductsWrap>
                        <FilterContainer>
                            <Filter onClick={togglingFilter}>
                                <FilterText>Sort By:</FilterText>
                                <DropDownContainer>
                                    <DropDownHeadWrap>
                                        <DropDownHeader>
                                        {selectedOptionFilter || "Newest" }
                                        </DropDownHeader>
                                        <ExpandMoreOutlined style={{ color: '#f7238d' }}/>
                                    </DropDownHeadWrap>
                                    {isOpenFilter && (
                                    <DropDownListContainer>
                                        <DropDownList>
                                            <CListItem onClick={onOptionClickedFilter("Newest", "Newest")} key="1">
                                                Newest
                                            </CListItem>
                                            <CListItem onClick={onOptionClickedFilter("asc", "Price (Lowest)")} key="2">
                                                 Price (Lowest)
                                            </CListItem>
                                            <CListItem onClick={onOptionClickedFilter("desc", "Price (Highest)")} key="3">
                                                Price (Highest)
                                            </CListItem>
                                        </DropDownList>
                                    </DropDownListContainer>
                                    )}
                                </DropDownContainer>
                            </Filter>
                        </FilterContainer>
                        <Products cat={cat} filters={filters} sort={sort}/>

                    </ProductsWrap>
                </ShopContainer>          
            </Container>
     );
}
 
export default ProductList;
import styled from 'styled-components';
import { Add, Remove, ExpandMoreOutlined} from '@material-ui/icons';
import { mobile } from "../../responsive";
import { publicRequest } from "../../requestMethods";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addProduct } from '../../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import ProductImgSlider from '../../components/ProductImgSlider';
import Loader from '../../components/Loader';


const Container = styled.div`
    width: 100%;
    ${mobile({ 
 
    })}
`;
const ShopContainer = styled.div`
    margin-top: 120px;
    margin-bottom: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0px 30px;
    ${mobile({ 
        flexDirection: "column",
        position: "fixed",
        height: "100vh",
        top: "80",
        marginTop: "0px",
        marginBootm: "0px",
        padding: "0px 0px",
        zIndex: "2"
    })}
`;
const ImageWrapper = styled.div`
  width: 40%;
  margin-right: 40px;
  ${mobile({ 
        width: "100%",
        marginRight: "0px"
    })}
`;

const DetailWrapper = styled.div`
  width: 35%;
  ${mobile({ 
        display: "none"
    })}
`;
const Title = styled.h1`
    font-weight: 600;
    font-size: 35px;
    color: #000;
`;
const Desc = styled.p`
    margin: 20px 0px;
    font-weight: 300;
    font-size: 18px;
    color: #000;
`;
const Price = styled.span`
    font-weight: 600;
    font-size: 30px;
    color: #f7238d;
`;
const Options = styled.div`
    width: 100%;
    margin-top: 20px;
`;
const SizeQty = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
`;
const FilterWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px;
    padding: 0px;
`;
const ErrorMsg = styled.span`
    font-size: 14px;
    font-weight: 300;
    color: red;
    padding: 0px;
    margin: 0px;
    display: ${props=> props.dragging === true ? 'block' : 'none'};
`;
const Filter = styled.div`
    width: 150px;
    margin-right: 10px;
    padding: 10px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #000;
    cursor: pointer;
`;
const FilterTitle = styled.span`
    font-size: 14px;
    font-weight: 300;
    color: #ffffff60;
`;
const DropDownContainer = styled.div`
    margin: 0px;
`;
const DropDownHeadWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px;
    padding: 0px;
`;
const DropDownHeader = styled.div`
    margin-right: 10px;
    color: #fff;
    border: none;
    background-color: transparent;
`;
const DropDownListContainer = styled.div`
  position: absolute;
  z-index: 8;
`;
const DropDownList = styled.ul`
    margin: 0;
    padding: 0px 14px;
    background: #ffffff;
    border: 2px solid #000;
    box-sizing: border-box;
    color: #000;
    font-size: 14px;
    font-weight: 600;
  &:first-child {
    padding-top: 0.8em;
  }
`;
const ListItem = styled.li`
  list-style: none;
  margin-bottom: 0.8em;
  transition: all 0.3s ease;
  &:hover {
    color: #f7238d;
  }
`;
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;
const Amount = styled.span`
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
`;
const Button = styled.button`
    width: 310px;
    font-weight: 600;
    font-size: 14px;
    padding: 15px;
    background-color: #000;
    color: #ffffff;
    border: none;
    cursor: pointer;
    margin-bottom: 10px;
    transition: all 1.5s ease;
    &:hover{
        color: #f7238d;
    }
`;
const WhatsAppBtn = styled.div`
    width: 310px;
    padding: 15px;
    border: 2px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const WhatsAppText = styled.span`
    font-weight: 600;
    font-size: 14px;
    color: #000;
`;
const ProductDescContainer = styled.div`
    width: 100%;
    height: 350px;
    margin-top: 20px;
    padding: 40px 15% 10px 15%;
    background-color: #f0efef;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    ${mobile({ 
        display: "none"
    })}
`;
const PDCTitleWrap = styled.span`
    display: flex;
    margin-bottom: 40px;
`;
const PDCTitle= styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #00000050;
    margin-right: 20px;
    padding-bottom: 5px;
    border-bottom: ${props=> props.active === true && "1px solid #f7238d"};
    cursor: pointer;
    transition: all 0.2s ease;
    &:nth-child(2) {
        margin-right: 0px;
    }
    &:hover {
        color: #00000090;
    }
`;
const PDCBody = styled.p`
    width: 100%;
    height: 200px;
    font-size: 14px;
    font-weight: 300;
    color: #474747;
    text-align: center;
`;
const PDCstockist = styled.span`
    font-size: 14px;
    font-weight: 300;
    color: #474747;
    text-align: center;
    display: block;
    margin-bottom: 3px;
`;
const PDCS = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #1f1e1e;
`;
const Hr = styled.div`
    width: 100%;
    height: 1px;
    background-color: #f3f3f3;
    margin-bottom: 30px;
`;
const AffirmAddToCart = styled.div`
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    position: fixed;
    background-color: #00000050;
    z-index: 20;
    transition: all 0.2s ease;
    ${({ dragging }) => dragging ? 'display: flex;' : 'display: none;'}
    align-items: center;
    justify-content: center;
`;
const Affirm = styled.div`
    width: 400px;
    height: 250px;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
`;
const AffirmProduct = styled.span`
    font-size: 21px;
    font-weight: 600;
    color: #000;
    display: block;
`;
const AffirmText = styled.span`
    font-size: 14px;
    font-weight: 300;
    color: #000;
    margin-top: 5px;
    display: block;
`;
const AffirmBtn = styled.span`
    font-size: 14px;
    font-weight: 600;
    padding: 10px 10px;
    margin-top: 30px;
    color: #fff;
    background-color: #f7238d;
    display: block;
    cursor: pointer;
`;

const Product = ({item}) => {
    const location = useLocation();
    const id = location.pathname.split("/")[3];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");
    const dispatch = useDispatch();
    const [isErrorMsg, setIsErrorMsg] = useState(false);

    const currency = useSelector(state=>state.currency.currency);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/" + id);
                setProduct(res.data);
            } catch {}
        };
        getProduct();
    }, [id]);

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const handleClick = () => {
        if (size === "") {
            setIsErrorMsg(true);         
        }else {
            dispatch(addProduct({ ...product,  quantity, size }));
            setIsCartPop(true);
            setIsErrorMsg(false);
        }
    };

    const [isOpenSize, setIsOpenSize] = useState(false);
    const [selectedOptionSize, setSelectedOptionSize] = useState(null);
  
    const togglingSize = () => setIsOpenSize(!isOpenSize);
  
    const onOptionClickedSize = value => () => {
        setSize(value);
        setSelectedOptionSize(value);
        setIsOpenSize(false);
    };

    // Add To Cart Popup
    const [isCartPop, setIsCartPop] = useState(false);

    const affirmCart = () => {
        setIsCartPop(false);
    };

    //WhatsApp
    let productName = "";
    let whatsAppMsg = "";
    if (Object.keys(product).length >= 1) {
        productName =  product.title.replace(/ /g,"+");
        whatsAppMsg = 'Hi%2C+I%27m+interested+in+your+' + productName;
    }

    //Product Description
    const [propertyName, setPropertyName] = useState("stockist");
    const [activeProperty, setActiveProperty] = useState([true, false]);
    const Stockist = <>
     <PDCstockist><PDCS>Temple Muse:</PDCS> 2 Musa Yar’Adua St,Victoria Island, Lagos</PDCstockist>
     <PDCstockist><PDCS>Industrie Africa:</PDCS> www.indisutrieafrica.com</PDCstockist>
     <PDCstockist><PDCS>Moda Operandi:</PDCS> www.modaoperandi.com</PDCstockist>
     <PDCstockist><PDCS>Matches Fashion:</PDCS> www.matchesfashion.com</PDCstockist>
     <PDCstockist><PDCS>Aby Concept:</PDCS> www.abyconcept.com</PDCstockist>
     <PDCstockist><PDCS>Shop Mcmullen:</PDCS> 2257 Broadway, Oakland, California</PDCstockist>
    </>;
    const [productDetails, setProductDetails] = useState({
        stockist: Stockist,
        description: ""
    });
    useEffect(() => {
        setProductDetails({...productDetails, description: product.desc});
    }, [product]);

    const handleDescription = (name) => {
        if(name === 'stockist') {
            setActiveProperty([true, false]);
        } else {
            setActiveProperty([false, true]);
        }
        
        setPropertyName(name);
    };


    return ( 
            <Container>
                {
                    Object.keys(product).length >= 1 && 
                    <>
                        <ShopContainer>
                            <ImageWrapper>
                                <ProductImgSlider items={product.img}/>
                            </ImageWrapper>
                            <DetailWrapper>
                                <Title>{product.title}</Title>
                                <Desc>
                                    {product.desc}
                                </Desc>
                                <Price>
                                    {currency.symbol}
                                    {(product.price * currency.rate).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                </Price>
                                <Options>
                                    <SizeQty>
                                        <FilterWrap>
                                            <Filter onClick={togglingSize}>
                                                <FilterTitle>SIZE:</FilterTitle>
                                                    <DropDownContainer>
                                                        <DropDownHeadWrap>
                                                            <DropDownHeader>
                                                            {selectedOptionSize || "S" }
                                                            </DropDownHeader>
                                                            <ExpandMoreOutlined style={{ color: '#f7238d' }}/>
                                                        </DropDownHeadWrap>
                                                        {isOpenSize && (
                                                        <DropDownListContainer>
                                                            <DropDownList>
                                                            {product.size.map(option => (
                                                                <ListItem onClick={onOptionClickedSize(option)} key={Math.random()}>
                                                                {option}
                                                                </ListItem>
                                                            ))}
                                                            </DropDownList>
                                                        </DropDownListContainer>
                                                        )}
                                                    </DropDownContainer>
                                            </Filter>
                                            <ErrorMsg dragging={isErrorMsg}>Select a size</ErrorMsg>
                                        </FilterWrap>
                                        <FilterWrap>
                                            <Filter >
                                                <FilterTitle>QTY:</FilterTitle>
                                                <AmountContainer>
                                                    <Amount>{quantity}</Amount>
                                                    <Remove 
                                                        onClick={()=>handleQuantity("dec")}
                                                        style={{ color: '#f7238d', marginRight: 5 }}
                                                    />
                                                    <Add 
                                                        onClick={()=>handleQuantity("inc")}
                                                        style={{ color: '#f7238d' }}
                                                    />
                                                </AmountContainer>

                                            </Filter>
                                            {/* <ErrorMsg>Select a size</ErrorMsg> */}
                                        </FilterWrap>
                                    </SizeQty>
                                </Options>
                                <Button onClick={handleClick}>ADD TO BAG</Button>
                                <a 
                                    href={`https://wa.me/2348062181323?text=${whatsAppMsg}`}
                                    target="_blank"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <WhatsAppBtn>
                                        <WhatsAppText>CHAT ON WHATSAPP</WhatsAppText>
                                    </WhatsAppBtn>
                                </a>
                            </DetailWrapper>

                        </ShopContainer>

                        <ProductDescContainer>
                            <PDCTitleWrap>
                                <PDCTitle key="0" active={activeProperty[0]} onClick={() => handleDescription('stockist')}>STOCKIST</PDCTitle>
                                <PDCTitle key="1" active={activeProperty[1]} onClick={() => handleDescription('description')}>DESCRIPTION</PDCTitle>
                            </PDCTitleWrap>
                            <PDCBody>
                                {
                                    productDetails[propertyName]
                                }
                            </PDCBody>
                        </ProductDescContainer>
                        <AffirmAddToCart dragging={isCartPop}>
                            <Affirm>
                                <AffirmProduct>{product.title}</AffirmProduct>
                                <AffirmText>is added to your bag</AffirmText>
                                <AffirmBtn onClick={affirmCart}>OK</AffirmBtn>
                            </Affirm>
                        </AffirmAddToCart>
                    </>
                }
                {
                    Object.keys(product).length === 0 && <ShopContainer><Loader type="product" /></ShopContainer>
                }
            </Container>
     );
}
 
export default Product;
import styled from 'styled-components';
import { Add, Remove, ClearOutlined } from "@material-ui/icons";
import { mobile } from "../../responsive";
import {useState, useEffect} from 'react';
import {userRequest} from "../../requestMethods";
import { useNavigate } from "react-router-dom";
import { removeProduct, increaseCart, decreaseCart } from '../../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";



const Container = styled.div`
    width: 100%;
    padding: 0px 30px;
`;
const CartWrap = styled.div`
    margin-bottom: 80px;
    width: 100%;
    margin-top: 120px;
    display: flex;
    justify-content: center;
    ${mobile({
        flexDirection: "column",
        alignItems: "center"
    })}
`;
const OrderItems = styled.div`
  width: 60%;
  margin-right: 40px;
  ${mobile({
        width: "100%",
        marginRight: "0px"
    })}
`;
const CartHead = styled.h1`
    font-size: 24px;
    font-weight: 700;
    color: #000;
    margin-bottom: 40px;
    ${mobile({
        textAlign: "center"
    })}
`;
const OrderSummary= styled.div`
  width: 25%;
  ${mobile({
        width: "100%",
        marginTop: "40px",
        alignItems: "center"
    })}
`;
const Header = styled.div`
  width: 100%;
  margin-bottom: 30px;
  ${mobile({
        display: "none"
    })}
`;
const Item = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 40px;
  ${mobile({

    })}
`;
const ImageTitle = styled.div`
  width: 45%;
  display: flex;
  ${mobile({
        width: "45%",
        flexDirection: "column"
    })}
`;
const ItemColB= styled.div`
    width: 55%;
    display: flex;
    ${mobile({
        width: "55%",
        flexDirection: "column"
    })}
`;
const ItemSize = styled.div`
  width: 15%;
  ${mobile({
        width: "100%",
        textAlign: "right",
        marginBottom: "10px"
    })}
`;
const ItemQuantity = styled.div`
  width: 40%;
  ${mobile({
        width: "100%",
        display: "block",
        marginBottom: "10px"
    })}
`;
const ItemPrice = styled.div`
  width: 30%;
  ${mobile({
        width: "100%",
        textAlign: "right",
        marginBottom: "10px"
    })}
`;
const ItemDelete = styled.div`
  width: 10%;
  ${mobile({
        width: "100%",
        display: "block",
        float: "right",
        textAlign: "right"
    })}
`;
const ItemTitle = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #00000040;
`;
const Image = styled.img`
    width: 25%;
    object-fit: cover;
    margin-right: 8%;
    ${mobile({
        width: "70%",
        marginBottom: "5px"
    })}
`;
const Name = styled.span`
    width: 65%;
    font-size: 14px;
    font-weight: 600;
    margin-right: 10px;
    color: #000;
    ${mobile({
        width: "100%",
    })}
`;
const Size = styled.span`
    font-size: 14px;
    font-weight: 300;
    color: #000000;
`;
const Price = styled.span`
    font-size: 14px;
    font-weight: 300;
    color: #000000;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  ${mobile({
        width: "100%",
        display: "block",
        float: "right",
        textAlign: "right"
    })}
`;
const ProductAmount = styled.span`
  font-size: 14px;
  font-weight: 600;
  ${mobile({ 

   })}
`;
const Hr = styled.hr`
    width: 100%;
    background-color: #00000020;
    border: none;
    height: 1px;
    margin: 0px 0px 40px 0px;
    display: none;
    &:last-child {
        display: none;
    }
    ${mobile({
        display: "block"
    })}
`;
const Summary = styled.div`
    padding: 10px 20px;
    margin-bottom: 20px;
    background-color: #fcf6f9;
`;
const SummaryItem = styled.div`
  margin: 15px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span`
    font-size: 13px;
    font-weight: 600;
    color: #00000060;
`;
const SummaryItemPrice = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #00000080;
`;
const TotalPrice = styled.span`
    font-size: 21px;
    font-weight: 600;
    color: #000;
`;
const Button = styled.button`
  width: 180px;
  padding: 15px 10px;
  font-weight: 600;
  font-size: 14px;
  background-color: black;
  border: none;
  color: white;
  float: right;
  transition: all 0.3s ease;
  &:hover {
        color: #f7238d;
    }
`;

const Cart = () => {
    const cart = useSelector(state=>state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currency = useSelector(state=>state.currency.currency);

    const removeCartItem = (product)=>{
        dispatch(removeProduct(product));
    };

    const decreaseCartQuantity = (cartItem) => {
        dispatch(decreaseCart(cartItem));
    };

    const increaseCartQuantity = (cartItem) => {
        dispatch(increaseCart(cartItem));
    };

    return ( 
            <Container>
                <CartWrap>
                    <OrderItems>
                        <CartHead>YOUR BAG</CartHead>
                        <Header>
                            <Item>
                                <ImageTitle>
                                    <ItemTitle>Product</ItemTitle>
                                </ImageTitle>
                                <ItemColB>
                                    <ItemSize>
                                        <ItemTitle>Size</ItemTitle>
                                    </ItemSize>
                                    <ItemQuantity>
                                        <ItemTitle>Quantity</ItemTitle>
                                    </ItemQuantity>
                                    <ItemPrice>
                                        <ItemTitle>Price</ItemTitle>
                                    </ItemPrice>
                                    <ItemDelete>
                                    </ItemDelete>
                                </ItemColB>
                            </Item>
                        </Header>
                        {cart.products.map((product) => (
                            <>
                            <Item>
                                <ImageTitle>
                                    <Image src={product.img}/>
                                    <Name>{product.title}</Name>
                                </ImageTitle>
                                <ItemColB>
                                    <ItemSize>
                                        <Size>{product.size}</Size>
                                    </ItemSize>
                                    <ItemQuantity>
                                        <ProductAmountContainer>
                                            <Remove
                                                style={{ color: '#f7238d', fontSize: 21, marginRight: 10 }}
                                                onClick={()=>decreaseCartQuantity(product)}
                                            />
                                            <ProductAmount>{product.quantity}</ProductAmount>                  
                                            <Add 
                                                style={{ color: '#f7238d', fontSize: 21, marginLeft: 10 }}
                                                onClick={()=>increaseCartQuantity(product)}
                                            />
                                        </ProductAmountContainer>
                                    </ItemQuantity>
                                    <ItemPrice>
                                        <Price>
                                            {currency.symbol}
                                            {((product.price * product.quantity) * currency.rate).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                        </Price>
                                    </ItemPrice>
                                    <ItemDelete>
                                        <ClearOutlined
                                            style={{ color: '#f7238d80', fontSize: 21 }}
                                            onClick={() => removeCartItem(product)} 
                                        />
                                    </ItemDelete>
                                </ItemColB>
                            </Item>
                             <Hr />
                            </>
                        ))}
                    </OrderItems>
                    <OrderSummary>
                        <CartHead>SUMMARY</CartHead>
                        <Summary>
                            <SummaryItem>
                                <SummaryItemText>ITEM TOTAL:</SummaryItemText>
                                <SummaryItemPrice>
                                    {currency.symbol}
                                    {(cart.total * currency.rate).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                </SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>DISCOUNT:</SummaryItemText>
                                <SummaryItemPrice>0</SummaryItemPrice>
                            </SummaryItem>
                            <Hr />
                            <SummaryItem type="total">
                                <SummaryItemText>SUBTOTAL:</SummaryItemText>
                                <TotalPrice>
                                    {currency.symbol}
                                    {(cart.total * currency.rate).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                </TotalPrice>
                            </SummaryItem>
                        </Summary>
                        { cart.products.length > 0 &&
                                <Link to="/billing/customer_info">
                                    <Button>PLACE ORDER</Button>
                                </Link>
                            }
                    </OrderSummary>
                </CartWrap>
            </Container>
     );
}

export default Cart;
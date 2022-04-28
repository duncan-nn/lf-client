import React, {useState} from 'react'; 
import styled, { keyframes } from 'styled-components';
import {Badge} from '@material-ui/core';
import { ShoppingBasketOutlined } from '@material-ui/icons';
import LogoWhite from '../../assets/images/logo-white.png';
import { mobile } from '../../responsive';
import { Link } from "react-router-dom";
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import { getCurrency } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { ExpandMoreOutlined, ClearOutlined} from '@material-ui/icons';

const Container = styled.div`
    width: 100%;
`;
const Overlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0px;
    background-color: rgba(0,0,0,0.8);
    transition: all 0.5s ease;
    display: ${props=>props.check === true ? "block" : "none"};
    z-index: 10;
`;
const Logo = styled.img`
    width: 100px;
    position: fixed;
    top: 30px;
    left: 40px;
    z-index: 11;
    ${mobile({ 
        display: "none"
    })}
`;
const MenuItem = styled.div`
    position: fixed;
    top: 27px;
    right: 100px;
    font-size: 14px;
    cursor: pointer;
    z-index: 11;
    ${mobile({
        left: "40px"
     })}
`;
const CurrencySwitch = styled.div`
    position: fixed;
    width: 70px;
    padding: 0px 5px;
    top: 27px;
    right: 150px;
    font-size: 14px;
    border: 1px solid #ffffff30;
    cursor: pointer;
    z-index: 11;
    ${mobile({
        left: "50%",
        marginLeft: "-35px"
     })}
`;
const DropDownContainer = styled.div`
    width: 100%;
`;
const DropDownHeadWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const DropDownHeader = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: #ffffff60;
`;

const DropDownListContainer = styled.div`
  position: absolute;
  z-index: 8;
  ${mobile({

    })}
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
  &:hover {
    color: #f7238d;
  }
`;
const StyledBadge = styled(Badge)({
    "& .MuiBadge-badge": {
      color: "#fff",
      backgroundColor: "#f7238d"
    }
  });
const OverHead = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 80px;
    background-color: #000;
    z-index: 9;
`;

const Wrapper = styled.div`
    position: fixed;
    width: 270px;
    height: 100vh;
    bottom: 0px;
    top: 0px;
    right: 0px;
    padding-right: 40px;
    background-color: #080808;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    box-sizing: border-box;
    z-index: 13;
    transition: all 0.5s ease;
    box-shadow: 3px 2px 8px -3px rgba(0,0,0,0.62);
    -webkit-box-shadow: 3px 2px 8px -3px rgba(0,0,0,0.62);
    -moz-box-shadow: 3px 2px 8px -3px rgba(0,0,0,0.62);
    transform: ${props=>props.check === true ? "translateX(0px)" : "translateX(270px)"};
    @media (max-width: 768px) {
        transform: ${props=>props.check === true ? "translateX(-100%)" : "translateX(100%)"};
    }
    ${mobile({
        width: "100%",
        right: "-100%",
        alignItems: "center",
        paddingRight: "0px"
    })}
`;

const MenuWrap = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    bottom: 0;
    ${mobile({
        alignItems: "center"
    })}
`;

// const SearchContainer = styled.div`
//     margin-top: 100px;
//     margin-bottom: 50px;
//     position: relative;
//     &:after {
//         content: "";
//         background: #ffffff;
//         width: 2px;
//         height: 10px;
//         position: absolute;
//         top: 21px;
//         right: 1px;
//         transform: rotate(135deg);
//     }
//     ${mobile({ 
        
//     })}
// `;
// const SearchInput = styled.input`
//     color: #fff;
//     font-size: 16px;
//     background: transparent;
//     width: 25px;
//     height: 25px;
//     padding: 10px;
//     border: solid 2px #fff;
//     outline: none;
//     border-radius: 35px;
//     transition: width 0.5s;
//     &:focus {
//         width: 200px;
//     }
// `;

const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    list-style: none;
    margin-top: 110px;
    margin-bottom: 50px;
    padding: 0;
    ${mobile({
        alignItems: "center"
    })}
`;

const ListItem = styled.li`
    margin: 0px;
    margin-bottom: 30px;
    font-weight: 600;
    font-size: 25px;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        color: #f7238d;
    }
    ${mobile({ 

    })}
`;
const WatchFilmWrap = styled.div`
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    justify-content: center;   
`;
const FilmText = styled.span`
    font-weight: 600;
    font-size: 11px;
    color: #fff;
    letter-spacing: 2px;
    margin-right: 15px;
    transition: all 0.3s ease;
    &:hover {
        color: #f7238d;
    }
`;
const pulse = keyframes`
    0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
        }
    70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(255,255,255,0);
        }
    100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(255, 255, 255,0);
        }
`;
const Circle = styled.div`
    width: 15px;   
    height: 15px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%);
    cursor: pointer;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
	transform: scale(1);
    animation-name: ${pulse};
    animation-duration: 2s;
    animation-iteration-count: infinite;
`;

const BarCheck = styled.input.attrs({ type: 'checkbox' })`
    position: absolute;
    width: 35px;
    height: 35px;
    top: 20px;
    right: 20px;
    opacity: 0;
    z-index: 16;
    display: block;
    cursor: pointer;
    ${mobile({ 

    })}
`;

const Bar = styled.span`
    background: #fff;
    display: block;
    height: 2px;
    position: relative;
    transition: all 0.2s ease;
    width: 18px;
    display: block;
    z-index: 15;
    &:before {
        background: #fff;
        content: '';
        display: block;
        height: 100%;
        position: absolute;
        transition: all .2s ease-out;
        width: 100%;
        top: 5px;
    }
    &:after {
        background: #fff;
        content: '';
        display: block;
        height: 100%;
        position: absolute;
        transition: all .2s ease-out;
        width: 100%;
        top: -5px;
    }
    ${mobile({ 

    })}
`;

const BarWrap = styled.div`
    position: fixed;
    top: 10px;
    right: 20px;
    z-index: 14;
    display: block;

    display: inline-block;
    padding: 28px 20px;
    user-select: none;
    ${BarCheck}:checked + ${Bar} {
        background: transparent;
    }
    ${BarCheck}:checked + ${Bar}:before {
        transform: rotate(-45deg);
    }
    ${BarCheck}:checked + ${Bar}:after {
        transform: rotate(45deg);
    }
    ${BarCheck}:checked + ${Bar}:not(.steps):before {
        top: 0;
    }
    ${BarCheck}:checked + ${Bar}:not(.steps):after {
        top: 0;
    }
    ${mobile({ 

    })}
`;
const QuickCart = styled.div`
    width: 100%;
`;
const QOverlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0px;
    background-color: rgba(0,0,0,0.8);
    transition: all 0.5s ease;
    display: ${props=>props.check === true ? "block" : "none"};
    z-index: 10;
`;
const QWrapper = styled.div`
    position: fixed;
    width: 300px;
    height: 100vh;
    bottom: 0px;
    top: 0px;
    right: 0px;
    padding-right: 40px;
    background-color: #fff;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    box-sizing: border-box;
    z-index: 30;
    transition: all 0.5s ease;
    box-shadow: 3px 2px 8px -3px rgba(0,0,0,0.62);
    -webkit-box-shadow: 3px 2px 8px -3px rgba(0,0,0,0.62);
    -moz-box-shadow: 3px 2px 8px -3px rgba(0,0,0,0.62);
    transform: ${props=>props.check === true ? "translateX(0px)" : "translateX(300px)"};
    @media (max-width: 768px) {
        transform: ${props=>props.check === true ? "translateX(-100%)" : "translateX(100%)"};
    }
    ${mobile({
        width: "100%",
        right: "-100%",
        alignItems: "center",
        paddingRight: "0px"
    })}
`;
const QWrap = styled.div`
    width: 100%;
    padding: 70px 10px 10px 30px;
    display: flex;
    flex-direction: column;
    justify-content: left;
    ${mobile({
        alignItems: "center",
        padding: "70px 30px 10px 30px"
    })}
`;
const QHeader = styled.span`
    display: block;
    font-weight: 600;
    font-size: 21px;
    color: #000;
`;
const QBag = styled.div`
    width: 100%;
    margin-top: 40px;
    border-bottom: 1px solid #00000020;
`;
const QItem = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    ${mobile({
        justifyContent: "space-between"
    })}
`;
const QImage = styled.img`
    width: 70px;
    margin-right: 20px;
`;
const QDetails = styled.div`
    ${mobile({
        display: "flex",
        flexDirection: "column",
    })}
`;
const QName = styled.span`
    font-weight: 600;
    font-size: 14px;
    color: #000;
    ${mobile({
        textAlign: "right"
    })}
`;
const QPriceWrap = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    ${mobile({
        justifyContent: "flex-end"
    })}
`;
const QPrice = styled.span`
    font-weight: 600;
    font-size: 14px;
    color: #000;
    ${mobile({
        marginRight: "20px"
    })}
`;
const QQty = styled.span`
    font-weight: 600;
    font-size: 14px;
    color: #00000050;
`;
const QSize = styled.span`
    display: block;
    margin-top: 10px;
    font-weight: 600;
    font-size: 14px;
    color: #00000050;
    ${mobile({
        textAlign: "right"
    })}
`;
const QSummary = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 10px;
    margin-bottom: 20px;
    ${mobile({
        width: "100%"
    })}
`;
const QField = styled.span`
    font-weight: 600;
    font-size: 14px;
    color: #00000050;
    ${mobile({
        
    })}
`;
const QValue = styled.span`
    font-weight: 600;
    font-size: 18px;
    color: #f7238d;
    ${mobile({
        
    })}
`;
const ManageBtn = styled.div`
    width: 200px;
    padding: 10px 10px;
    border: 2px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({
    })}
`;
const ManageText = styled.span`
    font-weight: 600;
    font-size: 14px;
    color: #000;
`;
const CheckoutBtn = styled.div`
    width: 200px;
    padding: 10px 10px;
    margin-top: 10px;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const CheckoutText = styled.span`
    font-weight: 600;
    font-size: 14px;
    color: #fff;
`;


export default function ShopMenu() {
    const cart = useSelector(state=>state.cart);
    const currency = useSelector(state=>state.currency.currency);
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const [isOpenCurrency, setIsOpenCurrency] = useState(false);
    const [selectedOptionCurrency, setSelectedOptionCurrency] = useState(null);
    const currencyList = ["NGN","USD","EUR","GBP"];
    const [quickCart, setQuickCart] = useState(false);

    const handleChange = () => {    
        // MobileWidth = "0px";
        setChecked(!checked);    
      };
  
    const togglingCurrency= () => setIsOpenCurrency(!isOpenCurrency);
  
    const onOptionClickedCurrency = value => () => {
        setSelectedOptionCurrency(value);
        setIsOpenCurrency(false);
        getCurrency(value, dispatch);  
    };

    // const handleQuickCart = () => setQuickCart(true);

    const handleQuickCart = () => {    
        // MobileWidth = "0px";
        setQuickCart(!quickCart);    
      };
      
    return (
        <Container>
            <Link to={`/`} style={{ textDecoration: 'none' }}>
                <Logo src={LogoWhite} />
            </Link>
            <Wrapper check={checked}>
                <MenuWrap>
                    {/* <SearchContainer>
                        <SearchInput name="search" type="text" placeholder="Search . . ." />
                    </SearchContainer> */}
                    <NavList>
                        <Link to={`/`} style={{ textDecoration: 'none' }}>
                            <ListItem>HOME</ListItem>
                        </Link>
                        <Link to={`/shop/products/`} style={{ textDecoration: 'none' }} onClick={handleChange}>
                            <ListItem>SHOP</ListItem>
                        </Link>
                        <Link to={`/shop/products/`} style={{ textDecoration: 'none' }} onClick={handleChange}>
                            <ListItem>COLLECTION</ListItem>
                        </Link>
                        <Link to={`/shop/products/`} style={{ textDecoration: 'none' }} onClick={handleChange}>
                            <ListItem>STORIES</ListItem>
                        </Link>
                    </NavList>
                    <Link to={`/shop/products/`} style={{ textDecoration: 'none' }} onClick={handleChange}>
                        <WatchFilmWrap>
                            <FilmText>WATCH FASHION FILM</FilmText>
                            <Circle>
                                <PlayArrowRoundedIcon style={{ color: '#000', fontSize: 14 }} />
                            </Circle>
                        </WatchFilmWrap>
                    </Link>
                </MenuWrap>
            </Wrapper>
            <BarWrap>
                <BarCheck checked={checked} onChange={handleChange}/>
                <Bar />
            </BarWrap>
            <OverHead />
            <CurrencySwitch onClick={togglingCurrency}>
                <DropDownContainer>
                    <DropDownHeadWrap>
                        <DropDownHeader>
                        {selectedOptionCurrency || currency.code }
                        </DropDownHeader>
                        <ExpandMoreOutlined style={{ color: '#f7238d' }}/>
                    </DropDownHeadWrap>
                    {isOpenCurrency && (
                    <DropDownListContainer>
                        <DropDownList>
                        {currencyList.map(option => (
                            <CListItem onClick={onOptionClickedCurrency(option)} key={Math.random()}>
                            {option}
                            </CListItem>
                        ))}
                        </DropDownList>
                    </DropDownListContainer>
                    )}
                </DropDownContainer>
            </CurrencySwitch>
            <MenuItem>
                <StyledBadge 
                    badgeContent={cart.quantity}>
                    <ShoppingBasketOutlined 
                    style={{ color: '#fff', fontSize: 22 }}
                    onClick={handleQuickCart} 
                />
                </StyledBadge>
            </MenuItem>
            <Overlay check={checked}/>
            <QuickCart>
                <QWrapper check={quickCart}>
                    <ClearOutlined 
                        style={{ 
                            color: '#000', 
                            fontSize: 22,
                            position: 'relative',
                            top: 30,
                            right: 0
                        }}
                        onClick={handleQuickCart}
                    />
                    <QWrap>
                        <QHeader>YOUR BAG</QHeader>
                        <QBag>
                        {cart.products.map((product) => (
                            <QItem key={product._id}>
                                <QImage src={product.img} />
                                <QDetails>
                                    <QName>{product.title}</QName>
                                    <QPriceWrap>
                                        <QPrice>
                                            {currency.symbol}
                                            {(product.price * currency.rate).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                        </QPrice>
                                        <QQty>x {product.quantity}</QQty>
                                    </QPriceWrap>
                                    <QSize>{product.size}</QSize>
                                </QDetails>
                            </QItem>
                            ))}
                        </QBag>
                        <QSummary>
                            <QField>SUBTOTAL:</QField>
                            <QValue>
                                {currency.symbol}
                                {(cart.total * currency.rate).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                            </QValue>
                        </QSummary>
                        <Link to={`/shop/cart/`} style={{ textDecoration: 'none' }} onClick={handleQuickCart}>
                            <ManageBtn>
                                <ManageText>MANAGE YOUR BAG</ManageText>
                            </ManageBtn>
                        </Link>
                        <Link to={`/billing/customer_info`} style={{ textDecoration: 'none' }} onClick={handleQuickCart}>
                            <CheckoutBtn>
                                <CheckoutText>CHECKOUT</CheckoutText>
                            </CheckoutBtn>
                        </Link>
                    </QWrap>
                </QWrapper>
                <QOverlay check={quickCart}/> 
            </QuickCart>
        </Container>
    );
}

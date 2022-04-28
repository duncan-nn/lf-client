import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useSelector } from "react-redux";
import {useState, useEffect} from 'react';
import StripeCheckout from "react-stripe-checkout";
import {userRequest} from "../../requestMethods";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ExpandMoreOutlined, TrendingFlatOutlined} from '@material-ui/icons';
import {publicRequest} from "../../requestMethods";
import { mobile } from '../../responsive';

const Container = styled.div`
    width: 100%;
    padding: 0px 30px;
    ${mobile({ 
        padding: "0px 20px"
    })}
`;
const Wrapper = styled.div`
    margin-bottom: 80px;
    width: 100%;
    margin-top: 60px;
    display: flex;
    justify-content: center;
    ${mobile({ 
        flexDirection: "column",
    })}
`;
const CustomeInfo = styled.div`
  width: 55%;
  margin-right: 50px;
  ${mobile({ 
        width: "100%",
        alignItems: "center"
    })}
`;
const OrderSummary= styled.div`
  width: 25%;
  ${mobile({ 
        width: "100%",
        alignItems: "center",
        marginTop: "50px"
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
const Info = styled.div`
    width: 100%;
`;
const InfoGroup = styled.div`
    width: 100%;
    margin-bottom: 30px;
    display: flex;
    justify-content: flex-start;
    ${mobile({ 
        flexDirection: "column",
        marginBottom: "0px"
    })}
`;
const InfoWrap = styled.div`
    width: 43%;
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    ${mobile({ 
        width: "100%",
        marginBottom: "40px"
    })}
`;
const InputWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const Label = styled.h2`
font-size: 14px;
font-weight: 300;
color: #00000080;
margin-bottom: 5px;
    
`;
const ErrorMsg = styled.span`
font-size: 13px;
font-weight: 300;
color: #e60606;
display: ${props=> props.active === true ? 'block' : 'none'};
    
`;
const Input = styled.input`
    margin: 0px;
    padding: 0px;
    border: none;
    border-bottom: 1px solid #000;
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    color: #000000;   
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
const Hr = styled.hr`
  background-color: #00000030;
  border: none;
  height: 1px;
`;

const Filter = styled.div`
    margin: 0px;
    border: none;
    border-bottom: 1px solid #000;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
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
    font-size: 18px;
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

const Countries = [
    "Nigeria",
    "United Kingdom"
]


export default function CustomerInfo() {
    const cart = useSelector(state=>state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();
    const currency = useSelector(state=>state.currency.currency);

    const [isFormValid, setIsFormValid] = useState(false);

    const [inputs, setInputs] = useState({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        postcode: "",
        address: ""
    });
    const [inputErrors, setInputErrors] = useState({
        fullName: false,
        email: false,
        phone: false,
        country: false,
        city: false,
        postcode: false,
        address: false
    });

    const onToken = (token)=>{
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                });
                navigate("/success", {data: res.data});
            } catch {}
        };
        stripeToken && cart.total >= 1 && makeRequest();
    }, [stripeToken, cart.total, navigate]);

    const [isOpenCountry, setIsOpenCountry] = useState(false);
    const [selectedOptionCountry, setSelectedOptionCountry] = useState(null);
  
    const togglingCountry= () => setIsOpenCountry(!isOpenCountry);
  
    const onOptionClickedCountry = value => () => {
        setSelectedOptionCountry(value);
        setIsOpenCountry(false);
        setInputs((prev) => {
            return { ...prev, country: value };
        });
    };

    const handleChange = (e) => {
        setInputs((prev) => {
            console.log(e.target.value);
            return { ...prev, [e.target.name]: e.target.value };
        });
      };

    const validateInputs = () => { 
        
        let inputErrorsArr = {
            fullName: false,
            email: false,
            phone: false,
            country: false,
            city: false,
            postcode: false,
            address: false
        };                                                            ;

        Object.keys(inputs)
        .forEach(function eachKey(key) {
            if (key === 'fullName' || 'city') {
                let x = /^[a-zA-Z\s]+$/.test(inputs[key]);
                if ( x && inputs[key] !== "" )
                {
                    inputErrorsArr = {...inputErrorsArr, [key] : false}
                } else {
                    inputErrorsArr = {...inputErrorsArr, [key] : true}
                }
            }
            if (key === 'email') {
                let x = String(inputs[key]).toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
                if ( x && inputs[key] !== "" )
                {
                    inputErrorsArr = {...inputErrorsArr, [key] : false}
                } else {
                    inputErrorsArr = {...inputErrorsArr, [key] : true}
                }
            }
            if (key === 'phone') {
                let x = /^[\d\s]+$/.test(inputs[key]);
                if ( x && inputs[key] !== "" )
                {
                    inputErrorsArr = {...inputErrorsArr, [key] : false}
                } else {
                    inputErrorsArr = {...inputErrorsArr, [key] : true}
                }
            }
            if (key === 'address') {
                let x = /^[a-z0-9,\s]+$/i.test(inputs[key]);
               if ( x && inputs[key] !== "" )
                {
                    inputErrorsArr = {...inputErrorsArr, [key] : false}
                } else {
                    inputErrorsArr = {...inputErrorsArr, [key] : true}
                }
            }
            if (key === 'postcode') {
                let x = /^[a-z0-9\s]+$/i.test(inputs[key]);
               if ( x && inputs[key] !== "" )
                {
                    inputErrorsArr = {...inputErrorsArr, [key] : false}
                } else {
                    inputErrorsArr = {...inputErrorsArr, [key] : true}
                }
            }
            if (key === 'country') {
                let x = /^[a-zA-Z\s]+$/.test(inputs[key]);
                if ( x && inputs[key] !== "" && inputs[key] !== "Choose country")
                {
                    inputErrorsArr = {...inputErrorsArr, [key] : false}
                } else {
                    inputErrorsArr = {...inputErrorsArr, [key] : true}
                }
            }
        });

        return inputErrorsArr;
    };

    useEffect(() => {

        let errorCheck = true;
        Object.keys(inputErrors)
        .forEach(function eachKey(key) {
            if(inputErrors[key] === true) {
                errorCheck = false;
            }
        });
        console.log(inputErrors);
        console.log(errorCheck);

        setIsFormValid(errorCheck);

        const addCustomer = async () => {
            try {
                const res = await publicRequest.post("/checkout/add_customer", inputs);
                const newCustomer = res.data;
                navigate("/billing/checkout", {
                    state:{
                        customer: newCustomer
                    }
                });
            } catch {}
        };

        if(errorCheck){
            addCustomer();
        } else {
        }

    }, [inputErrors]);

    const handleClick = async (e) => {
        e.preventDefault();
        let errors = validateInputs();
        setInputErrors(errors);
      };


    return (
        <Container>
            <Wrapper>
                <CustomeInfo>
                    <CartHead>CUSTOMER DETAILS</CartHead>
                    <Info>
                        <InfoGroup>
                            <InfoWrap>
                                <InputWrap>
                                    <Label>FULL NAME:</Label>
                                    <Input 
                                        name="fullName" 
                                        type="text" 
                                        placeholder="Enter your full name" 
                                        onChange={handleChange} 
                                    />
                                </InputWrap>
                                <ErrorMsg active={inputErrors.fullName} >Name must not be empty</ErrorMsg>
                            </InfoWrap>
                            <InfoWrap>
                                <InputWrap>
                                    <Label>EMAIL:</Label>
                                    <Input 
                                        name="email" 
                                        type="text" 
                                        placeholder="Enter your email"
                                        onChange={handleChange} 
                                    />
                                </InputWrap>
                                <ErrorMsg active={inputErrors.email}>Email must not be empty</ErrorMsg>
                            </InfoWrap>                
                        </InfoGroup>
                        <InfoGroup>
                            <InfoWrap>
                                <InputWrap>
                                    <Label>PHONE:</Label>
                                    <Input 
                                        name="phone" 
                                        type="text" 
                                        placeholder="Enter your phone"
                                        onChange={handleChange} 
                                    />
                                </InputWrap>
                                <ErrorMsg active={inputErrors.phone}>Phone must not be empty</ErrorMsg>
                            </InfoWrap>
                            <InfoWrap>
                                <InputWrap>
                                    <Label>COUNTRY:</Label>
                                    <Filter onClick={togglingCountry}>
                                            <DropDownContainer>
                                                <DropDownHeadWrap>
                                                    <DropDownHeader>
                                                    {selectedOptionCountry || "Choose country" }
                                                    </DropDownHeader>
                                                    <ExpandMoreOutlined style={{ color: '#f7238d' }}/>
                                                </DropDownHeadWrap>
                                                {isOpenCountry && (
                                                <DropDownListContainer>
                                                    <DropDownList>
                                                    {Countries.map(option => (
                                                        <ListItem onClick={onOptionClickedCountry(option)} key={Math.random()}>
                                                        {option}
                                                        </ListItem>
                                                    ))}
                                                    </DropDownList>
                                                </DropDownListContainer>
                                                )}
                                            </DropDownContainer>
                                    </Filter>
                                </InputWrap>
                                <ErrorMsg active={inputErrors.country}>Country must not be empty</ErrorMsg>
                            </InfoWrap>
                        </InfoGroup>
                        <InfoGroup>
                            <InfoWrap>
                                <InputWrap>
                                    <Label>CITY:</Label>
                                    <Input 
                                        name="city" 
                                        type="text" 
                                        placeholder="Enter your city"
                                        onChange={handleChange} 
                                    />
                                </InputWrap>
                                <ErrorMsg active={inputErrors.city}>City must not be empty</ErrorMsg>
                            </InfoWrap>
                            <InfoWrap>
                                <InputWrap>
                                    <Label>ZIP/POSTCODE:</Label>
                                    <Input 
                                        name="postcode" 
                                        type="text" 
                                        placeholder="Enter your postcode"
                                        onChange={handleChange} 
                                    />
                                </InputWrap>
                                <ErrorMsg active={inputErrors.postcode}>Postcode must not be empty</ErrorMsg>
                            </InfoWrap>
                        </InfoGroup>
                        <InfoGroup>
                            <InfoWrap>
                                <InputWrap>
                                    <Label>ADDRESS:</Label>
                                    <Input 
                                        name="address" 
                                        type="text" 
                                        placeholder="Enter your address"
                                        onChange={handleChange} 
                                    />
                                </InputWrap>
                                <ErrorMsg active={inputErrors.address}>Address must not be empty</ErrorMsg>
                            </InfoWrap>
                        </InfoGroup>

                    </Info>
                    
                </CustomeInfo>


                <OrderSummary>
                    <CartHead>SUMMARY</CartHead>
                    <Summary>
                        <SummaryItem>
                            <SummaryItemText>SUBTOTAL:</SummaryItemText>
                            <SummaryItemPrice>
                                {currency.symbol}
                                {(cart.total * currency.rate).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                            </SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>SHIPPING:</SummaryItemText>
                            <SummaryItemPrice>0</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>DISCOUNT:</SummaryItemText>
                            <SummaryItemPrice>0</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>TAX:</SummaryItemText>
                            <SummaryItemPrice>0</SummaryItemPrice>
                        </SummaryItem>
                        <Hr />
                        <SummaryItem type="total">
                            <SummaryItemText>TOTAL:</SummaryItemText>
                            <TotalPrice>
                                {currency.symbol}
                                {(cart.total * currency.rate).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                            </TotalPrice>
                        </SummaryItem>
                    </Summary>
                    { cart.products.length > 0 &&
                        <Button
                            onClick={handleClick} 
                        >
                           CONTINUE
                        </Button>
                    }
                </OrderSummary>
            </Wrapper>
        </Container>
    );
}

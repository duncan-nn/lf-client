import styled from 'styled-components';
import LogoBlack from '../../assets/images/logo-black.png';
import WorldremitLogo from '../../assets/images/worldremit_logo.png';
import { mobile } from '../../responsive';
import {useState, useEffect} from 'react';
import {userRequest} from "../../requestMethods";
import { useNavigate, useLocation  } from "react-router-dom";
import { Link } from "react-router-dom";
import { ExpandMoreOutlined} from '@material-ui/icons';
import Moment from 'moment';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import ReactPdf from '../../components/ReactPdf';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/cartRedux';


const Container = styled.div`
    width: 100%;
    padding: 0px 30px;
    display: flex;
    justify-content: center;
    ${mobile({ 
        padding: "0px 20px"
    })}
`;
const Wrapper = styled.div`
    margin-bottom: 80px;
    width: 50%;
    margin-top: 60px;
    display: flex;
    justify-content: center;
    ${mobile({ 
        width: "100%"
    })}
`;
const OrderSummary= styled.div`
  width: 100%;
`;
const CartHead = styled.h1`
    font-size: 24px;
    font-weight: 700;
    color: #000;
    margin-bottom: 40px;
`;
const Summary = styled.div`
    width: 100%;
    padding-bottom: 20px;
    margin-bottom: 20px;
    background-color: #f8f7f7;
`;
const Header = styled.div`
    padding: 30px 20px 30px 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`;
const SubHeader = styled.div`
    padding: 20px 20px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f8d5e7;
`;
const Logo = styled.img`
    width: 100px;
    ${mobile({ 
        
    })}
`;
const VendorLogo = styled.img`
    width: 120px;
    ${mobile({ 
        
    })}
`;
const Address = styled.div`
    display: flex;
    flex-direction: column;
`;
const InvoiceNumber = styled.div`

`;
const CustomerInfo = styled.div`
    display: flex;
    flex-direction: column;
`;
const SubTextWrap = styled.div`
    display: flex;
    flex-direction: column;
`;
const TextWrap = styled.div`
    display: flex;
`;
const OrderItems = styled.div`
    width: 100%;
    padding: 20px 20px;
`;
const ItemsWrap = styled.div`
    margin-top: 10px;
    padding: 20px 20px 30px 20px;
    background-color: #fff;
`;
const Item = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 15px 0px 15px 0px;
    border-bottom: 1px solid #00000010;
`;
const ItemLeft = styled.div`
    width: 80%;
    display: flex;
`;
const ItemRight = styled.div`
    width: 20%;
    display: flex;
    justify-content: flex-end;
`;
const Name = styled.span`
    width: 50%;
    font-weight: 600;
    font-size: 14px;
    color: #000;
    margin-right: 30px;
`;
const Size = styled.span`
    width: 10%;
    font-weight: 300;
    font-size: 14px;
    color: #000;
    margin-right: 10px;
`;
const Price = styled.span`
    width: 10%;
    font-weight: 600;
    font-size: 14px;
    color: #000;
    margin-right: 10px;
`;
const Qty = styled.span`
    width: 10%;
    font-weight: 300;
    font-size: 14px;
    color: #000;
    margin-right: 10px;
`;
const ItemPrice = styled.span`
    font-weight: 600;
    font-size: 14px;
    color: #000;
`;
const TotalSummary = styled.div`
    width: 100%;
    padding: 0px 20px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
`;
const SummaryWrap = styled.div`
    width: 180px;
`;
const TotalItem = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 5px;
`;
const TotalTitle = styled.span`
    font-weight: 600;
    font-size: 14px;
    color: #00000050;
`;
const TotalValue = styled.span`
    font-weight: 600;
    font-size: 14px;
    color: #000;
`;
const TotalPriceValue = styled.span`
    font-weight: 600;
    font-size: 18px;
    color: #f7238d;
`;
const Payment = styled.div`
    width: 50%;
`;
const PaymentWrap = styled.div`
    width: 100%;
`;
const PaymentTitle = styled.span`
    font-weight: 600;
    font-size: 14px;
    color: #00000050;
`;
const PaymentMethod = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 20px;
`;
const PaymentItem = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 5px;
`;
const PaymentItemTitle = styled.span`
    font-weight: 600;
    font-size: 14px;
    color: #000;
    display: block;
    margin-bottom: 20px;
`;
const PaymentValue = styled.span`
    font-weight: 300;
    font-size: 16px;
    color: #f7238d;
    text-align: right;
`;
const Instruction = styled.div`
    width: 90%;
    margin-top: 20px;
    padding: 20px 20px;
`;
const InstructionText = styled.span`
    font-weight: 300;
    font-size: 14px;
    color: #000;
`;
const Contact = styled.div`
    width: 90%;
    display: flex;
    align-items: flex-end;
    margin: 5px 0px 5px 0px;
`;
const DownloadInvoice = styled.div`
    width: 100%;
    margin-top: 20px;
    padding: 20px 20px;
    display: flex;
    justify-content: flex-end;
`;
const DownloadBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
`;
const Download = styled.span`
    font-weight: 600;
    font-size: 14px;
    padding: 10px 20px;
    color: #fff;
    transition: all 0.3s ease;
    &:hover {
            color: #f7238d;
    }
`;
const ContactTitle = styled.span`
    font-weight: 300;
    font-size: 14px;
    color: #000;
    margin-right: 10px;
`;
const ContactValue = styled.span`
    font-weight: 600;
    font-size: 14px;
    color: #000;
`;
const OrderTitle = styled.span`
    font-weight: 600;
    font-size: 14px;
    color: #000;
`;
const ItemText = styled.span`
    font-weight: 600;
    font-size: 14px;
    color: #000;
    margin-right: 10px;
`;
const SubTitle = styled.span`
    font-weight: 600;
    font-size: 14px;
    color: #000;
    text-align: right;
`;
const TextL = styled.span`
    font-weight: 300;
    font-size: 14px;
    color: #000;
`;
const TextR = styled.span`
    font-weight: 300;
    font-size: 14px;
    color: #000;
    text-align: right;
`;


export default function Invoice() {
    const cart = useSelector(state=>state.cart);
    const currency = useSelector(state=>state.currency.currency);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCart());
    }, []);



    return (
        <Container>
            <Wrapper>
                <OrderSummary>
                    <CartHead>YOUR INVOICE</CartHead>
                    <Summary>
                        <Header>
                            <Logo src={LogoBlack} />
                            <Address>
                                <TextR>
                                    11 Ribadu road, off Awolowo Rd
                                </TextR>
                                <TextR>Ikoyi, Lagos</TextR>
                            </Address>
                        </Header>
                        <SubHeader>
                            <InvoiceNumber>
                                <TextWrap>
                                    <ItemText>INVOICE NUMBER:</ItemText>
                                    <TextL>{location.state.order.invoice}</TextL>
                                </TextWrap>
                                <TextWrap>
                                    <ItemText>REFERENCE CODE:</ItemText>
                                    <TextL>{location.state.order.reference}</TextL>
                                </TextWrap>
                                <TextWrap>
                                    <ItemText>ISSUE DATE:</ItemText>
                                    <TextL>{Moment(location.state.order.createdAt).utc().format('DD/MM/YY')}</TextL>
                                </TextWrap>
                                <TextWrap>
                                    <ItemText>DUE DATE:</ItemText>
                                    <TextL>{Moment(location.state.order.createdAt).utc().add(1, 'days').format('DD/MM/YY')}</TextL>
                                </TextWrap>
                            </InvoiceNumber>
                            <CustomerInfo>
                                <SubTextWrap>
                                    <SubTitle>BILLED TO:</SubTitle>
                                    <TextR>{location.state.customer.fullName}</TextR>
                                    <TextR>{location.state.customer.address}</TextR>
                                    <TextR>{location.state.customer.city}, {location.state.customer.country}</TextR>
                                </SubTextWrap>
                            </CustomerInfo>
                        </SubHeader>
                        <OrderItems>
                            <OrderTitle>ORDERED ITEMS</OrderTitle>
                            <ItemsWrap>
                                {location.state.order.products.map((product) => (
                                    <Item key={product.productId}>
                                        <ItemLeft>
                                            <Name>{product.productName}</Name>
                                            <Size>{product.size}</Size>
                                            <Price>
                                                {currency.symbol}
                                                {(product.price * currency.rate).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                            </Price>
                                            <Qty>x {product.quantity}</Qty>
                                        </ItemLeft>
                                        <ItemRight>
                                            <ItemPrice>
                                                {currency.symbol}
                                                {((product.price * product.quantity) * currency.rate).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}                            
                                            </ItemPrice>
                                        </ItemRight>
                                    </Item>
                                ))}
                            </ItemsWrap>
                        </OrderItems>
                        <TotalSummary>
                            <SummaryWrap>
                            <PaymentItemTitle>SUMMARY</PaymentItemTitle>
                                <TotalItem>
                                    <TotalTitle>SUBTOTAL:</TotalTitle>
                                    <TotalValue>
                                        {currency.symbol}
                                        {(location.state.order.itemTotal * currency.rate).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                    </TotalValue>
                                </TotalItem>
                                <TotalItem>
                                    <TotalTitle>SHIPPING:</TotalTitle>
                                    <TotalValue>
                                        {currency.symbol}
                                        {(location.state.order.shipping * currency.rate).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                    </TotalValue>
                                </TotalItem>
                                <TotalItem>
                                    <TotalTitle>TAX:</TotalTitle>
                                    <TotalValue>
                                        {currency.symbol}
                                        {(location.state.order.tax * currency.rate).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                    </TotalValue>
                                </TotalItem>
                                <TotalItem>
                                    <TotalTitle>TOTAL:</TotalTitle>
                                    <TotalPriceValue>{currency.symbol}{
                                            ((
                                                location.state.order.itemTotal +
                                                location.state.order.shipping +
                                                location.state.order.discount +
                                                location.state.order.tax
                                            ) * currency.rate
                                            ).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                                        }
                                    </TotalPriceValue>
                                </TotalItem>
                            </SummaryWrap>
                            <Payment>
                                <PaymentWrap>
                                    <PaymentItemTitle>PAYMENT METHOD</PaymentItemTitle>
                                    <PaymentMethod>
                                        <PaymentTitle>BANK TRANSFER</PaymentTitle>
                                        <PaymentValue>
                                            <VendorLogo src={WorldremitLogo} />
                                        </PaymentValue>
                                    </PaymentMethod>
                                    <PaymentItem>
                                        <PaymentTitle>BANK NAME:</PaymentTitle>
                                        <PaymentValue>Guaranty Trust Bank</PaymentValue>
                                    </PaymentItem>
                                    <PaymentItem>
                                        <PaymentTitle>ACCOUNT NAME:</PaymentTitle>
                                        <PaymentValue>Jewel by LIsa</PaymentValue>
                                    </PaymentItem>
                                    <PaymentItem>
                                        <PaymentTitle>ACCOUNT NUMBER:</PaymentTitle>
                                        <PaymentValue>0232295491</PaymentValue>
                                    </PaymentItem>
                                    <PaymentItem>
                                        <PaymentTitle>EMAIL:</PaymentTitle>
                                        <PaymentValue>sike@jbylisa.com</PaymentValue>
                                    </PaymentItem>
                                    <PaymentItem>
                                        <PaymentTitle>MOBILE NUMBER:</PaymentTitle>
                                        <PaymentValue>+234 809 222 8675</PaymentValue>
                                    </PaymentItem>
                                </PaymentWrap>
                            </Payment>
                        </TotalSummary>
                        <Instruction>
                            <PaymentItemTitle>PAYMENT INSTRUCTION</PaymentItemTitle>
                            <InstructionText>
                                For your order fulfilment, send this invoice number, your reference code and your email
                                to our WhatsApp or email address below - after you make a payment.
                            </InstructionText>
                            <Contact>
                                <ContactTitle>EMAIL</ContactTitle>
                                <ContactValue>sike@jbylisa.com</ContactValue>
                            </Contact>
                            <Contact>
                                <ContactTitle>WHATSAPP</ContactTitle>
                                <ContactValue>+234 803 308 5416</ContactValue>
                            </Contact>
                        </Instruction>
                        <DownloadInvoice>
                            <DownloadBtn>
                                <Download>DOWNLOAD INVOICE</Download>
                            </DownloadBtn>
                        </DownloadInvoice>
                    </Summary>
                    <PDFDownloadLink document={<ReactPdf />} fileName="Form" >
                        Download
                    </PDFDownloadLink>
                    <PDFViewer>
                        <ReactPdf />
                    </PDFViewer>                 
                </OrderSummary>
            </Wrapper>

        </Container>

    );
}

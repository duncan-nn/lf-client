import styled from 'styled-components';
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {getShippingRates, getInvoiceNumber, getReferenceCode} from '../../rates';
import {publicRequest} from "../../requestMethods";
import { mobile } from '../../responsive';

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
    width: 30%;
    margin-top: 60px;
    display: flex;
    justify-content: center;
    ${mobile({ 
        width: "100%",
        flexDirection: "column"
    })}
`;
const OrderSummary= styled.div`
  width: 100%;
  ${mobile({ 
        width: "100%",
        alignItems: "center"
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
export default function Checkout() {
    const cart = useSelector(state=>state.cart);
    const currency = useSelector(state=>state.currency.currency);
    const navigate = useNavigate();
    const location = useLocation();
    const customer = location.state.customer;

    const tax = 0;
    const discount = 0;
    const shipping = getShippingRates(customer.country);
    const amount = cart.total + shipping + tax + discount;

    const referenceCode = getReferenceCode();
    const invoiceNumber = getInvoiceNumber();

    const vendor = 'World Remit';
    const paymentType = 'Bank Transfer';
    const status = 'Pending';

    const products = cart.products.map((product) => ({
        productId: product._id,
        productName: product.title,
        price: product.price,
        quantity: product.quantity,
        size: product.size,
        img: product.img[0]
    }));
    console.log(products);

    const handleClick = async (e) => {
        e.preventDefault();
        const order = {
            customerId: customer._id,
            reference: referenceCode,
            invoice: invoiceNumber,
            products: products,
            itemTotal: cart.total,
            shipping: shipping,
            discount: discount,
            tax: tax,
            currencyPaid: currency.code,
            exchangeRate: currency.rate,
            vendor: vendor,
            paymentType: paymentType,
            status: status
        }
        console.log(order);
        try {
            const res = await publicRequest.post("/checkout/add_order", order);
            const newOrder = res.data;
            navigate("/billing/invoice", {
                state:{
                    order: newOrder,
                    customer: customer
                }
            });
        } catch {}
      };


    return (
        <Container>
            <Wrapper>
                <OrderSummary>
                        <CartHead>ORDER SUMMARY</CartHead>
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
                                <SummaryItemPrice>{currency.symbol}{shipping * currency.rate}</SummaryItemPrice>
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
                                    {(amount * currency.rate).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                </TotalPrice>
                            </SummaryItem>
                        </Summary>
                        { cart.products.length > 0 &&
                            <Button onClick={handleClick}>
                                CHECKOUT
                            </Button>
                        }
                    </OrderSummary>
                </Wrapper>

        </Container>

    );
}

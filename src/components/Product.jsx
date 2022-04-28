import styled from 'styled-components';
import { CropFreeOutlined} from '@material-ui/icons';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { mobile } from "../responsive";

const Container = styled.div`
    width: 24%;
    margin-bottom: 40px;
    ${mobile({ 
      width: "47%"
    })}
`;
const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2 );
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.5s ease;
`;
const ImgWrapper = styled.div`
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    position: relative;
    &:hover ${Info}{
        opacity: 1;
    }
`;
const Image = styled.img`
    width: 100%;
    object-fit: cover;
`;
const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius:50%;
    background-color: #00000040;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
        background-color: #00000070;
        transform: scale(1.1);
    }
`;
 const ItemDescription = styled.div`
    width: 100%;
    margin-top: 5px;
    padding-left: 5px;
`;
const ItemName = styled.span`
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #464646;
    margin-bottom: 3px;
`;
const ItemPrice = styled.span`
    display: block;
    font-size: 16px;
    color: #9b9999;
`;
const Product = ({item}) => {
    const currency = useSelector(state=>state.currency.currency);
    return ( 
            <Container>
                <ImgWrapper>
                    <Image src={item.img[0]} />
                        <Info>
                            {/* <Icon>
                                <ShoppingBasketOutlined style={{ color: '#080808'}}/>
                            </Icon> */}
                            <Icon>
                                <Link to={`/shop/product/${item._id}`}>
                                    <CropFreeOutlined style={{ color: '#ffffff'}} />
                                </Link>
                            </Icon>
                        </Info>
                </ImgWrapper>
                <ItemDescription>
                    <ItemName>{item.title}</ItemName>
                    <ItemPrice>
                        {currency.symbol}
                        {
                            (item.price * currency.rate).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                        }
                        </ItemPrice>
                </ItemDescription>
            </Container>
     );
}
 
export default Product;
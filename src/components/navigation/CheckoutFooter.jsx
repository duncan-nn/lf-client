import React from 'react'; 
import styled from 'styled-components';
import { mobile } from '../../responsive';
import { Link } from "react-router-dom";

import BgImg from '../../assets/images/homebg2.jpg';
import MasterCardImg from '../../assets/images/mastercard.jpg';
import VisaImg from '../../assets/images/visa.png';


const Container = styled.div`
    width: 100%;
    margin: 0px;
    padding: 50px 20px 30px 20px;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    &:after {
        content: "";
        display: block;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, .8);
    }
    ${mobile({
        padding: "50px 20px 30px 20px"
    })}
`;
const RowA = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    ${mobile({
        width: "100%",
        alignItems: "center",
        flexDirection: "column"
    })}
`;
const ColA = styled.div`
    margin-right: 20px;
    ${mobile({
        marginRight: "0px",
        marginBottom: "40px",
        alignItems: "center",
        flexDirection: "column"
    })}
`;
const ColB = styled.div`
    margin-right: 40px;
    display: flex;
    align-items: baseline;
    ${mobile({
        marginRight: "0px",
        alignItems: "center",
        flexDirection: "column"
    })}
`;

const RowBiTem = styled.span`
    font-size: 10px;
    font-weight: 500;
    margin-bottom: 10px;
    letter-spacing: 3px;
    color: #fff;
    display: block;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
       color: #fc8fc5;
    }
`;
const Icons = styled.div`
    display: flex;
    align-items: flex-end;
    ${mobile({
    })}
`;
const Image = styled.img`
    width: 30px;
    background-color: #fff;
    padding: 2px 2px;
    margin-left: 10px;
    opacity: .7;
`;


export default function CheckoutFooter() {

      
    return (
        <Container  style={{ backgroundImage: `url(${BgImg})`}}>
            <RowA>
                <ColA>
                    <RowBiTem>COPYRIGHT 2022 JEWELS BY LISA</RowBiTem>
                </ColA>
                <ColB>
                    <Link to={`/`} style={{ textDecoration: 'none' }}>
                        <RowBiTem>Secured Payment By WorldRemit</RowBiTem>
                    </Link>
                    <Icons>
                        <Image src={MasterCardImg}/>
                        <Image src={VisaImg}/>
                    </Icons>
                </ColB>
            </RowA>
        </Container>
    );
}

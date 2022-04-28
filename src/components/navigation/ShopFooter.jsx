import React from 'react'; 
import styled from 'styled-components';
import { mobile } from '../../responsive';
import { Link } from "react-router-dom";

import BgImg from '../../assets/images/homebg2.jpg';


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
        padding: "70px 10px 30px 10px"
    })}
`;
const RowA = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 70px;
    z-index: 1;
    ${mobile({
        width: "100%",
        alignItems: "center",
        flexDirection: "column"
    })}
`;
const RowB = styled.div`
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
const Left = styled.div`

`;
const Right = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({
        alignItems: "center",
        flexDirection: "column"
    })}
`;

const ColA = styled.div`
    margin-right: 20px;
    ${mobile({
        marginRight: "0px",
        marginBottom: "70px",
        alignItems: "center",
        flexDirection: "column"
    })}
`;
const ColB = styled.div`
    margin-right: 40px;
    ${mobile({
        marginRight: "0px",
        marginBottom: "70px",
        alignItems: "center",
        flexDirection: "column"
    })}
`;
const ColC = styled.div`
    margin-right: 40px;
    ${mobile({
        marginRight: "0px",
        marginBottom: "70px",
        alignItems: "center",
        flexDirection: "column"
    })}
`;
const ColD = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    ${mobile({
        marginRight: "0px",
        marginBottom: "70px",
        alignItems: "center",
        flexDirection: "column"
    })}
`;
const Col2A = styled.div`
      ${mobile({
        marginBottom: "40px",
        alignItems: "center",
        flexDirection: "column"
    })}
`;
const Col2B = styled.div`
`;
const RowAhead = styled.span`
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 5px;
    margin-bottom: 20px;
    text-align: right;
    color: #fff;
    display: block;
    ${mobile({
        textAlign: "center"
    })}
`;
const RowAiTem = styled.span`
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 10px;
    text-align: right;
    color: #fff;
    display: block;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
       color: #fc8fc5;
    }
    ${mobile({
        textAlign: "center",
        marginBottom: "30px"
    })}
`;
const Span = styled.span`
    font-style: italic;
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


export default function ShopFooter() {

      
    return (
        <Container  style={{ backgroundImage: `url(${BgImg})`}}>
            <RowA>
                <Left>
                    <ColA>
                        <RowAhead>LISAFOLAWIYO</RowAhead>
                    </ColA>
                </Left>
                <Right>
                    <ColB>
                        <RowAhead>FASHION MOVIE</RowAhead>
                        <Link to={`/`} style={{ textDecoration: 'none' }}>
                            <RowAiTem>Watch <Span>“KEERE O!”</Span> By Daniel Obasi</RowAiTem>
                        </Link>
                    </ColB>
                    <ColC>
                        <RowAhead>QUICK LINKS</RowAhead>
                        <Link to={`/`} style={{ textDecoration: 'none' }}>
                            <RowAiTem>SHOP</RowAiTem>
                        </Link>
                        <Link to={`/`} style={{ textDecoration: 'none' }}>
                            <RowAiTem>COLLECTIONS</RowAiTem>
                        </Link>
                        <Link to={`/`} style={{ textDecoration: 'none' }}>
                            <RowAiTem>STORIES</RowAiTem>
                        </Link>
                    </ColC>
                    <ColD>
                        <RowAhead>FOLLOW US</RowAhead>
                        <Link to={`/`} style={{ textDecoration: 'none' }}>
                            <RowAiTem>YOUTUBE</RowAiTem>
                        </Link>
                        <Link to={`/`} style={{ textDecoration: 'none' }}>
                            <RowAiTem>INSTAGRAM</RowAiTem>
                        </Link>
                        <Link to={`/`} style={{ textDecoration: 'none' }}>
                            <RowAiTem>FACEBOOK</RowAiTem>
                        </Link>
                    </ColD>
                </Right>
            </RowA>

            <RowB>
                <Col2A>
                    <RowBiTem>COPYRIGHT 2022 JEWELS BY LISA</RowBiTem>
                </Col2A>
                <Col2B>
                    <Link to={`/`} style={{ textDecoration: 'none' }}>
                        <RowBiTem>DEVELOPED BY INFUSE DIGITALS</RowBiTem>
                    </Link>
                </Col2B>
            </RowB>

        </Container>
    );
}

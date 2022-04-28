import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../../responsive';
import LogoWhite from '../../assets/images/logo-white.png';


const Container = styled.div`
    width: 100%;
`;
const Top = styled.div`
    width: 100%;
    padding: 10px 40px;
    background-color: #080808;
`;
const Logo = styled.img`
    width: 100px;
    opacity: 0.5;
    ${mobile({ 
        
    })}
`;
const Main = styled.div`
    width: 100%;
    border-bottom: 1px solid #00000020;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Nav = styled.div`
    display: flex;
`;
const Item = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${props=> props.active === true ? "#000000" : "#00000060"};
  padding: 30px 0px;
  margin: 0px 40px;
  border-bottom: ${props=> props.active === true && "2px solid #f7238d"};
  ${mobile({ 
        textAlign: "center"
    })}
`;

export default function BillingNav() {
  const location = useLocation();
  const currentPage = location.pathname.split("/")[2];

  const billingPages = [
    {url: 'customer_info', value: 'CUSTOMER DETAILS'},
    {url: 'checkout', value: 'CHECKOUT'},
    {url: 'invoice', value: 'YOUR INVOICE'}
  ]

  return (
    <Container>
      <Top>
        <Logo src={LogoWhite} />
      </Top>
      <Main>
        <Nav>
          {billingPages.map(page => (
            currentPage === page.url
            ? <Item key={page.url} active={true}>{page.value}</Item>
            : <Item key={page.url} active={false}>{page.value}</Item>
          ))}
        </Nav>
      </Main>
    </Container>
  )
}

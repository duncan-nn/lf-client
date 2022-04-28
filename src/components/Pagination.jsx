import React from 'react';
import styled from 'styled-components';
// import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    display: flex;
`;

const ItemWrap = styled.span`
 border: 1px solid #80808030;
 width: 35px;
 height: 35px;
 display: flex;
 align-items: center;
 justify-content: center;
 ${({ dragging }) => dragging && 'background-color: #f7238d;'}
 cursor: pointer;
box-shadow: 0px 0px 44px -12px rgba(0,0,0,0.31);
-webkit-box-shadow: 0px 0px 44px -12px rgba(0,0,0,0.31);
-moz-box-shadow: 0px 0px 44px -12px rgba(0,0,0,0.31);
&:hover {
    background-color: #fae4f0;
}
`;
const Item = styled.span`
 font-size: 13px;
 font-weight: 600;
 color: #f7238d;
 ${({ dragging }) => dragging && 'color: #fff;'}

`;


const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage}) => {
  const pageNumbers = [];
//   console.log(currentPage);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
        {pageNumbers.map(number => (
          <ItemWrap key={number} onClick={() => paginate(number)} dragging={number === currentPage} >
            <Item key={number} dragging={number === currentPage}>
              {number}
            </Item>
          </ItemWrap>
        ))}
    </Container>
  );
};

export default Pagination;

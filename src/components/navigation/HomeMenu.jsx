import React, {useState} from 'react'; 
import styled, { keyframes } from 'styled-components';
import { SearchOutlined } from '@material-ui/icons';
import { mobile } from '../../responsive';
import { Link } from "react-router-dom";
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

const Container = styled.div`
    width: 100%;
`;
const Overlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.8);
    transition: all 0.5s ease;
    display: ${props=>props.check === true ? "block" : "none"};
    z-index: 2;
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
    z-index: 3;
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

const SearchContainer = styled.div`
    margin-top: 100px;
    margin-bottom: 50px;
    position: relative;
    &:after {
        content: "";
        background: #ffffff;
        width: 2px;
        height: 10px;
        position: absolute;
        top: 21px;
        right: 1px;
        transform: rotate(135deg);
    }
    ${mobile({ 
        
    })}
`;

const SearchInput = styled.input`
    color: #fff;
    font-size: 16px;
    background: transparent;
    width: 25px;
    height: 25px;
    padding: 10px;
    border: solid 2px #fff;
    outline: none;
    border-radius: 35px;
    transition: width 0.5s;
    &:focus {
        width: 200px;
    }
`;

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
    z-index: 6;
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
    z-index: 5;
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
    z-index: 4;
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

export default function HomeMenu() {
    const [checked, setChecked] = useState(false);
    const handleChange = () => {    
        // MobileWidth = "0px";
        setChecked(!checked);    
      };
    
      
    return (
        <Container>
            <Wrapper check={checked}>
                <MenuWrap>
                    {/* <SearchContainer>
                        <SearchInput name="search" type="text" placeholder="Search . . ." />
                    </SearchContainer> */}
                    <NavList>
                        <Link to={`/`} style={{ textDecoration: 'none' }}>
                            <ListItem>HOME</ListItem>
                        </Link>
                        <Link to={`/shop/products/`} style={{ textDecoration: 'none' }}>
                            <ListItem>SHOP</ListItem>
                        </Link>
                        <Link to={`/shop/products/`} style={{ textDecoration: 'none' }}>
                            <ListItem>COLLECTION</ListItem>
                        </Link>
                        <Link to={`/shop/products/`} style={{ textDecoration: 'none' }}>
                            <ListItem>STORIES</ListItem>
                        </Link>
                    </NavList>
                    <Link to={`/shop/products/`} style={{ textDecoration: 'none' }}>
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
                <BarCheck onChange={handleChange}/>
                <Bar />
            </BarWrap>
            <Overlay check={checked}/>   
        </Container>
    );
}

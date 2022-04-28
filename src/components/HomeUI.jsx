import React from 'react'; 
import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import LogoWhite from '../assets/images/logo-white.png';
import { mobile } from '../responsive';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;
const Left = styled.div`
    width: 180PX;
    border-right: 1px solid rgba(255,255,255, 0.3);
    height: 100vh;
    z-index: 2;
    ${mobile({ 
        borderRight: "none"
    })}
`;
const Logo = styled.img`
    width: 100px;
    position: relative;
    top: 30px;
    left: 40px;
    ${mobile({ 
        width: "100px"
    })}
`;
const SocialIcons = styled.ul`
    margin: 0;
    position: absolute;
    top: 60%;
    left: 45px;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    list-style: none;
    ${mobile({ 
        display: "none"
    })}

`;
const ListItem = styled.li`
    margin: 0px;
    margin-bottom: 60px;
    font-weight: 600;
    font-size: 11px;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;

    display: inline-block;
    -webkit-writing-mode: vertical-lr;
    /* old Win safari */
    writing-mode: vertical-lr;
    writing-mode: tb-lr;
    transform: scale(-1, -1);
    white-space: nowrap;
    &:nth-child(3) {
        margin-bottom: 0px;
    }
    &:hover {
        color: #fc8fc5;
    }
    ${mobile({ 

    })}
`;

const Right = styled.div`
    margin-right: 40px;
    height: 100vh;
    position: relative;
    ${mobile({ 
        display: "none"
    })}
`;
const RightBarUI = styled.div`
    height: 100vh;
    position: relative;
    display: flex;
`;
const Indicator = styled.div`
    position: absolute;
    right: 0px;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    align-items: center;
    justify-content: center;
    ${mobile({ 
        display: "none"
    })}
`;
const TopIndex = styled.span`
    font-weight: 600;
    font-size: 12px;
    color: #fff;
    display: block;
    margin-bottom: 14px;
`;
const BottomIndex = styled.span`
    font-weight: 600;
    font-size: 12px;
    color: #fff;
    display: block;
    margin-top: 14px;
`;
const BarWrap = styled.div`
`;
const Base = styled.div`
    position: relative;
    width: 1px;
    height: 120px;
    background-color: rgba(255, 255, 255, 0.2);
    margin-left: 7px;
`;
const Bar = styled.div`
    position: relative;
    width: 3px;
    height: 40px;
    background-color: #fff;
    transition: all 0.3s ease;
    top: ${props => props.slideIndex + "px"};
`;
const WatchFilmWrap = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    margin-top: 90vh;
    ${mobile({ 
        display: "none"
    })}
`;
const FilmText = styled.span`
    font-weight: 600;
    font-size: 11px;
    color: #fff;
    letter-spacing: 2px;
    margin-right: 15px;
    transition: all 0.3s ease;
    &:hover {
        color: #fc8fc5;
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
const BottonWrap = styled.div`
    display: flex;
    width: auto;
    height: 80px;
`;
const BottonPartA = styled.div`
    width: auto;
    height: 80px;
    padding: 0px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255,255,255,0.1);
    transition: all 0.3s ease;
    ${mobile({ 
        padding: "0px 20px",
        height: "70px"
    })}
`;
const BText = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    ${mobile({ 
        fontSize: "13px"
    })}
`;
const BottonPartB = styled.div`
    width: 80px;
    height: 80px;
    background-color: #f7238d;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    ${mobile({ 
        display: "none",
    })}
`;
const Center = styled.div`
    position: absolute;
    bottom: 20%;
    right: 20%;
    &:hover ${BottonPartA} {
        background-color: rgba(255,255,255,0.2);
    }
    &:hover ${BottonPartB} {
        background-color: #f559a7;
    }
    ${mobile({ 
        width: "225px",
        left: "0",
        right: "0",
        bottom: "15%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        justifyContent: "center"
    })}
`;
const MobileSlideWrap = styled.div`
    position: absolute;
    left: 50%;
    bottom: 8%;
    margin-left: -17px;
    display: none;
    ${mobile({ 
        display: "flex"
    })}
`;
const MobSlide = styled.div`
    width: 5px;
    height: 5px;
    border-radius:50%;
    background-color: ${props=> props.active === true ? "#f7238d" : "rgba(255,255,255,0.2)"};
    margin-right: 10px;
    &:nth-child(3) {
        margin-right: 0px;
    }
`;
export default function HomeUI() {

    const SlideIndicatorValues = [0, 40, 80];

    const [SlideIndex, setSlideIndex] = useState(0);
    const [currentValue, setCurrentValue] = useState(SlideIndicatorValues[SlideIndex]);

    useEffect(() => {
        setCurrentValue(SlideIndicatorValues[SlideIndex])
    }, [SlideIndex]);

    useEffect(() => {
        const interval = setTimeout(() => {
            setSlideIndex(SlideIndex ===  SlideIndicatorValues.length - 1 ? 0 : SlideIndex + 1); 
        }, 5000);
    }, [currentValue]);



    const [MobileSlideIndex, setMobileSlideIndex] = useState(1);
    const [MobileSlider, setMobileSlider] = useState([true, false, false]);

    useEffect(() => {
        switch (MobileSlideIndex) {
            case 1:
                setMobileSlider([true, false, false]);
              break;
            case 2:
                setMobileSlider([false, true, false]);
              break;
            case 3:
                setMobileSlider([false, false, true]);
          }
    }, [MobileSlideIndex]);

    useEffect(() => {
        const interval = setTimeout(() => {
            setMobileSlideIndex(MobileSlideIndex === 3 ? 1 : MobileSlideIndex + 1);
        }, 5000);
    }, [MobileSlider]);


      
    return (
        <Container>
            <Left>
                <Logo src={LogoWhite} />
                <SocialIcons>
                    <Link to={`/shop/products/`} style={{ textDecoration: 'none' }}>
                        <ListItem>INSTAGRAM</ListItem>
                    </Link>
                    <Link to={`/shop/products/`} style={{ textDecoration: 'none' }}>
                        <ListItem>FACEBOOK</ListItem>
                    </Link>
                    <Link to={`/shop/products/`} style={{ textDecoration: 'none' }}>
                        <ListItem>YOUTUBE</ListItem>
                    </Link>
                </SocialIcons>
            </Left>
            <Center>
                <Link to={`/shop/products/`} style={{ textDecoration: 'none' }}>
                    <BottonWrap>
                        <BottonPartA>
                            <BText>SHOP LATEST COLLECTIONS</BText>
                        </BottonPartA>
                        <BottonPartB>
                            <ArrowForwardIosOutlinedIcon style={{ color: '#fff', fontSize: 16 }}/>
                        </BottonPartB>
                    </BottonWrap>
                </Link>
            </Center>
            <Right>
                <RightBarUI>
                    <Indicator>
                        <TopIndex>01</TopIndex>
                        <BarWrap>
                            <Base>
                                <Bar slideIndex={currentValue} />
                            </Base>
                        </BarWrap>
                        <BottomIndex>03</BottomIndex>
                    </Indicator>
                    <WatchFilmWrap>
                        <Link to={`/shop/products/`} style={{ display: 'flex', textDecoration: 'none' }}>
                            <FilmText>WATCH FASHION FILM</FilmText>
                            <Circle>
                                <PlayArrowRoundedIcon style={{ color: '#000', fontSize: 14 }} />
                            </Circle>
                        </Link>
                    </WatchFilmWrap>
                </RightBarUI>
            </Right>
            <MobileSlideWrap>
                <MobSlide active={MobileSlider[0]}/>
                <MobSlide active={MobileSlider[1]}/>
                <MobSlide active={MobileSlider[2]}/>
            </MobileSlideWrap>
        </Container>
    );
}

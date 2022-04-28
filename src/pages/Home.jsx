import styled, { keyframes } from 'styled-components';
import { mobile } from '../responsive';
import HomeMenu from "../components/navigation/HomeMenu";
import HomeUI from "../components/HomeUI";
import bgImg from '../assets/images/homebg1.jpg';
import bgImg2 from '../assets/images/homebg2.jpg';
import bgImg3 from '../assets/images/homebg3.jpg';
import MobBg1 from '../assets/images/mob_bg1.jpg';
import MobBg2 from '../assets/images/mob_bg2.jpg';
import MobBg3 from '../assets/images/mob_bg3.jpg';


const slide = keyframes`
    10% {
        opacity: 1;
    }
    20% {
        opacity: 1;
    }
    30% {
        opacity: 0;
    }
    40% {
        transform: scale(1.1);
    }
`;

const Container = styled.div`
    margin: 0px;
    width: 100%;
    height: 100vh;
    bottom: 0px;
    top: 0px;
    position: fixed;
    overflow: hidden;
    background-color: #000;
`;
const Slide = styled.div`
    margin: 0px;
    width: 100%;
    height: 100vh;
    bottom: 0px;
    top: 0px; 
    background-size: cover;
    animation-name: ${slide};
    animation-duration: 25s;
    animation-iteration-count: infinite;
    position: absolute;
    opacity: 0;
    &:nth-child(2) {
        animation-delay: 5s;
    }
    &:nth-child(3) {
        animation-delay: 10s;
    }
    &:nth-child(4) {
        animation-delay: 15s;
    }
    &:nth-child(5) {
        animation-delay: 20s;
    }
    ${mobile({ 
        display: "none"
    })}
`;

const MobileSlide = styled.div`
    margin: 0px;
    width: 100%;
    height: 100vh;
    bottom: 0px;
    top: 0px;
    background-position: center;
    background-size: cover;
    animation-name: ${slide};
    animation-duration: 25s;
    animation-iteration-count: infinite;
    position: absolute;
    opacity: 0;
    display: none;
    &:nth-child(7) {
        animation-delay: 5s;
    }
    &:nth-child(8) {
        animation-delay: 10s;
    }
    &:nth-child(9) {
        animation-delay: 15s;
    }
    &:nth-child(10) {
        animation-delay: 20s;
    }
    ${mobile({ 
        display: "block"
    })}
`;


export default function Home() {
    return (
        <Container>
            <Slide style={{ backgroundImage: `url(${bgImg})`}} />
            <Slide style={{ backgroundImage: `url(${bgImg2})`}} />
            <Slide style={{ backgroundImage: `url(${bgImg3})`}} />
            <Slide style={{ backgroundImage: `url(${bgImg})`}} />
            <Slide style={{ backgroundImage: `url(${bgImg2})`}} />
            <MobileSlide style={{ backgroundImage: `url(${MobBg3})`}} />
            <MobileSlide style={{ backgroundImage: `url(${MobBg2})`}} />
            <MobileSlide style={{ backgroundImage: `url(${MobBg1})`}} />
            <MobileSlide style={{ backgroundImage: `url(${MobBg3})`}} />
            <MobileSlide style={{ backgroundImage: `url(${MobBg2})`}} />

            <HomeMenu />
            <HomeUI />
        </Container>
    );
}

import React from "react";
import styled, { keyframes }  from 'styled-components';
import { mobile } from '../responsive';


const waveLines = keyframes`
    0% {
            background-position: -468px 0;
        }
    100% {
        background-position: 468px 0;
        }
`;

const waveSquares= keyframes`
    0% {
         background-position: -468px 0;
        }
    100% {
        background-position: 468px 0;
        }
`;

/// Products
const Container = styled.div`
    width: 24%;
    margin-bottom: 40px;
    ${mobile({
        width: "48%"
    })}
`;
const Skeleton = styled.div`
    width: 100%;
`;
const Square = styled.div`
    height: 200px;
    width: 100%;
    margin-bottom:10px;
    /* border-radius: 5px; */
    background: rgba(130, 130, 130, 0.2);
    background: linear-gradient(to right, rgba(130, 130, 130, 0.2) 8%, rgba(130, 130, 130, 0.3) 18%, rgba(130, 130, 130, 0.2) 33%);
    background-size: 800px 100px;
    animation-name: ${waveSquares};
    animation-duration: 2s;
    animation-iteration-count: infinite;

`;
const Text = styled.div`
    width: 100%;
     height: 12px;
     margin-bottom:10px;
     background: rgba(130, 130, 130, 0.2);
     background: linear-gradient(to right, rgba(130, 130, 130, 0.2) 8%, rgba(130, 130, 130, 0.3) 18%, rgba(130, 130, 130, 0.2) 33%);
     background-size: 800px 100px;
     animation-name: ${waveLines};
    animation-duration: 2s;
    animation-iteration-count: infinite;

`;
const TextShort = styled.div`
    width: 40%;
     height: 12px;
     margin-bottom:10px;
     background: rgba(130, 130, 130, 0.2);
     background: linear-gradient(to right, rgba(130, 130, 130, 0.2) 8%, rgba(130, 130, 130, 0.3) 18%, rgba(130, 130, 130, 0.2) 33%);
     background-size: 800px 100px;
     animation-name: ${waveLines};
    animation-duration: 2s;
    animation-iteration-count: infinite;
`;
/// Product
const ContainerB = styled.div`
    width: 100%;
    margin-bottom: 40px;
`;
const SkeletonB = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
const ImageWrapper = styled.div`
    width: 40%;
    margin-right: 40px;
    display: flex;
    justify-content: flex-end;
    ${mobile({
        width: "100%"
    })}
`;

const DetailWrapper = styled.div`
  width: 35%;
  ${mobile({
        display: "none"
    })}
`;

const MiniImgContainer = styled.div`
    margin-right: 20px;
    width: 15%;
    display: flex;
    flex-direction: column;
`;
const MiniImage = styled.div`
    height: 100px;
    width: 100%;
    margin-bottom:10px;
    /* border-radius: 5px; */
    background: rgba(130, 130, 130, 0.2);
    background: linear-gradient(to right, rgba(130, 130, 130, 0.2) 8%, rgba(130, 130, 130, 0.3) 18%, rgba(130, 130, 130, 0.2) 33%);
    background-size: 800px 100px;
    animation-name: ${waveSquares};
    animation-duration: 2s;
    animation-iteration-count: infinite;
`;
const MainImage = styled.div`
    width: 60%;
    height: 330px;
    background: rgba(130, 130, 130, 0.2);
    background: linear-gradient(to right, rgba(130, 130, 130, 0.2) 8%, rgba(130, 130, 130, 0.3) 18%, rgba(130, 130, 130, 0.2) 33%);
    background-size: 800px 100px;
    animation-name: ${waveSquares};
    animation-duration: 2s;
    animation-iteration-count: infinite;
`;
const TextBA = styled.div`
    width: 100%;
    height: 22px;
    margin-bottom:20px;
    background: rgba(130, 130, 130, 0.2);
    background: linear-gradient(to right, rgba(130, 130, 130, 0.2) 8%, rgba(130, 130, 130, 0.3) 18%, rgba(130, 130, 130, 0.2) 33%);
    background-size: 800px 100px;
    animation-name: ${waveLines};
    animation-duration: 2s;
    animation-iteration-count: infinite;
`;
const TextBB = styled.div`
    width: 80%;
    height: 12px;
    margin-bottom:40px;
    background: rgba(130, 130, 130, 0.2);
    background: linear-gradient(to right, rgba(130, 130, 130, 0.2) 8%, rgba(130, 130, 130, 0.3) 18%, rgba(130, 130, 130, 0.2) 33%);
    background-size: 800px 100px;
    animation-name: ${waveLines};
    animation-duration: 2s;
    animation-iteration-count: infinite;
`;
const TextBC = styled.div`
    width: 40%;
    height: 25px;
    margin-bottom:40px;
    background: rgba(130, 130, 130, 0.2);
    background: linear-gradient(to right, rgba(130, 130, 130, 0.2) 8%, rgba(130, 130, 130, 0.3) 18%, rgba(130, 130, 130, 0.2) 33%);
    background-size: 800px 100px;
    animation-name: ${waveLines};
    animation-duration: 2s;
    animation-iteration-count: infinite;
`;
const TextBtn = styled.div`
    width: 80%;
    height: 30px;
    margin-bottom:10px;
    background: rgba(130, 130, 130, 0.2);
    background: linear-gradient(to right, rgba(130, 130, 130, 0.2) 8%, rgba(130, 130, 130, 0.3) 18%, rgba(130, 130, 130, 0.2) 33%);
    background-size: 800px 100px;
    animation-name: ${waveLines};
    animation-duration: 2s;
    animation-iteration-count: infinite;
`;


const Loader = ({type}) => {

    if (type === "products") {
        return (
            <Container>
                <Skeleton>
                    <Square/>
                    <Text />
                    <TextShort />
                </Skeleton>
            </Container>
        );
    }
    if (type === "product") {
        return (
            <ContainerB>
                <SkeletonB>
                    <ImageWrapper>
                        <MiniImgContainer>
                                    <MiniImage />
                                    <MiniImage />
                                    <MiniImage />
                        </MiniImgContainer>
                        <MainImage />
                    </ImageWrapper>

                    <DetailWrapper>
                        <TextBA/>
                        <TextBB/>
                        <TextBC/>
                        <TextBtn/>
                        <TextBtn/>
                    </DetailWrapper>

                </SkeletonB>
            </ContainerB>
        );
    }

    

}

export default Loader;
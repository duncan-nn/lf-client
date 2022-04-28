import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { mobile } from '../responsive';

const ImgContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    ${mobile({ 
        justifyContent: "center",
        padding: "0px",
        margin: "0px",
        height: "100vh"
    })}
`;
const MainImgWrapper = styled.div`
    width: 60%;
    background-color: #f3f3f3;
    ${mobile({ 
        width: "100%",
        height: "100%"
    })}

`;
const Image = styled.img`
    width: 100%;
    object-fit: cover;
    ${mobile({ 
        width: "100%",
        height: "100%",
        position: "absolute",
        left: "0px",
        top: "80px",
        bottom: "0px"
     })}
`;
const MiniImgContainer = styled.div`
    margin-right: 20px;
    width: 15%;
    display: flex;
    flex-direction: column;
    ${mobile({ 
        width: "20%",
        position: "absolute",
        left: "10px",
        top: "100px",
        zIndex: "1"
    })}
`;
const MiniImgWrapper = styled.div`
    width: 100%;
    background-color: #f3f3f3;
    margin-bottom: 10px;
    ${({ dragging }) => dragging && 'border: 4px solid #000;'}
`;
const MiniImage = styled.img`
    width: 100%;
    object-fit: cover;
`;
const ProductImgSlider = (product_images) => {
    const productImages = product_images;
    const imgList = [];

    for (const key in productImages.items) {
        if (productImages.items.hasOwnProperty(key)) {
            imgList.push(productImages.items[key]);
        }
    };

    const [mainImgUrl, setmainImgUrl] = useState("");
    const [mainImgKey, setmainImgKey] = useState(0);

    useEffect(() => {
        setmainImgUrl(imgList[0]);
    }, [imgList[0]]);

    const getImgSrc = (key) => {
        let imgkey = Number(key);
        let imgURL = imgList[imgkey];
        displayImage(imgURL, imgkey);
    };

    const displayImage = (imgUrl, imgkey) => {
        setmainImgKey(imgkey);
        setmainImgUrl(imgUrl);
    };

    return ( 
            <ImgContainer>
                <MiniImgContainer>
                    {
                        imgList.map (img => (
                            <MiniImgWrapper 
                                key={imgList.indexOf(img)} 
                                direction="right"
                                dragging={imgList.indexOf(img) === mainImgKey}
                            >
                                <MiniImage 
                                    onClick={()=>getImgSrc(imgList.indexOf(img))}
                                    src={img}/>
                            </MiniImgWrapper>
                        ))
                    }

                </MiniImgContainer>
                <MainImgWrapper>
                    <Image src={mainImgUrl}/>
                </MainImgWrapper>
            </ImgContainer>
                    
     );
}
 
export default ProductImgSlider;
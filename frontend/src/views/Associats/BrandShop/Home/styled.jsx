import styled from "styled-components";

export const HomeContainer = styled.div`
  .shop-page-hero-container {
    width: 100%;
    height: 570px;
    border-radius: 0 0 400px 0;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0 0 400px 0;
    }

    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 0 0 400px 0;
    }
  }

  .content{
      position: absolute;
      top: 370px;
      left: 100px;
      transform: translate(0,-50%);
      max-width: 660px;

      @media screen and (max-width: 1140px){
        top: 400px;
      }

      @media screen and (max-width: 970px){
        max-width: 80%;
        left: 50px;
      }

      @media screen and (max-width: 768px){
        left: 20px;
      }

      .shop-title{
        color: white;
        font-weight: bold;
        font-family: "Poppins", serif;
        font-size: 60px;

        @media screen and (max-width: 970px){
          font-size: 45px;
        }

        @media screen and (max-width: 768px){
          font-size: 35px;
        }
      }
    }

  .logo-box {
    display: flex;
    flex-direction: column;
    align-items: end;
    position: absolute;
    top: 600px;
    right: 40px;

    @media screen and (max-width: 1140px){
      top: 630px;
      right: 20px;
    }

    @media screen and (max-width: 970px){
      top: 600px;
      right: 40px;
    }

    @media screen and (max-width: 768px){
        right: 20px;
    }

    span {
      color: #004E64;
      font-size: 16px;
      font-weight: 300;x
    }

    img {
      width: 150px;
    }
  }

  .section-title-desc {
    margin: 20px 0;
    text-align: center;

    h2 {
      font-size: 34px;
      font-weight: 700;
      color: #000;
      margin-bottom: 10px;

      @media screen and (max-width: 768px) {
        font-size: 28px;
      }
    }

    p {
      font-size: 20px;
      font-weight: 400;
      text-transform: capitalize;
      color: #616173;
    }
  }
`;

export const SliderSectionContainer = styled.div`
  position: relative;

  .content {
    position: absolute;
    bottom: 120px;
    left: 120px;

    .shop-title {
      width: max-content;
      font-size: 40px;
      font-weight: bold;
      margin-bottom: 40px;
      color: #fff;
    }

    @media screen and (max-width: 768px) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .shop-title {
        width: auto;
        font-size: 25px;
      }
    }
  }
`;

export const ProductsContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;

  .product-list-section {
    padding-bottom: 0;
  }
`;

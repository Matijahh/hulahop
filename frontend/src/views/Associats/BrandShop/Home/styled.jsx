import styled from "styled-components";

export const HomeContainer = styled.div`
  .home-slide-wrapper {
    width: 100%;
    height: calc(100vh - 270px);
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }

  .social-links {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    width: 100%;
    background: #f8f8f8;
    border-bottom: 1px solid #e5eaee;

    .social-links-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      border: 1.5px solid rgb(241, 103, 109);
      border-radius: 4px;
      margin: 0 20px;
      cursor: pointer;

      svg {
        width: 40px;
        height: 40px;
        color: rgb(241, 103, 109);
      }

      &:hover {
        background-color: rgb(241, 103, 109);
        svg {
          color: #fff;
        }
      }
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
`;

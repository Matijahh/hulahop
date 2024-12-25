import styled from "styled-components";

export const SettingsContainer = styled.div`
  label {
    margin-bottom: 9px;
  }

  .profile-pic-image {
    width: 100%;
    height: 130px;
    position: relative;

    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }

    .hidden-input {
      height: 130px;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
      opacity: 0;
    }

    .pick-image-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      visibility: hidden;
      transition: all 0.2s ease-in-out;

      svg {
        color: #fff;
      }
    }

    &:hover {
      .pick-image-icon {
        visibility: visible;
      }
    }
  }
`;

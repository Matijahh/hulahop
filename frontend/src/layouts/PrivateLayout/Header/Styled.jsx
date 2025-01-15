import styled from "styled-components";

const HeaderWrapperStyled = styled.div`
  top: 0;
  z-index: 999;

  .search-menu-container {
    width: 420px;
  }

  .menu-wrapper {
    height: 100vh;
    width: 100%;
    position: absolute;
    background-color: #00000040;
    z-index: 888;
    cursor: pointer;
    display: none;

    &.open {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
    }
  }

  /** Desktop Header Styling */

  .header-container {
    background: white;
    display: block;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px 0;

    .flex-box-header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;

      @media (max-width: 1140px) {
        flex-direction: column;
      }
    }

    .contact-box {
      display: flex;
      align-items: center;
      width: max-content;

      @media screen and (max-width: 970px) {
        display: none;
      }

      .logo-box {
        width: 150px;

        img {
          width: 100%;
          max-width: 100%;
          height: auto;
        }
      }

      .contact-phone-wrapper {
        width: max-content;
        margin-left: 30px;

        @media screen and (max-width: 1320px) {
          display: none;
        }

        a {
          text-decoration: none;
          font-size: 16px;
          color: #f1676d;

          svg {
            fill: #f1676d;
            margin-right: 5px;
          }
        }
      }
    }

    /* .top-area-end {
      display: inline-block;
      width: fit-content;

      .language-transfer-tab {
        display: inline-block;

        Button {
          all: unset;
          width: 90px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          background: transparent;
          font-size: 16px;
          padding: 5px;
          color: #2c2c2c;
          cursor: pointer;
        }
      }

      .social-tab {
        display: inline-flex;
        align-items: center;
        gap: 5px;

        .social-icon {
          a {
            padding: 5px;
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;

            svg {
              color: #2c2c2c;
              width: 24px;
              height: 24px;
            }

            &:hover {
              svg {
                color: #f1676d;
              }
            }
          }
        }
      }
    } */

    .open-menu-box {
      display: none;
      width: 100%;

      .logo-box {
        img {
          width: 150px;
        }
      }

      .open-menu {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 30px;
        height: 30px;

        svg {
          fill: #f1676d;
        }
      }
    }

    @media (max-width: 970px) {
      .open-menu-box {
        display: flex;
        justify-content: space-between;
      }
    }

    .right-navigation-container {
      display: flex;
      width: max-content;
    }

    /** Navigation Styling */

    .navigation-container {
      .header-main-user {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;

        .header-menu-user {
          width: 100%;

          .nav-user {
            position: relative;
            display: flex;
            -webkit-box-pack: justify;
            justify-content: space-between;
            -webkit-box-align: center;
            align-items: center;
            pointer-events: all;
            width: 100%;

            .profile-box-container {
              @media screen and (max-width: 969px) {
                display: flex;
                margin-bottom: 20px;
                margin-left: 0;
              }

              @media screen and (min-width: 970px) {
                display: none;
              }
            }

            .logo-box {
              @media screen and (max-width: 969px) {
                display: flex;

                img {
                  width: 200px;
                  margin-bottom: 50px;
                }
              }

              @media screen and (min-width: 970px) {
                display: none;
              }
            }

            ul {
              width: max-content;
              display: flex;
              align-items: center;
              justify-content: space-between;
              flex-wrap: wrap;
              list-style: none;
              margin-bottom: 0;
              height: 100%;
              padding: 0;

              li {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 25px;

                button {
                  &:hover {
                    background-color: transparent;
                  }
                }

                a {
                  border: none;
                  text-decoration: none;
                  text-transform: capitalize;
                  color: #f1676d;
                  font-size: 16px;
                  font-weight: 400;
                  border-bottom: 2px solid transparent;

                  & + .MuiButton-endIcon {
                    svg {
                      color: #f1676d;
                      fill: currentColor;
                    }
                  }

                  &.active-nav {
                    color: #f1676d;
                    font-weight: bold;

                    & + .MuiButton-endIcon {
                      svg {
                        color: #f1676d;
                        fill: currentColor;
                      }
                    }
                  }
                }
              }
            }

            .close-menu-box {
              display: none;
              padding-right: 20px;
              padding-top: 20px;
              width: 100%;

              .close-menu {
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                width: 30px;
                height: 30px;

                svg {
                  fill: #f1676d;
                }
              }
            }
          }
        }
      }

      @media screen and (max-width: 970px) {
        padding: 0;

        .header-main-user {
          .header-menu-user {
            width: 100%;

            .nav-user {
              position: fixed;
              flex-direction: column;
              height: 100%;
              overflow-y: auto;
              background-color: #f8f8f8;
              width: 100%;
              top: 0;
              left: -100%;
              z-index: 9999;

              ul {
                display: block;

                li {
                  height: 48px;
                  padding: 5px 10px;
                  background-color: #f8f8f8;
                  margin-bottom: 4px;
                  margin-top: 4px;
                }
              }

              .close-menu-box {
                display: flex;
                justify-content: end;
              }

              &.open {
                left: 0;
              }
            }
          }
        }
      }
    }

    /** Profile Box */

    .profile-box-container {
      margin-left: 30px;
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 210px;
      justify-content: end;

      @media screen and (max-width: 970px) {
        display: none;
      }

      .profile-box {
        background: #f1676d;
        padding: 5px 10px;
        border-radius: 30px;
        color: white;
        cursor: pointer;

        a {
          color: white;
          text-decoration: none;
        }

        p {
          margin-left: 5px;
        }

        svg {
          color: white;
          width: 25px;
          height: 25px;
        }
      }

      .cart-box {
        cursor: pointer;

        svg {
          color: #f1676d;
          margin-right: 10px;
          width: 25px;
          height: 25px;
        }
      }
    }
  }

  @media screen and (max-width: 970px) {
    position: relative;
  }

  /* .header-middle-area {
    border-top: 1px solid #e5eaee;
    background: #fff;
    padding: 10px 20px;

    .logo-box {
      width: 200px;

      @media screen and (max-width: 825px) {
        display: none;
      }

      img {
        width: 180px;
        max-width: 100%;
        height: auto;
      }
    }

    .search-box {
      width: 420px;
      max-width: 100%;

      .search-btn {
        cursor: pointer;
        background: #f1676d;
        color: white;
        padding: 2px;
        border-radius: 4px;
      }
    }

    @media (max-width: 825px) {
      .search-box {
        width: 100%;
      }
    }
  } */
`;

export default HeaderWrapperStyled;

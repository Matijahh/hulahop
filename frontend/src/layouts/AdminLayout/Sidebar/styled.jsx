import styled from "styled-components";

export const SidebarContainer = styled.div`
  .menu-icon {
    height: 60px;
    padding: 0 30px;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    background-color: #fff;
    z-index: 999;
    width: 100%;
    display: none;
    box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15) !important;

    .logo-cover {
      margin-top: 0;

      img {
        width: 160px;
      }
    }

    svg {
      cursor: pointer;
    }

    @media screen and (max-width: 1080px) {
      display: flex;
    }
  }

  .sidebar-container {
    width: 250px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15) !important;
    transition: position 0.5s ease-in-out;

    @media screen and (max-width: 1080px) {
      display: none;
    }

    &.show-sidebar {
      @media screen and (max-width: 1080px) {
        display: block;
        width: 100%;
        top: 60px;
        height: calc(100vh - 60px);
        z-index: 1000;
      }
    }

    &::-webkit-scrollbar {
      width: 5px;
      border-radius: 5px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #eef1f6;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #dcdcdc;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #dcdcdc;
    }

    .logo-cover {
      @media screen and (max-width: 1080px) {
        display: none;
      }
    }
  }

  .logo-cover {
    width: 200px;
    margin: 0 auto;
    margin-top: 30px;

    img {
      width: 200px;
    }
  }

  .tab-list {
    margin-top: 30px;
    overflow-y: auto;
    /*110 px in height represents total height of logo with paddings */
    height: calc(100% - 110px);
  }

  .tab-item {
    display: flex;
    align-items: center;
    padding: 11px 22px;
    color: #7e7e7e;
    border-left: 2px solid transparent;
    text-transform: capitalize;

    svg {
      fill: #7e7e7e;
    }

    &.active {
      color: rgba(241, 103, 109, 1);

      svg {
        fill: rgba(241, 103, 109, 1);
      }

      background: rgba(241, 103, 109, 0.05);
      border-left: 2px solid rgba(241, 103, 109, 1);
    }

    svg {
      margin-right: 10px;
    }
  }
`;

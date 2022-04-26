import { styled } from "@mui/material";

const MainGreyButton = styled("button")`
  margin-top: 13px;
  color: black;
  width: 230px;
  font-size: 16px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 10px 10px 10px;
  outline: 0;
  border: 1px solid black;
  border-radius: 30px;
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  :after {
    content: "";
    background-color: #e8e8e8;
    border-radius: 30px;
    width: 100%;
    z-index: -1;
    position: absolute;
    height: 100%;
    top: 2px;
    left: -5px;
    transition: 0.2s;
  }

  :hover:after {
    top: 0px;
    left: 0px;
  }

  @media (min-width: 768px) {
    padding: 5px 10px 5px;
  }
`;

export default MainGreyButton;

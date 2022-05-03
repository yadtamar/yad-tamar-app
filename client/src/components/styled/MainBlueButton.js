import { styled } from "@mui/material";

const MainBlueButton = styled("button")`
  margin-top: 13px;
  color: white;
  width: 180px;
  font-size: 16px;
  font-weight: 200;
  letter-spacing: 1px;

  outline: 0;
  border: 1px solid black;
  border-radius: 30px;
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  z-index: 999;

  :after {
    content: "";
    background-color: #8ca8e0;
    border-radius: 30px;
    width: 100%;
    z-index: -1;
    position: absolute;
    height: 100%;
    top: 2px;
    left: -5px;
    transition: 0.5s;
  }

  :hover:after {
    top: 0px;
    left: 0px;
  }
`;

export default MainBlueButton;

import { Grid, styled } from "@mui/material";

const DetailsItem = styled(Grid)`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  line-height: 20px;
`;

export default DetailsItem;

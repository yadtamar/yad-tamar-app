import { Grid, Typography, styled } from "@mui/material";

export const DetailsGrid = styled(Grid)`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  line-height: 20px;
`;

const DetailsItem = ({ fieldName, fieldValue }) => {
  return (
    <DetailsGrid item>
      <Typography variant="subtitle1">{fieldName}</Typography>
      <Typography variant="subtitle1">{fieldValue}</Typography>
    </DetailsGrid>
  );
};

export default DetailsItem;

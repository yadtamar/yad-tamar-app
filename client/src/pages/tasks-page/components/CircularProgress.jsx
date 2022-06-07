import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function CircularProgressWithLabel(props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= props.value ? props.value : prevProgress + 1
      );
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, [props.value]);

  return (
    <Box
      style={{
        backgroundColor: "white",
        color: "#8ca8e0",
        borderRadius: "50%",
        boxShadow: "5px 3px 12px 1px rgba(39, 39, 39, 0.25)",
      }}
      sx={{ position: "absolute", display: "flex" }}
    >
      <CircularProgress variant="determinate" value={progress} size={55} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "inset 1px 1px 15px 0px  rgba(39, 39, 39, 0.17)",
          color: "#8ca8e0",
          borderRadius: "50%",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${progress}%`}
        </Typography>
      </Box>
    </Box>
  );
}

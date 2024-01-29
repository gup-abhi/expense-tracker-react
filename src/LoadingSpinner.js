import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSpinner = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

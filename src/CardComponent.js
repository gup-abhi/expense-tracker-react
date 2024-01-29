import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const CardComponent = ({ Component }) => {
  return (
    <Card className="bg-dark text-white card-shadow my-2">
      <CardContent>
        <Component />
      </CardContent>
    </Card>
  );
};

export default CardComponent;

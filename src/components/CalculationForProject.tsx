import React from "react";
import ProjectT from "../commonTypes/ProjectT";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getCurrentProjectId, projectsActions } from "../reduxSlices/projects";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { CalculationForProjectT } from "../commonTypes/CalculationT";
import { calculationActions, getCurrentCalculation } from "../reduxSlices/calculation";

interface Props {
  calculation: CalculationForProjectT;
}

export default function Calculation({ calculation }: Props) {
  const calculationSelected = useAppSelector(getCurrentCalculation)?.id === calculation.id;
  const projectSelected = useAppSelector(getCurrentProjectId) || 0;
  const dispatch = useAppDispatch();

  return (
    <Card
      sx={{
        display: "flex",
        maxWidth: "30rem",
        borderColor: calculationSelected ? "primary.light" : undefined,
        borderWidth: calculationSelected ? "0.1rem" : undefined,
        borderStyle: calculationSelected ? "solid" : undefined,
      }}
    >
      <CardActionArea
        onClick={() =>
          dispatch(
            calculationActions.setCurrentCalculation({ ...calculation, projectId: projectSelected })
          )
        }
      >
        <CardContent>
          <Typography
            variant="h6"
            color={calculationSelected ? "primary.main" : undefined}
            fontWeight={calculationSelected ? "bold" : undefined}
          >
            {calculation.name}
          </Typography>
          <Typography
            variant="body2"
            color={calculationSelected ? "primary.light" : "text.secondary"}
          >
            {calculation.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          color="primary"
          onClick={() => dispatch(calculationActions.deleteAndGetCalculation(calculation.id))}
          sx={{ height: "100%" }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

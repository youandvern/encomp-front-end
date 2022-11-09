import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getCurrentProjectId } from "../reduxSlices/projects";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Stack } from "@mui/material";
import { CalculationForProjectT } from "../commonTypes/CalculationT";
import { calculationActions, getCurrentCalculation } from "../reduxSlices/calculation";
import DeleteAlertButton from "./DeleteAlertButton";
import UpdateFormButton from "./UpdateFormButton";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";

interface Props {
  calculation: CalculationForProjectT;
}

export default function Calculation({ calculation }: Props) {
  const calculationSelected = useAppSelector(getCurrentCalculation)?.id === calculation.id;
  const projectSelected = useAppSelector(getCurrentProjectId) || 0;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSelect = () => {
    dispatch(
      calculationActions.setCurrentCalculation({ ...calculation, projectId: projectSelected })
    );
    navigate(routes.calculation.path(calculation.id));
  };

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
      <CardActionArea onClick={handleSelect}>
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
        <Stack direction="row">
          <UpdateFormButton formTitle="Edit calculation information" calculation={calculation} />
          <DeleteAlertButton
            objectType="calculation"
            objectName={calculation.name}
            onConfirmDelete={() => {
              dispatch(calculationActions.deleteAndGetCalculation(calculation.id));
            }}
          />
        </Stack>
      </CardActions>
    </Card>
  );
}

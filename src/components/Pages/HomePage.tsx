import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import ContactFormButton from "../ContactFormButton";

const StyledHref = styled("a")({
  textDecoration: "none",
  color: "inherit",
  fontWeight: "bold",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  fontWeight: "bold",
});

interface FullPageBoxProps {
  fillColor?: "primary" | "secondary";
}

const DocumentationHref = () => (
  <StyledHref href={routes.documentation.path()} target="_blank" rel="noopener noreferrer">
    Documentation
  </StyledHref>
);

const FullPageBox = styled(Box)<FullPageBoxProps>(({ theme, fillColor }) => ({
  padding: "3rem",
  height: "80vh",
  paddingBottom: "20vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor:
    fillColor === "primary" ? theme.palette.primary.light : theme.palette.secondary.light,
}));

export default function HomePage() {
  return (
    <>
      <Container>
        <FullPageBox fillColor="secondary">
          <Typography variant="h2" fontSize="15vh">
            Welcome To Encomp!
          </Typography>
          <Typography variant="h4">
            Build your calculations quickly and let our platform streamline the rest of your
            workflow.
          </Typography>
          <Typography textAlign="center" marginBottom="6vh">
            <KeyboardDoubleArrowDownIcon fontSize="large" />
          </Typography>
        </FullPageBox>
        <FullPageBox fillColor="primary">
          <Typography variant="h2" fontSize="20vh">
            Encomp is:
          </Typography>
          <Typography variant="h4">Simple.</Typography>
          <Typography>
            Designed to be easy to learn, simple to use, and intuitive to work with.
          </Typography>
          <Typography variant="h4">Powerful.</Typography>
          <Typography>
            With cloud computing and modern Python at your fingertips, your calculations can reach a
            whole new level.
          </Typography>
          <Typography variant="h4">Efficient.</Typography>
          <Box>
            <Typography>
              You can <b>focus on the important parts</b> of your calculation (i.e. the content) and
              we will <b>automate the rest:</b>
            </Typography>
            <Typography marginLeft="2em">
              <SubdirectoryArrowRightIcon /> Detailed calculation reports
            </Typography>
            <Typography marginLeft="2em">
              <SubdirectoryArrowRightIcon /> Beautiful design interfaces
            </Typography>
            <Typography marginLeft="2em">
              <SubdirectoryArrowRightIcon /> Natural project management
            </Typography>
          </Box>
        </FullPageBox>
        <FullPageBox fillColor="secondary">
          <Typography variant="h2" fontSize="20vh">
            First time here?
          </Typography>
          <Typography variant="h4">Welcome!</Typography>
          <Typography>
            We're excited that you found us and want to make using Encomp as seemless as possible.
          </Typography>
          <Typography marginLeft="2em">
            <SubdirectoryArrowRightIcon /> The <DocumentationHref /> site is full of helpful content
            for beginners and experts alike.
          </Typography>
          <Typography marginLeft="2em">
            <SubdirectoryArrowRightIcon /> You can also{" "}
            <StyledLink to={routes.register.path()}>make a free account</StyledLink> and explore on
            your own.
          </Typography>
        </FullPageBox>
        <FullPageBox fillColor="primary">
          <Typography variant="h2" fontSize="20vh">
            Questions / Contact
          </Typography>
          <Typography>
            The contact button makes it easy to reachout with any questions or feedback you might
            have: <ContactFormButton inline />
          </Typography>
          <Typography marginBottom="5vh">
            We are continually adding <b>new features</b> to make Encomp better so please let us
            know if theres something new you would like to see.
          </Typography>
        </FullPageBox>
      </Container>
    </>
  );
}

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import ContactFormButton from "../ContactFormButton";

const StyledHref = styled("a")(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
  fontWeight: "bold",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
  fontWeight: "bold",
}));

const DocumentationHref = () => (
  <StyledHref href={routes.documentation.path()} target="_blank" rel="noopener noreferrer">
    Documentation
  </StyledHref>
);

interface FullPageBoxProps {
  fillColor?: "primary" | "secondary";
}

const FullPageBox = styled(Box)<FullPageBoxProps>(({ theme, fillColor }) => ({
  minHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor:
    fillColor === "primary" ? theme.palette.primary.light : theme.palette.secondary.light,
  padding: "3rem",
  paddingBottom: "20vh",
  [theme.breakpoints.down("md")]: {
    padding: "1rem",
    paddingBottom: "20vh",
  },
}));

const BigHeader = styled(Typography)(({ theme }) => ({
  fontSize: "5rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
  },
}));

export default function HomePage() {
  return (
    <>
      <Box sx={{ padding: "0px" }}>
        <FullPageBox fillColor="secondary">
          <BigHeader variant="h2">Welcome To efficalc!</BigHeader>
          <Typography variant="h4">
            Quickly build calculations that you can use once or hundreds of times.
          </Typography>
          <Typography>
            The efficalc platform has been thoughtfully designed to optimize design calculation
            workflows for engineers.
          </Typography>
          <Typography textAlign="center" marginBottom="16vh">
            <KeyboardDoubleArrowDownIcon fontSize="large" />
          </Typography>
        </FullPageBox>
        <FullPageBox fillColor="primary">
          <BigHeader variant="h2">efficalc is:</BigHeader>
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
              When you write your calculation template using our <b>transparent</b> and highly{" "}
              <b>readable</b> syntax, efficalc will automatically generate:
            </Typography>
            <Typography marginLeft="2em">
              <SubdirectoryArrowRightIcon /> Intuitive design interfaces for iterating with
              different design inputs
            </Typography>
            <Typography marginLeft="2em">
              <SubdirectoryArrowRightIcon /> Submittal ready calculation reports
            </Typography>
            <Typography marginLeft="2em">
              <SubdirectoryArrowRightIcon /> Cloud based project management
            </Typography>
          </Box>
        </FullPageBox>
        <FullPageBox fillColor="secondary">
          <BigHeader variant="h2">First time here?</BigHeader>
          <Typography variant="h4">Welcome!</Typography>
          <Typography>
            We're excited that you found us and want to make using efficalc as seemless as possible.
          </Typography>
          <Box display="flex" marginLeft="2em">
            <QuestionMarkIcon />
            <Typography>
              The <DocumentationHref /> site is full of helpful content for beginners and experts
              alike.
            </Typography>
          </Box>
          <Box display="flex" marginLeft="2em">
            <PersonIcon />
            <Typography>
              You can also <StyledLink to={routes.register.path()}>make a free account</StyledLink>{" "}
              and explore on your own.
            </Typography>
          </Box>

          <Typography marginBottom="20vh">
            Ditch ambiguous and confusing spreadsheet calcs. <b>Start using efficalc today!</b>
          </Typography>
        </FullPageBox>
        <FullPageBox fillColor="primary">
          <BigHeader variant="h2">Questions / Contact</BigHeader>
          <Box>
            <Typography marginBottom="3rem">
              The contact button makes it easy to reachout with any questions or feedback you might
              have: <ContactFormButton inline />
            </Typography>
            <Typography marginBottom="35vh">
              We are continually adding <b>new features</b> to make efficalc better so please let us
              know if there is something new you would like to see.
            </Typography>
          </Box>
        </FullPageBox>
      </Box>
    </>
  );
}

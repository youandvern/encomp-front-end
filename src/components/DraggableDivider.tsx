import { Stack } from "@mui/system";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  createContext,
  createRef,
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface ContainerProps {
  child: JSX.Element;
}

interface ContextProps {
  clientWidth: number | null;
  setClientWidth: React.Dispatch<React.SetStateAction<number | null>>;
  onMouseHoldDown: MouseEventHandler<HTMLDivElement>;
}

const DividerContext = createContext<ContextProps>({
  clientWidth: null,
  setClientWidth: (v) => {},
  onMouseHoldDown: (e) => {},
});

const DividerDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: theme.palette.primary.main,
  overflow: "hidden",
  cursor: "col-resize",
  width: "0.5rem",
  color: "white",
  position: "relative",
  marginLeft: "0.25rem",
  borderRadius: "0.25rem",
}));

export const Divider = () => {
  const { onMouseHoldDown } = useContext(DividerContext);

  return (
    <DividerDiv onMouseDown={onMouseHoldDown}>
      <MoreVertIcon sx={{ position: "absolute", left: "-0.5rem" }} />
    </DividerDiv>
  );
};

const LeftDiv = styled("div")({
  width: "50vw",
});

const LeftContainer = ({ child }: ContainerProps) => {
  const leftRef = createRef<HTMLDivElement>();
  const { clientWidth, setClientWidth } = useContext(DividerContext);

  useEffect(() => {
    if (!clientWidth) {
      setClientWidth(leftRef.current ? leftRef.current.clientWidth : null);
      return;
    }

    if (leftRef.current) {
      leftRef.current.style.minWidth = clientWidth + "px";
      leftRef.current.style.maxWidth = clientWidth + "px";
    }
  }, [clientWidth]);

  return <LeftDiv ref={leftRef}>{child}</LeftDiv>;
};

const RightDiv = styled("div")({
  flex: "1",
});

const RightContainer = ({ child }: ContainerProps) => {
  return <RightDiv> {child}</RightDiv>;
};

interface Props {
  leftChild: JSX.Element;
  rightChild: JSX.Element;
}

// Divider ref https://blog.logrocket.com/how-to-create-a-split-pane-component-in-react/
export default function DraggableDivider({ leftChild, rightChild }: Props) {
  const [clientWidth, setClientWidth] = useState<number | null>(null);
  const xDividerPos = useRef<number | null>(null);

  const onMouseHoldDown: MouseEventHandler<HTMLDivElement> = (e) => {
    xDividerPos.current = e.clientX;
  };

  const onMouseHoldUp = () => {
    xDividerPos.current = null;
  };

  const onMouseHoldMove = (e: MouseEvent) => {
    if (!xDividerPos.current) {
      return;
    }

    setClientWidth(
      clientWidth && xDividerPos.current ? clientWidth + e.clientX - xDividerPos.current : null
    );

    xDividerPos.current = e.clientX;
  };

  useEffect(() => {
    document.addEventListener("mouseup", onMouseHoldUp);
    document.addEventListener("mousemove", onMouseHoldMove);

    return () => {
      document.removeEventListener("mouseup", onMouseHoldUp);
      document.removeEventListener("mousemove", onMouseHoldMove);
    };
  });

  return (
    <DividerContext.Provider
      value={{
        clientWidth,
        setClientWidth,
        onMouseHoldDown,
      }}
    >
      <Stack direction="row" width="100%" flexWrap="wrap">
        <LeftContainer child={leftChild} />
        <Divider />
        <RightContainer child={rightChild} />
      </Stack>
    </DividerContext.Provider>
  );
}

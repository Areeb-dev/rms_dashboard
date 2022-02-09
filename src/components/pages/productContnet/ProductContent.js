import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";

export default function ProductCard() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", height: 40, flexShrink: 0 }}>
            <Avatar
              sx={{ width: "50%", height: 30, flexShrink: 0 }}
              alt="Burger Image"
              variant="square"
              src="https://media.gettyimages.com/photos/big-cheese-burger-with-fries-picture-id1174648824?s=170667a"
            />
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Anda Walay Burger
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6">Description:</Typography>
          <Typography variant="p">I love Anda walay Burger</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

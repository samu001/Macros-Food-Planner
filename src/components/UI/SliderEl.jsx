import React from "react";
import { Slider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function SliderEl(props) {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#5E548E",
                darker: "#053e85",
            },
        },
    });

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Slider
                    defaultValue={25}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    min={5}
                    max={50}
                    // On change it will call the handleChange props passing the event. handleChange prop will excecute a function
                    onChange={(e) => props.handleChange(e)}
                    color="primary"
                />
            </ThemeProvider>
        </div>
    );
}

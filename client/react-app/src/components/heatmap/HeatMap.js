import React from "react";
import { Component } from "react";
import USAMap from "react-usa-map";
import {Box, ThemeProvider, CssBaseline, Typography, Select, TextField, MenuItem, Autocomplete} from "@mui/material"
import { Stack } from '@mui/system';
import { useEffect } from "react";
import { useState } from "react";
import { DataThresholdingSharp } from "@mui/icons-material";



class HeatMap extends Component {

    mapHandler = (event) => {
        // localStorage.setItem('state', event.target.dataset.name);
        const thing = event.target.dataset.name;
        alert(thing);
        return thing
        // localStorage.setItem('state', event.target.dataset.name);
    };
    
    
    statesCustomConfig = () => {
        //highlight with color inside map

        /*
        75-66: navy
        65-56: dark blue
        55-46: royal blue
        45-36: blue
        35-26: light blue
        25-16: baby blue
        15-6:  sky blue
        6-0: super light blue
        */

        const blue75to66 = "#020042"
        const blue65to56 = "#040075"
        const blue55to46 = "#0802b3"
        const blue45to36 = "#0800ff"
        const blue35to26 = "#006eff"
        const blue25to16 = "#2b87ff"
        const blue15to6 = "#47b6ff"
        const blue5to0 = "#82e8ff"

        const color75to66 = "#083600"
        const color65to56 = "#0d4d00"
        const color55to46 = "#137000"
        const color45to36 = "#1db000"
        const color35to26 = "#26db02"
        const color25to16 = "#57f736"
        const color15to6 = "#93ff7d"
        const color5to0 = "#ccffc2"


        return{
            
            "AL":{
                //11%
                fill: color15to6,

            },
            
            "AK":{
                //6%
                fill: color15to6,

            },

            "AZ":{
                //18%
                fill: color25to16,

            },

            "AR":{
                //14%
                fill: color15to6,

            },

            "CA":{
                //44%
                fill: color45to36,

            },

            "CO":{
                //16%
                fill: color25to16,

            },

            "CT":{
                //52%
                fill: color55to46,

            },

            "DE":{
                //43%
                fill: color45to36,

            },

            "FL":{
                //21%
                fill: color25to16,

            },

            "GA":{
                //17%
                fill: color25to16,

            },

            "HI":{
                //37%
                fill: color45to36,

            },

            "ID":{
                //17%
                fill: color25to16,

            },

            "IL":{
                //20%
                fill: color25to16,

            },

            "IN":{
                //27%
                fill: color35to26,

            },

            "IA":{
                //44%
                fill: color45to36,

            },

            "KS":{
                //32%
                fill: color35to26,

            },

            "KY":{
                //14%
                fill: color15to6,

            },

            "LA":{
                //4%
                fill: color5to0,

            },

            "ME":{
                //72%
                fill: color75to66,

            },

            "MD":{
                //44%
                fill: color45to36,

            },

            "MA":{
                //55%
                fill: color55to46,

            },

            "MI":{
                //48%
                fill: color55to46,

            },

            "MN":{
                //49%
                fill: color55to46,

            },

            "MS":{
                //8%
                fill: color15to6,

            },

            "MO":{
                //30%
                fill: color35to26,

            },

            "MT":{
                //15%
                fill: color15to6,

            },

            "NE":{
                //14%
                fill: color15to6,

            },

            "NV":{
                //18%
                fill: color25to16,

            },

            "NH":{
                //32%
                fill: color35to26,

            },


            "NJ":{
                //46%
                fill: color55to46,
                clickHandler: (event) => console.log('Custom handler for NJ', event.target.dataset)
                // clickHandler: (event) => thing = event.target.dataset

            },

            "NM":{
                //13%
                fill: color15to6,

            },

            "NY":{
                //51%
                fill: color55to46,

            },

            "NC":{
                //23%
                fill: color25to16,

            },

            "ND":{
                //29%
                fill: color35to26,

            },

            "OH":{
                //19%
                fill: color25to16,

            },
            
            "OK":{
                //10%
                fill: color15to6,

            },

            "OR":{
                //55%
                fill: color55to46,

            },

            "PA":{
                //36%
                fill: color45to36,

            },

            "RI":{
                //39%
                fill: color45to36,

            },

            "SC":{
                //8%
                fill: color15to6,

            },

            "SD":{
                //32%
                fill: color35to26,

            },

            "TN":{
                //7%
                fill: color15to6,

            },

            "TX":{
                //13%
                fill: color15to6,

            },

            "UT":{
                //17%
                fill: color25to16,

            },

            "VT":{
                //62%
                fill: color65to56,

            },

            "VA":{
                //23%
                fill: color25to16,

            },

            "WA":{
                //41%
                fill: color45to36,

            },

            "WV":{
                //2%
                fill: color5to0,

            },

            "WI":{
                //44%
                fill: color45to36,

            },

            "WY":{
                //15%
                fill: color15to6,

            },



            "DC":{
                //44%
                fill: color45to36,

            }

        }
    }

    render() {
        return(
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={4} sx={{margin: 4, marginBottom: 45}}>
                <USAMap
                    customize = {this.statesCustomConfig()}
                    onClick = {this.mapHandler}
                    // onClick = {this.titleFunc}
                />
            
            </Stack>

        )
    }
}

export default HeatMap
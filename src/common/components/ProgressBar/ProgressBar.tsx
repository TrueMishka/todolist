import React from 'react';
import {LinearProgress} from "@mui/material";

export const ProgressBar = () => {
    return (
        <div style={{position: 'fixed', width: '100%', top: '60px'}}>
            <LinearProgress color={'inherit'}/>
        </div>
    );
};
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const lightgray = "#858585"

const card = (
  <React.Fragment>
    <CardContent style={{backgroundColor: "#26db02"}}>
      <Typography sx={{ fontSize: 14 }} color={lightgray} gutterBottom>
        Lizard
      </Typography>
      <Typography variant="h5" component="div" color={lightgray}>
        35 - 26%
      </Typography>
      {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Recycling Rates for CCPM
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography> */}
    </CardContent>
    {/* <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions> */}
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 150 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
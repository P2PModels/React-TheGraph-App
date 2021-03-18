import React from 'react'
import { Grid, IconButton, Button } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'

const Header = ({ onHelp, onCreate, onUpdate }) => (
  <Grid container direction="row" alignItems="center" spacing={5}>
    <div className="divHeader">
    <Button onClick={() => onCreate && onCreate()} className = "button">
      CREATE
    </Button>
    <Button onClick={() => onUpdate && onUpdate()} className = "button">
      UPDATE
    </Button>
    </div>
    <Grid item>
      <IconButton
        aria-label="Delete"
        color="secondary"
        onClick={() => onHelp && onHelp()}
      >
        <HelpIcon />
      </IconButton>
    </Grid>
  </Grid>
)

export default Header

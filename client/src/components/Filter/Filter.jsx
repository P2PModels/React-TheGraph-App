import React from 'react'
import {
  Grid,
  Select,
  FormControlLabel,
  MenuItem,
  createStyles,
  withStyles,
  TextField,
} from '@material-ui/core'

const filterStyles = theme =>
  createStyles({
    orderBySelect: {
      marginLeft: theme.spacing(1),
      color: 'white',
    },
    filterByRole: {
      marginLeft: theme.spacing(4.5),
      background: 'linear-gradient(45deg, #424a5a 30%, #626d83 90%)',
      borderRadius: 7,
    },
    floatingLabelFocusStyle: {
      color: 'white'
    },
    orderBy: {
      marginLeft: theme.spacing(3),
      background: 'linear-gradient(45deg, #424a5a 30%, #626d83 90%)',
      borderRadius: 7,
      padding: 8,
    }
  })

const Filter = ({
  classes,
  onToggleWithName,
  onFilterByRole,
  onOrderBy,
  onOrderDirection,
  withName,
  orderBy,
  orderDirection,
  roleFilter,
}) => (
 //<Grid item>
    <Grid container direction="row">
      {/*<FormControlLabel
        control={
          <Checkbox
            checked={withName}
            onChange={event => onToggleWithName && onToggleWithName()}
          />
        }
        label="With names"
      />*/}
      <div className="divFilter">
      <FormControlLabel
        control={
          <Select
            color="secondary"
            className={classes.orderBySelect}
            value={orderBy}
            onChange={event => onOrderBy && onOrderBy(event.target.value)}
          >
            <MenuItem value="id">ID</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="salary">Salary</MenuItem>
          </Select>
        }
        label="Order By:"
        labelPlacement="start"
        variant="filled"
        className= {classes.orderBy}
      />
      <FormControlLabel
        control={
          <Select
            color="secondary"
            className={classes.orderBySelect}
            value={orderDirection}
            onChange={event => onOrderDirection && onOrderDirection(event.target.value)}
          >
            <MenuItem value="asc">Ascendant</MenuItem>
            <MenuItem value="desc">Descendant</MenuItem>
          </Select>
        }
        label="Order Direction:"
        labelPlacement="start"
        variant="filled"
        className= {classes.orderBy}
      />
      <FormControlLabel
        control={
          <TextField
            className = {classes.filterByRole}
            name="roleFilter"
            variant="filled"
            size='small'
            color="secondary"
            InputLabelProps={{className: classes.floatingLabelFocusStyle,}}
            label="Filter by Role"
            value={roleFilter}
            onChange={event => onFilterByRole && onFilterByRole(event.target.value)}
          />
        }
      />
      </div>
    </Grid>
  //</Grid>
)

const StyledFilter = withStyles(filterStyles)(Filter)

export default StyledFilter

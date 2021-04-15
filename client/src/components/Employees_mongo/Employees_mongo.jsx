import React from 'react'
import {
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Typography,
  createStyles,
  withStyles,
  Divider,
} from '@material-ui/core'

const employeeStyles = theme =>
  createStyles({
    actionArea: {
      maxWidth: 300,
      width: 300,
    },
    id: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    direction: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  })

const Employee_mongo = ({ classes, id, direction}) => (
  <Grid item>
    <Card>
      <CardActionArea className={classes.actionArea}>

        <CardContent>
          <div className='divCardID'>
            <Typography color="textSecondary">ID</Typography>
            <Typography component="p" className={classes.id}>
              : {id}</Typography>
          </div>
          <Divider />
          <div className='divCard'>
            <Typography variant="h6" component="h3" className={classes.direction}>
              {direction || '—'}
            </Typography>
            
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
)

const StyledEmployee = withStyles(employeeStyles)(Employee_mongo)

const employeesStyles = theme =>
  createStyles({
    title: {
      marginTop: theme.spacing(5),
      marginRight: theme.spacing(16),
      float: 'right',
    },
    prueba: {
      marginLeft: theme.spacing(16),
    },
  })

const Employees_mongo = ({ classes, employees_mongo, onUpdate, onDelete }) => (
  <Grid container direction="column" spacing={1}>
    <Grid item>
      <Typography variant="h6" className={classes.title}>
        {employees_mongo.length} Employees
      </Typography>
    </Grid>
    <Grid item className={classes.prueba}>
      <Grid container direction="row" spacing={8}>
        {employees_mongo.map(employee_mongo => (
          <StyledEmployee key={employee_mongo.id} {...employee_mongo}/>
        ))}
      </Grid>
    </Grid>
  </Grid>
)

export default withStyles(employeesStyles)(Employees_mongo)

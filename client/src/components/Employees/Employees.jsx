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
  IconButton,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const employeeStyles = theme =>
  createStyles({
    actionArea: {
      maxWidth: 300,
      width: 300,
    },
    name: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    id: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    role: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    salary: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    age: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      alignSelf: 'center',
    },
  })

const Employee = ({ classes, id, name, role, salary, age, onUpdate, onDelete }) => (
  <Grid item>
    <Card>
      <CardActionArea className={classes.actionArea}>

        <CardContent>
          <div className='divCardID'>
            <Typography color="textSecondary">ID</Typography>
            <Typography component="p" className={classes.id}>
              : {id}</Typography>
            <div className='icons'>
              <IconButton
                aria-label="Delete"
                fontSize="small"
                onClick={() => onUpdate && onUpdate(id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="Delete"
                fontSize="small"
                onClick={() => onDelete && onDelete(id)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
          <Divider />
          <div className='divCard'>
            <Typography variant="h6" component="h3" className={classes.name}>
              {name || '—'}
            </Typography>
            {/*<Typography color="textSecondary">Age</Typography>*/}
            <Typography component="p" className={classes.age}>
              , {age}
            </Typography>
          </div>
          <div className='divCardSpace'>
            <div className='divCardCol'>
              <Typography color="textSecondary">Role</Typography>
              <Typography component="p" className={classes.role}>
                {role}
              </Typography>
            </div>
            <div className='divCardCol'>
              <Typography color="textSecondary">Salary</Typography>
              <Typography component="p" className={classes.salary}>
                {salary}
              </Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
)

const StyledEmployee = withStyles(employeeStyles)(Employee)

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

const Employees = ({ classes, employees, onUpdate, onDelete }) => (
  <Grid container direction="column" spacing={1}>
    <Grid item>
      <Typography variant="h6" className={classes.title}>
        {employees.length} Employees
      </Typography>
    </Grid>
    <Grid item className={classes.prueba}>
      <Grid container direction="row" spacing={8}>
        {employees.map(employee => (
          <StyledEmployee key={employee.id} {...employee}
            onUpdate={() => onUpdate && onUpdate(employee.id)}
            onDelete={() => onDelete && onDelete(employee.id)} />
        ))}
      </Grid>
    </Grid>
  </Grid>
)

export default withStyles(employeesStyles)(Employees)

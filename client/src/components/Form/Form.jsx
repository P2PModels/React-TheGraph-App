import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createStyles,withStyles} from '@material-ui/core'

const filterStyles = theme =>
  createStyles({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

const CreateForm = ({
    classes,
    name, 
    age,
    role,
    salary,
    submit,
    onName,
    onAge,
    onRole,
    onSalary
}) => (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAdd />
          </Avatar>
          <Typography component="h1" variant="h5">
            New Employee
          </Typography>
          <form className={classes.form} onSubmit={e =>submit && submit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  color="primary"
                  onChange={event => onName && onName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  type="number"
                  value={age}
                  color="primary"
                  onChange={event => onAge && onAge(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="role"
                  label="Role"
                  name="role"
                  value={role}
                  color="primary"
                  onChange={event => onRole && onRole(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="salary"
                  label="Salary"
                  type="number"
                  id="salary"
                  value={salary}
                  color="primary"
                  onChange={event => onSalary && onSalary(event.target.value)}
                />
              </Grid>
             {/*<Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>*/}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
            {/*<Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
          </Grid>*/}
          </form>
        </div>
        
      </Container>
);

const StyledForm = withStyles(filterStyles)(CreateForm)

export default StyledForm
  
  

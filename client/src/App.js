import React, { Component } from "react";
import SimpleStorageContract from "./contracts/EmployeeContract.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import ApolloClient, { InMemoryCache } from 'apollo-boost'

import { ApolloProvider, Query } from 'react-apollo'
import { gql, useMutation } from '@apollo/client';

import {
  Grid, LinearProgress, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Button, AppBar, Toolbar, Box, Typography, Tabs, Tab, IconButton
} from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import Header from './components/Header'
import Error from './components/Error'
import Employees from './components/Employees'
import Employees_mongo from './components/Employees_mongo'
import Filter from './components/Filter'
import CreateForm from './components/Form'
import CreateFormUpdate from './components/FormUpdate'

import PropTypes from 'prop-types';

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error('REACT_APP_GRAPHQL_ENDPOINT environment variable not defined')
}



const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache()

})
const client_mongo = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache()

})

const EMPLOYEES_QUERY = gql`
  query employees($where: Employee_filter!, $orderBy: Employee_orderBy!, $orderDirection: String!) {
    
    employees(first: 100, where: $where, orderBy: $orderBy, orderDirection: $orderDirection){
      id
      name
      age
      role
      salary
    }
  
  }
`
const EMPLOYEES_QUERY_MONGO = gql`
query employees_mongo{
  
  employees_mongo{
    _id
    idBlockchain
    direction
  }

}
`

const ADD_DIRECTION = gql`
  mutation createEmployee_mongo ($input: EmployeeInput ) {
    createEmployee_mongo(input: $input) {
      _id
      idBlockchain 
      direction
    }
  }

`;

const DELETE_DIRECTION = gql`
  mutation deleteEmployee_mongo ($_id: ID ) {
    deleteEmployee_mongo(_id: $_id) {
      _id
      idBlockchain 
      direction
    }
  }
`;

const UPDATE_DIRECTION = gql`
  mutation updateEmployee_mongo ($_id: ID, $input: EmployeeInput ) {
    updateEmployee_mongo(_id: $_id, input: $input) {
      _id
      idBlockchain 
      direction
    }
  }

`;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function CreateEmployee_mongojeje() {
  let input1;
  let input2;
  const [createEmployee_mongo] = useMutation(ADD_DIRECTION, { client: client_mongo });
  return (
    <div className="divFM">

      <form
        onSubmit={e => {
          e.preventDefault();
          createEmployee_mongo({
            variables: { input: { idBlockchain: parseInt(input2.value), direction: input1.value } },
            errorPolicy: "all"
          });
          input1.value = '';
          input2.value = null;
        }}
      >
        <input
          type="number"
          ref={node1 => {
            input2 = node1;
          }}
          placeholder="ID"
          className="inputs"
        />
        <input
          ref={node => {
            input1 = node;
          }}
          placeholder="Direction"
        />
        <button type="submit" className="buttonF">Add direction</button>
      </form>
    </div>
  )
}
function Delete_mongo() {
  let input;
  const [deleteEmployee_mongo] = useMutation(DELETE_DIRECTION, { client: client_mongo });
  return (
    <div>

      <form
        onSubmit={e => {
          e.preventDefault();
          deleteEmployee_mongo({
            variables: { _id: input.value },
            errorPolicy: "all"
          });
          input.value = '';
        }}
      >
        <input

          ref={node1 => {
            input = node1;
          }}
          placeholder="ID"
        />

        <button type="submit" className="buttonF">delete direction</button>
      </form>
    </div>
  )
}
function Update_mongo() {
  let input1;
  let input2;
  let input3;
  const [updateEmployee_mongo] = useMutation(UPDATE_DIRECTION, { client: client_mongo });
  return (
    <div>

      <form
        onSubmit={e => {
          e.preventDefault();
          updateEmployee_mongo({
            variables: { _id: input3.value, input: { idBlockchain: parseInt(input2.value), direction: input1.value } },
            errorPolicy: "all"
          });
          input1.value = '';
          input2.value = null;
          input3.value = '';
        }}
      >
        <input
          ref={node2 => {
            input3 = node2;
          }}
          placeholder="ID"
        />
        <input
          type="number"
          ref={node1 => {
            input2 = node1;
          }}
          placeholder="ID Blockain"
        />
        <input
          ref={node => {
            input1 = node;
          }}
          placeholder="Direction"
        />
        <button type="submit" className="buttonF">Update direction</button>
      </form>
    </div>
  )
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      withName: false,
      orderBy: 'name',
      orderDirection: 'asc',
      showHelpDialog: false,
      showHelpDialogMongo: false,
      showCreateMongo: false,
      showUpdateMongo: false,
      showDeleteMongo: false,
      showCreateForm: false,
      showCreateUpdate: false,
      web3: null,
      accounts: null,
      contract: null,
      name: null,
      age: null,
      role: null,
      salary: null,
      roleFilter: null,
      value: 0
    }
  }

  /*handleInputChange = (event) => {
    const target = event.target;
    var value = target.value;
    const name = target.name;

    console.log(name);
    console.log(value);
    this.setState({
      [name]: value
    });
  }*/

  toggleHelpDialog = () => {
    this.setState(state => ({ ...state, showHelpDialog: !state.showHelpDialog }))
  }
  toggleHelpDialogMongo = () => {
    this.setState(state => ({ ...state, showHelpDialogMongo: !state.showHelpDialogMongo }))
  }
  toggleCreateMongo = () => {
    this.setState(state => ({ ...state, showCreateMongo: !state.showCreateMongo }))
  }
  toggleUpdateMongo = () => {
    this.setState(state => ({ ...state, showUpdateMongo: !state.showUpdateMongo }))
  }
  toggleDeleteMongo = () => {
    this.setState(state => ({ ...state, showDeleteMongo: !state.showDeleteMongo }))
  }
  toggleCreateForm = () => {
    this.setState(state => ({ ...state, showCreateForm: !state.showCreateForm }))
  }
  toggleCreateUpdate = () => {
    this.setState(state => ({ ...state, showCreateUpdate: !state.showCreateUpdate }))
  }
  gotoQuickStartGuide = () => {
    window.location.href = 'https://github.com/P2PModels/React-TheGraph-App'
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };


  create = async () => {
    const { accounts, contract, name, age, role, salary } = this.state;
    await contract.methods.createEmployee(name, age, role, salary).send({ from: accounts[0] });
  };

  getEmployee = async (id) => {
    const { contract } = this.state;
    const e = await contract.methods.getEmployee(id).call();
    sessionStorage.setItem("idUpdate", id);
    sessionStorage.setItem("nameUpdate", e[0]);
    sessionStorage.setItem("ageUpdate", Number(e[1]));
    sessionStorage.setItem("roleUpdate", e[2]);
    sessionStorage.setItem("salaryUpdate", Number(e[3]));
    this.toggleCreateUpdate()
  }
  delete = async (id) => {
    const { accounts, contract } = this.state;
    await contract.methods.deleteEmployee(id).send({ from: accounts[0] });
  }
  update = async () => {
    const { accounts, contract, name, age, role, salary } = this.state;
    var name1, age1, role1, salary1
    if (name == null) name1 = sessionStorage.getItem("nameUpdate");
    else name1 = name;
    if (age == null) age1 = sessionStorage.getItem("ageUpdate");
    else age1 = age;
    if (role == null) role1 = sessionStorage.getItem("roleUpdate");
    else role1 = role;
    if (salary == null) salary1 = sessionStorage.getItem("salaryUpdate");
    else salary1 = salary
    await contract.methods.updateEmployeeName(sessionStorage.getItem("idUpdate"), name1, age1, role1, salary1).send({ from: accounts[0] });
  };

  handleChange = (event, newValue) => {
    this.setState(state => ({ ...state, value: newValue }))

  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    const { withName, orderBy, orderDirection, showCreateMongo, showUpdateMongo, showDeleteMongo, showHelpDialog, showHelpDialogMongo, showCreateForm, showCreateUpdate, name, age, role, salary, roleFilter, value } = this.state


    return (

      <ApolloProvider client={client}>
        <div className="App">
          <Grid container direction="column">

            <Grid item>
              <Grid container>
                <AppBar position="static">
                  <Tabs value={value} onChange={this.handleChange} aria-label="simple tabs example">
                    <Tab label="Blockchain" {...a11yProps(0)} />
                    <Tab label="MongoDB"  {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  <AppBar position="static" style={{ background: '#292e39' }}>
                    <Toolbar>
                      <Filter className="filter"
                        orderBy={orderBy}
                        orderDirection={orderDirection}
                        withName={withName}
                        onOrderBy={field => this.setState(state => ({ ...state, orderBy: field }))}
                        onOrderDirection={field => this.setState(state => ({ ...state, orderDirection: field }))}
                        onToggleWithName={() =>
                          this.setState(state => ({ ...state, withName: !state.withName }))
                        }
                        onFilterByRole={field => this.setState(state => ({ ...state, roleFilter: field }))}
                      />
                      <Header
                        onHelp={this.toggleHelpDialog}
                        onCreate={this.toggleCreateForm}
                      //TODO cambiar el update a las card
                      />
                    </Toolbar>
                  </AppBar>
                  <Query
                    query={EMPLOYEES_QUERY}
                    client={client}
                    variables={{
                      where: {
                        ...(withName ? { name_not: '' } : {}),
                        ...(roleFilter ? { role: roleFilter } : {})
                      },
                      orderBy: orderBy,
                      orderDirection: orderDirection,
                    }}
                  >
                    {({ data, error, loading }) => {
                      return loading ? (
                        <LinearProgress variant="query" style={{ width: '100%' }} />
                      ) : error ? (
                        <Error error={error} />
                      ) : (
                        <Employees employees={data.employees}
                          onUpdate={id => this.getEmployee(id)}
                          onDelete={id => this.delete(id)} />
                      )
                    }}
                  </Query>

                </TabPanel>
                <TabPanel value={value} index={1}>
                  <AppBar position="static" style={{ background: '#292e39' }}>
                    <Toolbar>
                      <Grid container direction="row" alignItems="center" spacing={5}>
                        <div className="divMongo">
                          <Button onClick={this.toggleCreateMongo} className="buttonM">
                            CREATE
                      </Button>
                          <Button onClick={this.toggleUpdateMongo} className="buttonM">
                            UPDATE
                      </Button>
                          <Button onClick={this.toggleDeleteMongo} className="buttonM">
                            DELETE
                      </Button>
                        </div>
                        <IconButton
                          aria-label="Delete"
                          color="secondary"
                          onClick={this.toggleHelpDialogMongo}
                        >
                          <HelpIcon />
                        </IconButton>
                      </Grid>
                    </Toolbar>
                  </AppBar>
                  <Query
                    query={EMPLOYEES_QUERY_MONGO}
                    client={client_mongo}
                    variables={{
                      where: {
                        ...(withName ? { name_not: '' } : {}),
                        ...(roleFilter ? { role: roleFilter } : {})
                      },
                      orderBy: orderBy,
                      orderDirection: orderDirection,
                    }}
                  >
                    {({ data, error, loading }) => {
                      return loading ? (
                        <LinearProgress variant="query" style={{ width: '100%' }} />
                      ) : error ? (
                        <Error error={error} />
                      ) : (
                        <Employees_mongo employees_mongo={data.employees_mongo} />
                      )
                    }}
                  </Query>


                </TabPanel>




              </Grid>
            </Grid>
          </Grid>
          <Dialog
            fullScreen={false}
            open={showCreateMongo}
            onClose={this.toggleCreateMongo}
            aria-labelledby="help-dialog"
          >
            <DialogTitle id="help-dialog">{'Create a new employee direction'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <CreateEmployee_mongojeje></CreateEmployee_mongojeje>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.toggleCreateMongo} color="primary">
                Continue
              </Button>

            </DialogActions>
          </Dialog>
          <Dialog
            fullScreen={false}
            open={showUpdateMongo}
            onClose={this.toggleUpdateMongo}
            aria-labelledby="help-dialog"
          >
            <DialogTitle id="help-dialog">{'Update an employee direction'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Update_mongo></Update_mongo>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.toggleUpdateMongo} color="primary">
                Continue
              </Button>

            </DialogActions>
          </Dialog>
          <Dialog
            fullScreen={false}
            open={showDeleteMongo}
            onClose={this.toggleDeleteMongo}
            aria-labelledby="help-dialog"
          >
            <DialogTitle id="help-dialog">{'Delete an employee direction'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Delete_mongo></Delete_mongo>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.toggleDeleteMongo} color="primary">
                Continue
              </Button>

            </DialogActions>
          </Dialog>
          <Dialog
            fullScreen={false}
            open={showHelpDialog}
            onClose={this.toggleHelpDialog}
            aria-labelledby="help-dialog"
          >
            <DialogTitle id="help-dialog">{'Do you need help?'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Here you will be able to create, update and display employees.
                Also, you can filter by role, order by ID, name or salary, and choose
                the order direction: ascendant or descendant. If you need more resources, visit our repository on Github.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.toggleHelpDialog} color="primary">
                Nah, I'm good
              </Button>
              <Button onClick={this.gotoQuickStartGuide} color="primary" autoFocus>
                Yes, please
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            fullScreen={false}
            open={showHelpDialogMongo}
            onClose={this.toggleHelpDialogMongo}
            aria-labelledby="help-dialog"
          >
            <DialogTitle id="help-dialog">{'Do you need help?'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Here you will be able to create, update and display employees from a private Mongo database.
                If you need more resources, visit our repository on Github.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.toggleHelpDialogMongo} color="primary">
                Nah, I'm good
              </Button>
              <Button onClick={this.gotoQuickStartGuide} color="primary" autoFocus>
                Yes, please
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            fullScreen={false}
            open={showCreateForm}
            onClose={this.toggleCreateForm}
            aria-labelledby="help-dialog"
          >
            <CreateForm
              name={name}
              age={age}
              role={role}
              salary={salary}
              submit={e => { e.preventDefault(); this.create(); this.toggleCreateForm() }}
              onName={name1 => this.setState(state => ({ ...state, name: name1 }))}
              onAge={age1 => this.setState(state => ({ ...state, age: age1 }))}
              onRole={role1 => this.setState(state => ({ ...state, role: role1 }))}
              onSalary={salary1 => this.setState(state => ({ ...state, salary: salary1 }))}
            /> {name}{age}{role}{salary}
          </Dialog>
          <Dialog
            fullScreen={false}
            open={showCreateUpdate}
            onClose={this.toggleCreateUpdate}
            aria-labelledby="help-dialog"
          >
            <CreateFormUpdate
              submit={e => { e.preventDefault(); this.update(); this.toggleCreateUpdate() }}
              onName={name1 => this.setState(state => ({ ...state, name: name1 }))}
              onAge={age1 => this.setState(state => ({ ...state, age: age1 }))}
              onRole={role1 => this.setState(state => ({ ...state, role: role1 }))}
              onSalary={salary1 => this.setState(state => ({ ...state, salary: salary1 }))}
            />
          </Dialog>
        </div>
      </ApolloProvider >
    );
  }
}

export default App;

import React from "react";
import { DataTable, Button } from 'carbon-components-react';
import 'carbon-components/scss/globals/scss/styles.scss';
import axios from "axios";

const {
  TableContainer,  Table,  TableHead,  TableHeader,  TableRow,
  TableBody,  TableCell,TableSelectRow,  TableToolbar, TableToolbarSearch,
  TableToolbarContent, TableToolbarAction, TableData,TableSelectAll,
  TableBatchActions, TableBatchAction
} = DataTable;

const headers = [
  {
    key: 'h1',
    header: 'Username',
    },
  {
    key: 'h2',
    header: 'First Name',
  },
  {
    key: 'h3',
    header: 'Last Name',
  },
  {
    key: 'h4',
    header: 'Superuser',
  },
  {
    key: 'h5',
    header: 'Staff',
  },
  {
    key: 'h6',
    header: 'Active',
  },
];


function makeMyRows(contacts){
  let contactsBindings = [];
  /*console.log(contacts);*/
  for(let i=0; i<contacts.length; i++){
    let obj = {
      id : contacts[i].id,
      h1: contacts[i].username,
      h2: contacts[i].first_name,
      h3: contacts[i].last_name,
      h4: contacts[i].is_superuser.toString(),
      h5: contacts[i].is_staff.toString(),
      h6: contacts[i].is_active.toString()
    }
    contactsBindings.push(obj);
  }
  return contactsBindings;
}



function CarbonTable(props) {
  let contactLength = props.contacts && props.contacts.length;
    return (
      <div>

  {contactLength> 0 ?
    <DataTable
    rows={makeMyRows(props.contacts)}
    headers={headers}
    render={({ rows, headers, getHeaderProps, getSelectionProps ,onInputChange,
      getBatchActionProps,batchActionClick,selectedRows }) => (
      <TableContainer title="Build Link Users Table">
        <TableToolbar>
          {/* pass in `onInputChange` change here to make filtering work */}

          <TableBatchActions {...getBatchActionProps()}>
            {/* inside of you batch actinos, you can include selectedRows */}
            <TableBatchAction kind="danger" onClick={()=>{
              axios.delete('http://127.0.0.1:8000/users/' + '15')
              .then((response)=>{
                props.updateMyContacts(response.data);
              })
              /*console.log(selectedRows);
              debugger;*/

              /*batchActionClick(selectedRows)}*/
            }}>
              Delete
            </TableBatchAction>
          </TableBatchActions>


          <TableToolbarSearch onChange={onInputChange} />
          <TableToolbarContent>
            <TableToolbarAction
              iconName="download"
              iconDescription="Download"
              /*onClick={action('TableToolbarAction - Download')}*/
            />
            <TableToolbarAction
              iconName="edit"
              iconDescription="Edit"
              /*onClick={action('TableToolbarAction - Edit')}*/
            />
            <TableToolbarAction
              iconName="settings"
              iconDescription="Settings"
              /*onClick={action('TableToolbarAction - Settings')}*/
            />
            <Button onClick={()=>{
              axios
                .post('http://127.0.0.1:8000/users/',{
                id: '9',
                username:'Muskein6',
                first_name:'Muskein',
                last_name:'Singh',
                password:'bangalore'
              }).then((response)=>{
                props.updateMyContacts(response.data);
              })
            }} small kind="primary">
              Add new
            </Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table>
          <TableHead>
            <TableRow>
            <TableSelectAll {...getSelectionProps()} />
              {headers.map(header => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
              <TableSelectRow {...getSelectionProps({ row })} />
                {row.cells.map(cell => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  />
  : null
  }



      </div>
    );
}

export default CarbonTable;

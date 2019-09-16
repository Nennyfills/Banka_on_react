/* eslint-disable valid-jsdoc */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';


/**
 * @description Transaction component
 *
 * @Params {Props} Props - property
 *
 * @return {node} return - return html
 */
const AppTable = (props) => {
  const {
    tableHeaders,
    tableBody,
    name,
    deleteUser,
    activateAndDeactivateUser,
    performAction,
    deleteAccount
  } = props;
  const tableHeaderKeys = Object.values(tableHeaders); // to map my headers
  const tableBodyKeys = Object.keys(tableHeaders); // to map the body arrays
  const isStaff = sessionStorage.getItem('isStaff');

  return (
    <Table {...props} className="mt-2 mb-5 tables">
      <thead>
        <tr>
          {name && (
            <th>
              <span className="pr-3">ID</span>
            </th>
          )}
          {tableHeaderKeys.map((tableHeader, index) => (
            <th key={index}>{tableHeader}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableBody.map(eachTableBody => (
          <tr key={eachTableBody.id}>
            <td>
              <span className="pl-3">{eachTableBody.id}</span>
            </td>
            {tableBodyKeys.map((tableBodyKey, index) => (
              <td key={index}>{eachTableBody[tableBodyKey]}</td>
            ))}
            {isStaff ? ' '
              : (
                <React.Fragment>
                  <td className="tAllButton">
                    {activateAndDeactivateUser ? (
                      <span className="float-right p-0">
                        <Button
                          style={{ width: '4.9rem' }}
                          onClick={() => performAction(eachTableBody.accountnumber)}
                          color="secondary"
                          outline
                        >
                          {eachTableBody.status === 'active' ? 'Active' : 'Dormant'}
                        </Button>
                      </span>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="tAllButton">
                    {deleteUser ? (
                      <span className="float-right p-0">
                        <Button
                          className="mr-2"
                          color=""
                          outline
                          onClick={() => deleteAccount(eachTableBody.accountnumber)}
                        >
                          <i className="fas fa-trash-alt" />
                        </Button>
                      </span>
                    ) : (
                      ''
                    )}
                  </td>
                </React.Fragment>
              )
        }
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

AppTable.propTypes = {
  tableHeaders: PropTypes.array,
  tableBody: PropTypes.array,
  name: PropTypes.string,
  deleteUser: PropTypes.bool,
  activateAndDeactivateUser: PropTypes.bool,
  deleteAccount: PropTypes.func,
  performAction: PropTypes.func,
  isLoading: PropTypes.bool,
};

AppTable.defaultProps = {
  tableHeaders: [],
  tableBody: [],
  deleteAccount: () => 'delete',
  performAction: () => 'action',
  name: '',
  deleteUser: false,
  activateAndDeactivateUser: false,
  isLoading: false
};
export default AppTable;

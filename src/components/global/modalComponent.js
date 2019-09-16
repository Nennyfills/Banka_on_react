/* eslint-disable react/prop-types */
import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import AppSpinner from './spinner';

export default (props) => {
  const {
    isOpen,
    toggle,
    isLoading,
    isActive,
    deleteAccount,
    handleAction,
    check,
  } = props;
  const label = isActive ? 'Activate' : 'Deactivate';
  return (
    <div>
      <Modal {...props} isOpen={isOpen} toggle={toggle}>
        {check === 'delete' ? (
          <React.Fragment>
            <ModalHeader toggle={toggle}>Delete</ModalHeader>
            <ModalBody>Do you want to delete this account forever</ModalBody>
            <ModalFooter>
              <Button disabled={isLoading} color="dark" onClick={deleteAccount}>
                {isLoading && <AppSpinner />}
                {!isLoading ? 'Yes' : ''}
              </Button>
              <Button disabled={isLoading} color="secondary" onClick={toggle}>
                No
              </Button>
            </ModalFooter>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ModalHeader toggle={toggle}>{label}</ModalHeader>
            <ModalBody>
              Do you really want
              {' '}
              {label}
              {' '}
              this account.
            </ModalBody>
            <ModalFooter>
              <Button disabled={isLoading} color="dark" onClick={handleAction}>
                {isLoading && <AppSpinner />}
                {!isLoading ? 'Yes' : ''}
              </Button>
              <Button disabled={isLoading} color="secondary" onClick={toggle}>
                No
              </Button>
            </ModalFooter>
          </React.Fragment>
        )}
      </Modal>
    </div>
  );
};

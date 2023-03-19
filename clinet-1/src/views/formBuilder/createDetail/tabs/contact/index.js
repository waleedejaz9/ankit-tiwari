// ** React Imports
import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

// ** Third Party Components
import { ImAddressBook } from 'react-icons/im';
import { FiUser, FiUsers } from 'react-icons/fi';
import DataTable from 'react-data-table-component';
import { Edit, Menu, MoreVertical } from 'react-feather';

// ** Styles
import '@styles/react/apps/app-email.scss';

const Contact = ({ dispatch, store }) => {

  // ** FUNCTIONS
  const handleEdit = (row) => {};
  const handleRemove = (row) => {};

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.fullName
    },
    {
      name: 'Type',
      selector: (row) => row.type,
      sortable: true
    },
    // {
    //   name: 'Smartlist',
    //   selector: (row) => row.smartList
    // },

    // {
    //   name: 'Subcategory',
    //   selector: (row) => row.subCategory
    // },
    {
      name: 'Email',
      selector: (row) => row.email
    },
    {
      name: 'Phone',
      selector: (row) => row.phone
    },
    {
      name: 'Entry Date',
      selector: (row) => row.createdAt
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag="span" className="w-100" onClick={() => handleEdit(row)}>
                <Edit size={14} className="me-50" />
                <span className="align-middle">Edit</span>
              </DropdownItem>
              <DropdownItem tag="span" className="w-100" onClick={() => handleRemove(row)}>
                <Edit size={14} className="me-50" />
                <span className="align-middle">Remove</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];
  return (
    <>
      {store && (
        <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
          <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
            <div className="tasks-border">
              <div className="tasks-area" style={{ maxWidth: '100%', width: '100%' }}>
              {store?.contactList?.data?.list ?
              (  <div className="">
              <div className="px-1 pt-1">
                <Row>
                  <Col md="4">
                    <Card>
                      <CardBody>
                        <div className="d-flex justify-content-between">
                          <span>Total Contacts</span>
                          <span>
                            <ImAddressBook size={30} />
                          </span>
                        </div>
                        <div className="d-flex justify-content-between">
                          {store?.contactList?.data?.list?.length || 0}
                          <div className="d-flex justify-content-center"></div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card>
                      <CardBody>
                        <div className="d-flex justify-content-between">
                          <span>Last Month Contacts</span>
                          <span>
                            <FiUsers size={30} />
                          </span>
                        </div>
                        <div className="d-flex justify-content-between">
                          21
                          <div className="d-flex justify-content-center"></div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card>
                      <CardBody>
                        <div className="d-flex justify-content-between">
                          <span>Last Week Contacts</span>
                          <span>
                            <FiUser size={30} />
                          </span>
                        </div>
                        <div className="d-flex justify-content-between">
                          21
                          <div className="d-flex justify-content-center"></div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
              
              <DataTable
              noHeader
              responsive
              columns={columns}
              data={store.contactList.data.list}
              className="react-dataTable"
            />
              
            </div>):(
              <div className='text-center'>
                No contact available for this funnel
              </div>
            )
              }
              
              </div>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Contact;

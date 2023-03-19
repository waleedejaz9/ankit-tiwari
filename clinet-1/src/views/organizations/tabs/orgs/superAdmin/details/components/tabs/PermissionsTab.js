import React, { Fragment } from 'react'
import DataTable from 'react-data-table-component';
import { Button, Col, Input, Row } from 'reactstrap';

const data = [
    {
      module: 'contacts',
      read: true,
      write: false,
      create: false,
      delete: false
    },
    {
      module: 'tasks & goals',
      read: false,
      write: true,
      create: false,
      delete: false
    },
    {
      module: 'calendar',
      read: true,
      write: false,
      create: true,
      delete: false
    },
    {
      module: 'document',
      read: true,
      write: false,
      create: true,
      delete: false
    },
    {
      module: 'marketing',
      read: false,
      write: false,
      create: false,
      delete: true
    },
    {
      module: 'my social',
      read: false,
      write: false,
      create: false,
      delete: true
    },
    {
      module: 'my business',
      read: false,
      write: false,
      create: false,
      delete: true
    },
    {
      module: 'statistics',
      read: false,
      write: false,
      create: false,
      delete: true
    },
    {
      module: 'shop',
      read: false,
      write: false,
      create: false,
      delete: true
    },
    {
      module: 'finance',
      read: false,
      write: false,
      create: false,
      delete: true
    },
    {
      module: 'file manager',
      read: false,
      write: false,
      create: false,
      delete: true
    },
    {
      module: 'mycma',
      read: false,
      write: false,
      create: false,
      delete: true
    },
    {
      module: 'settings',
      read: false,
      write: false,
      create: false,
      delete: true
    }
  ];
export default function PermissionsTab() {
    const columns = [
        {
          name: 'MODULE',
          selector: (row) => row.module,
          width:'30%',
          cell:(row)=> <span>{row.module}</span>
        },
        {
          name: 'READ',
          selector: (row) => row.read,
          width:'20%',
          cell: (row) => <Input type="checkbox" checked={row.read} />
        },
        {
          name: 'WRITE',
          selector: (row) => row.write,
          width:'20%',
          cell: (row) => <Input type="checkbox" checked={row.write} />
        },
        {
          name: 'CREATE',
          selector: (row) => row.create,
          width:'20%',
          cell: (row) => <Input type="checkbox" checked={row.create} />
        },
        {
          name: 'DELETE',
          selector: (row) => row.delete,
          width:'20%',
          cell: (row) => <Input type="checkbox" checked={row.delete} />
        }
      ];
  return (
    <Fragment>
        <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
          <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
            <div className="task-application">
            <div className='list-group task-task-list-wrapper'>
            <DataTable
            striped
                    noHeader
                    responsive
                    className="react-dataTable"
                    columns={columns}
                    data={data}
                  />
            </div>
            </div>
          </Col>
        </Row>
        <div className="d-flex justofy-conten-end">
          <Button color="primary mt-50">Submit</Button>
        </div>
    </Fragment>
  )
}

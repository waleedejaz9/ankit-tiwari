// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ** Reactstrap Imports
import { Row, Col, Badge } from 'reactstrap';

//** third party imports */

import { ChevronDown } from 'react-feather';
import moment from 'moment';
// ** Custom Components
import Avatar from '@components/avatar';
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';

// ** Events Actions  Import
import BookAttendanceAction from './BookAttendanceAction';
// import { getAttendance } from './store';

const stateNum = Math.floor(Math.random() * 6),
  states = [
    'light-success',
    'light-danger',
    'light-warning',
    'light-info',
    'light-primary',
    'light-secondary'
  ],
  color = states[stateNum];

const statusObj = {
  pending: 'light-warning',
  Attended: 'light-success',
  DidNotAttended: 'light-secondary'
}

const columns = [
  {
    name: 'Full Name',
    sortable: true,
    width: "200px",
    selector: (row) =>
      <>
        {row?.photo !== '' ? (
          <Avatar className="me-1" img={row?.photo} width="32" height="32" initials />
        ) : (
          <Avatar
            color={color || 'primary'}
            className="me-1"
          />
        )}
        < span > {`${row?.fullName}` || 'N A'}</span >
      </>
  },
  {
    name: 'Progression',
    sortable: true,
    width: "150px",
    selector: (row) => row.progression
  },
  {
    name: "Rank",
    sortable: true,
    selector: (row) => row.rankName,
    cell: (row) => (
      <div>
        <Avatar
          style={{
            width: "1.8em",
            height: "1.8em",
            margin: "0px",
            objectFit: "contain !importent",
          }}
          src={row?.rankImg}
          alt={`${row?.rankName}`}
        />
      </div>
    )
  },
  {
    name: 'Status',
    sortable: true,
    width: "150px",
    selector: (row) => row.status,
    cell: (row) => (
      <Badge
        className="text-capitalize"
        color={statusObj[row.status]}
        pill
      >
        {row.status === 'Attended' ? 'Attended' : 'Did not Attended'}
      </Badge>
    )
  },
  {
    name: 'Actions',
    allowOverflow: false,
    width: "120px",
    cell: (row) => <BookAttendanceAction classRow={row} />
    // selector: (row) => row.action
  }
];

const BookList = (props) => {
  const { classId } = props;
  // ** Store vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.attendance);
  // const bookAttendance = store?.bookAttendees;

  const bookAttendees = [
    {
      "_id": "63e913f0408e22497b0fd128",
      "userId": "63da321c647a1d1c5e9d016a",
      "fullName": "testClient",
      "photo": "",
      "progression": "10",
      "status": "Attended",
      "action": "none",
      "rankImg": "",
      "rankName": "",
      // "ranks": [],
      "__v": 0
    },
    {
      "_id": "63e917ecdb3ec39e23c92f07",
      "userId": "63da321c647a1d1c5e9d016a",
      "fullName": "01-Client",
      "photo": "",
      "progression": "20",
      "status": "DidNotAttended",
      "action": "reschedule",
      "rankImg": "",
      "rankName": "",
      // "ranks": [],
      "__v": 0
    },
    {
      "_id": "63e9188ddb3ec39e23c92f21",
      "userId": "63da321c647a1d1c5e9d016a",
      "fullName": "test testClient",
      "photo": "",
      "progression": "",
      "status": "Attended",
      "action": "none",
      "rankImg": "",
      "rankName": "",
      // "ranks": [],
      "__v": 0
    }
  ]
  // ** States
  const [currentPage, setCurrentPage] = useState(0);

  // useEffect(() => {
  //   if (classId !== undefined && classId !== '') {
  //     dispatch(getAttendance(classId));
  //   }
  // }, [classId]);

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(bookAttendees.length / 10) || 1}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );

  return (
    <Fragment>
      <div className="react-dataTable mt-2 border rounded-2">
        <DataTable
          noHeader
          pagination
          columns={columns}
          paginationPerPage={10}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={bookAttendees}
        />
      </div>
    </Fragment>
  );
};
export default BookList;

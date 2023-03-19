// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Components
import AddCourseModal from './add/AddCourseModal';

// ** Third Party Components
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import { FileText, Trash2, Edit } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Reactstrap Imports
import { Row, Col, Card, Input, Button, CardBody } from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { courseFetchAction, courseDeleteAction } from '../store/actions';
import Details from '../detail';
const Courses = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({ show: false, details: {} })
  const store = useSelector((state) => state.course);
  const tableData = store?.courseList;
  const [centeredModal, setCenteredModal] = useState(false);

  const [currentCategory, setCurrentCategory] = useState({
    value: '',
    label: 'Filter By Category'
  });
  const [currentPrice, setCurrentPrice] = useState({
    value: '',
    label: 'Filter By Price',
    number: 0
  });

  const categoryOptions = [
    { value: '', label: 'Filter By Category' },
    { value: 'category1', label: 'Category 1' },
    { value: 'category2', label: 'Category 2' }
  ];

  const priceOptions = [
    { value: '', label: 'Filter By Price', number: 0 },
    { value: 'h2l', label: 'High to Low', number: 1 },
    { value: 'l2h', label: 'Low to Hign', number: 2 }
  ];

  // const tabledata = [
  //   {
  //     sku: 'E84h4k4',
  //     name: 'Lenovo Thinkpad',
  //     category: 'Product',
  //     subCategory: 'Laptop',
  //     price: 234,
  //     stock: 29
  //   },
  //   {
  //     sku: 'E84h4k4',
  //     name: 'Lenovo Thinkpad',
  //     category: 'Product',
  //     subCategory: 'Laptop',
  //     price: 234,
  //     stock: 29
  //   },
  //   {
  //     sku: 'E84h4k4',
  //     name: 'Lenovo Thinkpad',
  //     category: 'Product',
  //     subCategory: 'Laptop',
  //     price: 234,
  //     stock: 29
  //   },
  //   {
  //     sku: 'E84h4k4',
  //     name: 'Lenovo Thinkpad',
  //     category: 'Product',
  //     subCategory: 'Laptop',
  //     price: 234,
  //     stock: 29
  //   },
  //   {
  //     sku: 'E84h4k4',
  //     name: 'Lenovo Thinkpad',
  //     category: 'Product',
  //     subCategory: 'Laptop',
  //     price: 234,
  //     stock: 29
  //   }
  // ];

  const columnsdata = [

    {
      name: 'Course Name',
      sortable: true,
      // width: '130px',
      sortField: 'name',
      selector: (row) => row.courseName
    },
    {
      name: 'Course Image',
      sortable: true,
      // width: '130px',
      sortField: 'name',
      selector: (row) => row.courseImage,
      cell: (row) => <img height="40" width="40" src={row.courseImage} />
    },
    {
      name: 'Course Category',
      sortable: true,
      // width: '130px',
      sortField: 'category',
      selector: (row) => row.courseType
    },
    {
      name: 'Start Date',
      sortable: true,
      // width: '130px',
      sortField: 'subCategory',
      selector: (row) => row?.startDate?.slice(8,10)+"-"+row?.startDate?.slice(5,8)+row?.startDate?.slice(0,4)
    },
    {
      name: 'End Date',
      sortable: true,
      // width: '130px',
      sortField: 'subCategory',
      selector: (row) => row?.endDate?.slice(8,10)+"-"+row?.endDate?.slice(5,8)+row?.endDate?.slice(0,4)
    },
    {
      name: 'Price',
      sortable: true,
      // width: '130px',
      sortField: 'price',
      selector: (row) => row.coursePrice+"$"
    },
    // {
    //   name: 'Published',
    //   sortable: true,
    //   // width: '130px',
    //   sortField: 'published',
    //   cell: (row) => (
    //     <div className="form-check form-switch">
    //       <Input type="switch" name="published" id="published" />
    //     </div>
    //   )
    // },
    {
      name: 'Actions',
      // minWidth: '100px',
      cell: (row) => (
        <div className="column-action">
          {/* <FileText size={20} className="me-1" /> */}
          <Trash2 size={20} onClick={() => dispatch(courseDeleteAction(row._id))} className="me-1 cursor-pointer" />
          <Edit size={20} className="cursor-pointer" onClick={() => setDetails({ show: !details.show, details:row })} />
        </div>
      )
    }
  ];

  useEffect(() => {
    dispatch(courseFetchAction())

  }, [])


  return (
    !details?.show?<Fragment>
    
      <Card Card >
    <CardBody>
      <Row>
        <Col md="3">
          <Input
            id="search-invoice"
            // className="w-100"
            type="text"
            placeholder="Search Course ..."
          />
        </Col>
        <Col md="3">
          <Select
            theme={selectThemeColors}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            options={categoryOptions}
            value={currentCategory}
            onChange={(data) => {
              setCurrentCategory(data);
            }}
          />
        </Col>
        <Col md="3">
          <Select
            theme={selectThemeColors}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            options={priceOptions}
            value={currentPrice}
            onChange={(data) => {
              setCurrentPrice(data);
            }}
          />
        </Col>
        <Col md="3" className="d-flex justify-content-end">
          <Button
            className="btn-icon"
            color="primary"
            onClick={() => setCenteredModal(!centeredModal)}
          >
            Add Course
          </Button>
          <AddCourseModal centeredModal={centeredModal} setCenteredModal={setCenteredModal} />
        </Col>
      </Row>
    </CardBody>
      </Card >
  <Card>
    <Col>
      <DataTable columns={columnsdata} data={tableData} pagination />
    </Col>
  </Card>
    </Fragment >: <Details setDetails={setDetails} details={details} />
   
  );
};

export default Courses;

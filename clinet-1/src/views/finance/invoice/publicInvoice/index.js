import React, { Fragment, useState } from "react";
import '@styles/react/libs/react-select/_react-select.scss';
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";
import { Button, Card, Col, Row } from "reactstrap";
import Logo from "../../../../assets/images/logo/logo.png"

const DailyAttendance = [
    { taskDescription: "Battery", rate: "01/13/23", hours: "20 min", total: "$200" },
    { taskDescription: "Books", rate: "01/18/23", hours: "1 hour", total: "$200" },
    // { taskDescription: "Pens", rate: "01/24/23", hours: "4 hours", total: 200 },
    // { taskDescription: "Phone", rate: "01/03/23", hours: "4 hours", total: 200 },
    // { taskDescription: "Battery", rate: "01/13/23", hours: "2 hours", total: 200 },

]
const columns = [
    {
        name: "Task Description",
        // sortable: true,
        selector: (row) => row.taskDescription,
    },
    {
        name: "Rate",
        // sortable: true,
        selector: (row) => row.rate,
    },

    {
        name: "Hour",
        // sortable: true,
        selector: (row) => row.hours,
    },
    {
        name: "Total",
        // allowOverflow: true,
        // style: {
        //     display: "flex", justifyContent: "center"
        // },
        cell: (row) => row.total
    },
]

const OpenInvoice = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const handlePagination = page => {
        setCurrentPage(page.selected)
    }

    const CustomPagination = () => (
        <ReactPaginate
            previousLabel=""
            nextLabel=""
            forcePage={currentPage}
            onPageChange={(page) => handlePagination(page)}
            pageCount={Math.ceil(DailyAttendance.length / 7) || 1}
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
    )

    return (
        <Fragment>
            <div className="">
                <Card>
                    <Row className="">
                        <Col sm={4} md={4} lg={4} >
                            <div className="ms-1 pb-1">
                                <img src={Logo} style={{ width: "250px" }} alt="logo" />
                            </div>
                        </Col>
                        <Col sm={4} md={4} lg={4}>
                            <div className="pt-2">
                                <h3>This invoice is powered by mymanager.com</h3>
                            </div>
                        </Col>
                        <Col sm={4} md={4} lg={4}>
                            <div className="pt-2 d-flex justify-content-end ">
                                <Button outline >Login</Button>
                                <Button outline className="mx-1" >Sign Up</Button>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
            <div className="p-2">
                <Row className="mx-2">
                    <Col sm={9} md={9} lg={9}>
                        <Card className="p-2 mb-4">
                            <div style={{ borderBottom: "1px solid #ebe9f1" }}>
                                <Row className="mb-1">
                                    <Col sm={6} md={6} lg={6}>
                                        <div className="ms-1">
                                            <img src={Logo} alt="logo" />
                                        </div>
                                        <div className="ms-2 mt-1">
                                            <p className="mb-25">
                                                Office 149, 450 South Brand Brooklyn
                                            </p>
                                            <p className="mb-25">San Diego County, CA 91905, USA</p>
                                            <p className="mb-0">
                                                +1 (123) 456 7891, +44 (876) 543 2198
                                            </p>
                                        </div>
                                    </Col>
                                    <Col sm={6} md={6} lg={6}>
                                        <div className="d-flex justify-content-end mt-4">
                                            <div className="ms-2 mt-2">
                                                <h4 className="fw-bold text-end mb-1">INVOICE #3492</h4>
                                                <div className="invoice-date-wrapper mb-50">
                                                    <span className="invoice-date-title">Date Issued:</span>
                                                    <span className="fw-bold"> 25/08/2020</span>
                                                </div>
                                                <div className="invoice-date-wrapper">
                                                    <span className="invoice-date-title">Due Date:</span>
                                                    <span className="fw-bold ms-2">29/08/2020</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className=" ms-2 mt-3">
                                <Row className="pb-2">
                                    <Col sm="6">
                                        <h6 className="mb-1">Invoice To:</h6>
                                        <p className="mb-25">Thomas shelby</p>
                                        <p className="mb-25">Shelby Company Limited</p>
                                        <p className="mb-25">Small Heath, B10 0HF, UK</p>
                                        <p className="mb-25">718-986-6062</p>
                                        <p className="mb-0">peakyFBlinders@gmail.com</p>
                                    </Col>
                                    <Col className="mt-sm-0 mt-2" sm="6">
                                        <div className="d-flex justify-content-center">
                                            <div>
                                                <h6 className="mb-1">Payment Details:</h6>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td className="pe-1">Total Due:</td>
                                                            <td>
                                                                <strong>$12,110.55</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="pe-1">Bank name:</td>
                                                            <td>American Bank</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="pe-1">Country:</td>
                                                            <td>United States</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="pe-1">IBAN:</td>
                                                            <td>ETD95476213874685</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="pe-1">SWIFT code:</td>
                                                            <td>BR91905</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="mx-2">
                                <DataTable
                                    noHeader
                                    pagination
                                    columns={columns}
                                    paginationPerPage={7}
                                    className="react-dataTable"
                                    sortIcon={<ChevronDown size={10} />}
                                    paginationDefaultPage={currentPage + 1}
                                    paginationComponent={CustomPagination}
                                    data={DailyAttendance}
                                // selectableRowsComponent={BootstrapCheckbox}
                                // selectableRows
                                />
                            </div>
                            <div className="mx-2">
                                <Row className="mt-3">
                                    <Col className="mt-3"  >
                                        <p className="mb-0">
                                            <span className="fw-bold">Salesperson:</span>{' '}
                                            <span className="ms-75">Alfie Solomons</span>
                                        </p>
                                    </Col>
                                    <Col
                                        className="d-flex justify-content-center"
                                    >
                                        <div className="mb-2">
                                            <div className="d-flex ps-1 ">
                                                <p className=" my-0">Subtotal:</p>
                                                <p className="ms-1 my-0"> $1800</p>
                                            </div>
                                            <div className="d-flex ps-1 my-0">
                                                <p className=" my-0">Discount:</p>
                                                <p className="ms-1 my-0"> $28</p>
                                            </div>
                                            <div className="d-flex ps-1 my-0">
                                                <p className="me-1 mt-0">Tax:</p>
                                                <p className=" ms-3 mt-0"> 21%</p>
                                            </div>
                                            {/* <hr className="my-50" /> */}
                                            <div style={{ borderTop: "1px solid #ebe9f1" }} className="d-flex ps-1">
                                                <strong className=" mt-1">Total:</strong>
                                                <strong className="ms-1 mt-1"> $1690</strong>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{ borderTop: "1px solid #ebe9f1" }}>
                                <div className="mt-2 ms-2">
                                    <span className="fw-bold">Note:</span>
                                    <span>
                                        It was a pleasure working with you and your team. We
                                        hope you will keep us in mind for future freelance
                                        projects. Thank You!
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col sm={3} md={3} lg={3}>
                        <Card className="p-2">
                            <Button outline >Download</Button>
                            <Button outline className="my-1">Print</Button>
                            <Button color="success">Pay Now</Button>
                        </Card>
                    </Col>
                </Row>
            </div>

        </Fragment>
    )
}
export default OpenInvoice
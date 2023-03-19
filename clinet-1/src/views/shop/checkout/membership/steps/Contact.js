// ** React Imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../../store'
// ** Third Party Components
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import Select from 'react-select'
import { truncate } from '../../../../../utility/Utils'

// ** Reactstrap Imports
import {
    Form,
    Card,
    Label,
    CardHeader,
    CardTitle,
    CardBody,
    CardText,
    Button,
    Row,
    Col,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu
} from 'reactstrap'

// ** Utils
import { selectThemeColors } from '@utils'

const contacts = [
    { value: 'contact', label: 'Search Contact' },
    { value: 'nahid', label: 'ClintonOh' }
]

const contractMethods = [
    { value: 'paper', label: 'Paper' },
    { value: 'digital', label: 'Digital' },
    { value: 'document', label: 'Document' }
]

const defaultValues = {
    checkoutName: '',
    checkoutCity: '',
    checkoutState: '',
    checkoutNumber: '',
    checkoutFlatNo: '',
    checkoutPincode: '',
    checkoutLandmark: ''
}

const Address = (props) => {
    const invoices = [
        {
            id: 1,
            template_img: 'https://picsum.photos/id/200/100/150',
            template_title: 'membership invoice template'
        },
        {
            id: 2,
            template_img: 'https://picsum.photos/id/200/100/150',
            template_title: 'invoice template'
        },
        {
            id: 3,
            template_img: 'https://picsum.photos/id/200/100/150',
            template_title: 'invoice template'
        },
        {
            id: 4,
            template_img: 'https://picsum.photos/id/200/100/150',
            template_title: 'invoice template'
        },
        {
            id: 5,
            template_img: 'https://picsum.photos/id/200/100/150',
            template_title: 'invoice template'
        },
        {
            id: 6,
            template_img: 'https://picsum.photos/id/200/100/150',
            template_title: 'invoice template'
        }
    ]

    // ** States
    const [contractMethod, setContractMethod] = useState('digital')

    // ** Props

    const { stepper, contact, setContact } = props;
    const dispatch = useDispatch()

    // ** Vars
    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues })

    // ** On form submit if there are no errors then go to next step
    const onSubmit = (data) => {
        if (Object.values(data).every((field) => field.length > 0)) {
            stepper.next()
        } else {
            for (const key in data) {
                if (data[key].length === 0) {
                    setError(key, {
                        type: 'manual'
                    })
                }
            }
        }
    }

    const renderInvoices = () => {
        return invoices?.map((item) => (
            <div
                key={item.id}
                className="mb-1 p-1 d-flex flex-column align-items-center hover-zoom cursor-pointer rounded border border-secondary-subtle"
            >
                <div className="mb-1">
                    <img
                        className="img-fluid card-img-top"
                        src={item.template_img}
                        alt="sample invoice template"
                    />
                </div>
                <div className="d-flex align-items-center">
                    {truncate(item.template_title, 20)}
                </div>
            </div>
        ))
    }
    const [users, setUsers] = useState([]);
    useEffect(() => {
        dispatch(getUsers()).then((res) => {
            if (res && res.payload && res.payload.data) {
                res.payload.data.forEach((user, index) => {
                    const item = { value: user._id, label: user.firstName + ' ' + user.lastName, email: user.userId.email, phone: user.userId.phone };
                    setUsers(users => [...users, item]);
                })

            }
        });
    }, [])

    return (
        <Form
            className="list-view product-checkout"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Card>
                <CardHeader className="flex-column align-items-start">
                    <CardTitle tag="h4">Who is buying?</CardTitle>
                    <CardText className="text-muted mt-25">
                        Select A member from your Contacts
                    </CardText>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md="6" sm="12">
                            <div className="mb-2">
                                <Label
                                    className="form-label"
                                    for="checkoutName"
                                >
                                    Select Member
                                </Label>
                                <Select
                                    theme={selectThemeColors}
                                    className="react-select"
                                    classNamePrefix="select"
                                    defaultValue={users[0]}
                                    options={users}
                                    isClearable={false}
                                    onChange={(e) => setContact(e)}
                                />
                            </div>
                        </Col>
                        <Col md="6" sm="12">
                            <div className="mb-2">
                                <Label
                                    className="form-label"
                                    for="checkoutNumber"
                                >
                                    Contract Method
                                </Label>
                                <Select
                                    theme={selectThemeColors}
                                    className="react-select"
                                    classNamePrefix="select"
                                    defaultValue={contractMethods[1]}
                                    options={contractMethods}
                                    isClearable={false}
                                    onChange={(e) => setContractMethod(e.value)}
                                />
                            </div>
                        </Col>
                        {contractMethod === 'digital' && (
                            <div>
                                <CardTitle tag="h4" className="mb-0 mt-2">
                                    Choose a template
                                </CardTitle>
                                <CardText className="text-muted mt-25">
                                    Select an Invoice Template to send
                                </CardText>
                                <div className="ecommerce-header">
                                    <Row>
                                        <Col sm="12">
                                            <div className="ecommerce-header-items">
                                                <div className="result-toggler">
                                                    <span className="search-results">
                                                        12 Results Found
                                                    </span>
                                                </div>

                                                <div className="view-options d-flex">
                                                    <UncontrolledButtonDropdown className="dropdown-sort">
                                                        <DropdownToggle
                                                            className="text-capitalize me-1"
                                                            color="primary"
                                                            outline
                                                            caret
                                                        >
                                                            All Categories
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem className="w-100">
                                                                Membership
                                                                Invoices
                                                            </DropdownItem>
                                                            <DropdownItem className="w-100">
                                                                Regular Invoices
                                                            </DropdownItem>
                                                            <DropdownItem className="w-100">
                                                                Custom Invoices
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledButtonDropdown>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className={classnames('grid-view')}>
                                    {renderInvoices()}
                                </div>
                            </div>
                        )}
                    </Row>
                </CardBody>
            </Card>
            <div className="customer-card">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Preview</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardText className="mb-0">{contact.label}</CardText>
                        <CardText className="mb-0">{contact.phone}</CardText>
                        <CardText className="mb-1">
                            {contact.email}
                        </CardText>
                        <Button
                            block
                            type="button"
                            color="primary"
                            onClick={() => stepper.next()}
                            className="btn-next delivery-address mt-2"
                        >
                            Next
                        </Button>
                    </CardBody>
                </Card >
            </div >
        </Form >
    )
}

export default Address

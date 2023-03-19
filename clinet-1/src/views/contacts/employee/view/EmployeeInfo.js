// ** React Imports
import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { contactByIdAction } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert, Spinner } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import Connections from './Connections'
import UserInfoCard from './UserInfoCard'
import Employeestatus from './tabs/overview/Employeestatus'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { getTasksByEmployeeAction } from '../../../settings/tabs/rolesandper/store/employee/action'

const EmployeeInfo = () => {
    // ** Store Vars
    const [employee, setEmployee] = useState(null)

    const { contact } = useSelector((state) => state.employeeContact)
    const dispatch = useDispatch()
    const employeeId = useSelector(state => state.auth.userData.id);
    
    useMemo(() => {
        if (contact?.data) {
            setEmployee(contact?.data)
            
        }
    }, [contact])

    useEffect(() => {
        if (employeeId) {
            dispatch(contactByIdAction({ _id: employeeId }))
            dispatch(getTasksByEmployeeAction())
        }
    }, [dispatch, employeeId])

    const [active, setActive] = useState('6')

    const toggleTab = (tab) => {
        if (active !== tab) {
            setActive(tab)
        }
    }
    return employee !== null && employee !== undefined ? (
        <div className="app-user-view">
            <Row>
                <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
                    <UserInfoCard selectedUser={employee} />
                    <Employeestatus cols={{ md: '6', sm: '6', xs: '12' }} />
                    <Connections selectedUser={employee} />
                </Col>
                <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
                    <UserTabs
                        selectedEmployee={employee}
                        active={active}
                        toggleTab={toggleTab}
                        
                    />
                </Col>
            </Row>
        </div>
    ) : contact?.loading ? (
        <Spinner />
    ) : (
        <Alert color="danger">
            <h4 className="alert-heading">User not found</h4>
            <div className="alert-body">
                User with id: {employeeId} doesn't exist. Check list of all Users:{' '}
                <Link to="/contacts/employee/list">Employee List</Link>
            </div>
        </Alert>
    )
}
export default EmployeeInfo

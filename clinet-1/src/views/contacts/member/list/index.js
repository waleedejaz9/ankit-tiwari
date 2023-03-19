import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** User List Component
import Table from './memberTable'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useSelector } from 'react-redux'

const Members = () => {
    const memberStore = useSelector((state) => state.memberContact)

    return (
        <Fragment>
            <Breadcrumbs
                breadCrumbTitle="Members"
                breadCrumbParent="Contacts"
                breadCrumbActive="Members"
            />
            <div className="app-user-list">
                <Row>
                    <Col lg="3" sm="6">
                        <StatsHorizontal
                            color="primary"
                            statTitle="Total Members"
                            icon={<User size={20} />}
                            renderStats={
                                <h3 className="fw-bolder mb-75">
                                    {memberStore?.totalCount}
                                </h3>
                            }
                        />
                    </Col>
                    <Col lg="3" sm="6">
                        <StatsHorizontal
                            color="danger"
                            statTitle="Active Members"
                            icon={<UserPlus size={20} />}
                            renderStats={
                                <h3 className="fw-bolder mb-75">
                                    {' '}
                                    {memberStore?.activeCount}
                                </h3>
                            }
                        />
                    </Col>
                    <Col lg="3" sm="6">
                        <StatsHorizontal
                            color="success"
                            statTitle="Past Due Members"
                            icon={<UserCheck size={20} />}
                            renderStats={
                                <h3 className="fw-bolder mb-75">
                                    {' '}
                                    {memberStore?.pastDueCount}
                                </h3>
                            }
                        />
                    </Col>
                    <Col lg="3" sm="6">
                        <StatsHorizontal
                            color="warning"
                            statTitle="Former Members"
                            icon={<UserX size={20} />}
                            renderStats={
                                <h3 className="fw-bolder mb-75">
                                    {' '}
                                    {memberStore?.formerCount}
                                </h3>
                            }
                        />
                    </Col>
                </Row>
                <Table />
            </div>
        </Fragment>
    )
}

export default Members

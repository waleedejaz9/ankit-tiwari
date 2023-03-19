// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Bookmark, Archive } from 'react-feather'
import { VscNotebook } from 'react-icons/vsc'
import { GiRank2 } from 'react-icons/gi'
import { AiOutlineSafetyCertificate, AiOutlineFilePdf } from 'react-icons/ai'

// ** User Components
import OverviewTab from './tabs/overview'
import InvoiceTab from './tabs/InvoiceTab'
import RankTab from './tabs/RankTab'
import BillingPlanTab from './tabs/BillingTab'
import UserProjectsList from './tabs/UserProjectsList'
import FilesTab from './tabs/FilesTab'
import OtherTab from './tabs/OtherTab'
import { useSelector } from 'react-redux'

const UserTabs = ({ active, toggleTab, selectedUser }) => {
    return (
        <Fragment>
            <Nav pills className="mb-2">
                <NavItem>
                    <NavLink
                        active={active === '1'}
                        onClick={() => toggleTab('1')}
                    >
                        <User className="font-medium-3 me-50" />
                        <span className="fw-bold">Overview</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === '2'}
                        onClick={() => toggleTab('2')}
                    >
                        <Bookmark className="font-medium-3 me-50" />
                        <span className="fw-bold">Contracts</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === '5'}
                        onClick={() => toggleTab('5')}
                    >
                        <GiRank2 className="font-medium-3 me-50" />
                        <span className="fw-bold">Progression</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === '6'}
                        onClick={() => toggleTab('6')}
                    >
                        <AiOutlineSafetyCertificate className="font-medium-3 me-50" />
                        <span className="fw-bold">Billing</span>
                    </NavLink>
                </NavItem>
                 <NavItem>
                    <NavLink
                        active={active === '8'}
                        onClick={() => toggleTab('8')}
                    >
                        <AiOutlineFilePdf className="font-medium-3 me-50" />
                        <span className="fw-bold">Files</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === '9'}
                        onClick={() => toggleTab('9')}
                    >
                        <Archive className="font-medium-3 me-50" />
                        <span className="fw-bold">Activity</span>
                    </NavLink>
                </NavItem>
             </Nav>
            <TabContent activeTab={active}>
                <TabPane tabId="1">
                    <OverviewTab selectedUser={selectedUser} />
                </TabPane>
                <TabPane tabId="2">
                    <UserProjectsList />
                </TabPane>
                <TabPane tabId="5">
                    <RankTab selectedUser={selectedUser} />
                </TabPane>
                <TabPane tabId="6">
                    <BillingPlanTab selectedUser={selectedUser} />
                </TabPane>
                <TabPane tabId="7">
                    <InvoiceTab />
                </TabPane>
                <TabPane tabId="8">
                    <FilesTab selectedUser={selectedUser} />
                </TabPane>
                <TabPane tabId="9">
                    <OtherTab selectedUser={selectedUser} />
                </TabPane>
                <TabPane tabId="10">
                    <OtherTab selectedUser={selectedUser} />
                </TabPane>
            </TabContent>
        </Fragment>
    )
}
export default UserTabs

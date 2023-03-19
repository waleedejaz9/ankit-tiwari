import { lazy } from 'react';


const OrganizationRoutes = [
    {
        path: '/organizations',
        exact:true,
        appLayout:true,
        component: lazy(() => import('../../views/organizations'))
    },
    {
        path: '/organizations/:id',
        exact:true,
        appLayout:true,
        component: lazy(() => import('../../views/organizations/tabs/orgs/superAdmin/details/OrgDetails'))
    }
]

export default OrganizationRoutes;
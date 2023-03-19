import { lazy } from 'react'

const MySocial = [
    {
        path: '/mysocial/socialconnect',
        appLayout: true,
        className: 'email-application',
        component: lazy(() => import('../../views/marketing/SocialConnect'))
    },
    // {
    //     path: '/mysocial/socialproof',
    //     appLayout: true,
    //     className: 'email-application',
    //     component: lazy(() => import('../../views/blank_page'))
    // },
    {
        path: '/mysocial/socialproof',
        appLayout: true,
        className: 'email-application',
        component: lazy(() => import('../../views/SocialProof/index'))
      },
      {
        path: '/mysocial/camgaign-edit',
        appLayout: true,
        className: 'email-application',
        component: lazy(() => import('../../views/SocialProof/EditCampaign'))
      },
    {
        path: '/mysocial/reputation',
        appLayout: true,
        className: 'email-application',
        component: lazy(() => import('../../views/apps/reputation'))
    },
     // new route rohit
  {
    path: '/mysocial/createworkspace',
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/marketing/SocialConnect/Workspace/CreateWorkspace'))
  },
  {
    path: '/mysocial/workspacesocial',
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/marketing/SocialConnect/Workspace/WorkspaceSocial'))
  },
  {
    path: '/mysocial/Journal', 
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/newjournal/JournalMain'))
  }
]

export default MySocial

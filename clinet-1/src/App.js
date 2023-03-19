// ** Router Import
import Router from './router/Router'

// ** React Query Import
import { QueryClientProvider, QueryClient } from 'react-query'
import { SocketProvider } from './utility/context/Socket'

// ** Get all contacts   
import { contactListRequest as employeeContactListAction } from './views/contacts/employee/store/actions'
import { ClientContactFetchAction } from './views/contacts/client/store/actions'
import { fetchContactListAction as relationshipContactListAction } from './views/contacts/relationship/store/actions'
import { fetchContactListAction as vendorContactListAction } from './views/contacts/vendor/store/actions'
import { fetchContactListAction as leadContactListAction } from './views/contacts/leads/store/actions'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getUserData } from './utility/Utils'


const client = new QueryClient({})

const App = () => {

    // ** Get Current User
    const curUserInfo = getUserData();
    // ** Get All Contacts 
    const dispatch = useDispatch();  
    useEffect(() => {
        if(curUserInfo){
            dispatch(employeeContactListAction())
            dispatch(ClientContactFetchAction())
            dispatch(relationshipContactListAction())
            dispatch(vendorContactListAction())
            dispatch(leadContactListAction())
        } 
    }, [dispatch])

    return (
        <QueryClientProvider client={client}>
            <SocketProvider>
                <Router />
            </SocketProvider>
        </QueryClientProvider>
    )
}

export default App

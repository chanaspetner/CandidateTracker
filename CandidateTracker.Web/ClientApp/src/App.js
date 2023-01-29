import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './Pages/HomePage';
import NewCandidatePage from './Pages/NewCandidatePage';
import PendingPage from './Pages/PendingPage';
import RefusedPage from './Pages/RefusedPage';
import ConfirmedPage from './Pages/ConfirmedPage';
import ViewDetails from './Pages/ViewDetails';
import { RegistrationStatusCountContextComponent } from './RegistrationStatusContext';



const App = () => {
    return (
        <RegistrationStatusCountContextComponent>
            <Layout>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/newcandidate' component={NewCandidatePage} />
                <Route exact path='/pending' component={PendingPage} />
                <Route exact path='/refused' component={RefusedPage} />
                <Route exact path='/confirmed' component={ConfirmedPage} />
                <Route exact path='/viewdetails/:id' component={ViewDetails} />
            </Layout>
        </RegistrationStatusCountContextComponent>
    )
}

export default App;
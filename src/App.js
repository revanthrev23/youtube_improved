import { Container } from 'react-bootstrap';
import './_app.scss';
import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './Components/Screens/HomeScreen/HomeScreen';
import { useEffect, useState } from 'react';
import LoginScreen from './Components/Screens/LoginScreen/LoginScreen';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WatchScreen from './Components/Screens/WatchScreen/WatchScreen';
import SearchScreen from './Components/Screens/SearchScreen';
import SubscriptionScreen from './Components/Screens/SubscriptionScreen/SubscriptionScreen';
import ChannelScreen from './Components/Screens/ChannelScreen/ChannelScreen';

const Layout = ({children}) => {

  const [sideBar, toggleSideBar] = useState(false);

  const handleSidebar = () => {
    toggleSideBar(value => !value);
  }

    return(
      <>
    <Header handleSidebar={handleSidebar} />
    <div className="app__container">
        <Sidebar sideBar={sideBar} handleSidebar={handleSidebar} />
        <Container fluid className="app_main">
            {children}
        </Container>
    </div>
    </>
    );   
}

function App() {

    const {accessToken, loading} = useSelector(state=>state.auth)
    const history = useHistory();

    useEffect(() => {
        if(!loading && !accessToken){
            history.push('/auth')
        }
    },[accessToken, loading, history]);

  return (
        <Switch>
            <Route path="/auth">
                <LoginScreen />
            </Route>
            <Route path="/search/:query">
                <Layout>
                    <SearchScreen />
                </Layout>
            </Route>
            <Route path="/watch/:id">
                <Layout>
                    <WatchScreen />
                </Layout>
            </Route>
            <Route path="/feed/subscriptions">
                <Layout>
                    <SubscriptionScreen />
                </Layout>
            </Route>
            <Route path="/channel/:channelId">
                <Layout>
                    <ChannelScreen />
                </Layout>
            </Route>
            <Route path="/">
                <Layout>
                    <HomeScreen />
                </Layout>
            </Route>
            <Route>
                <Redirect to="/" />
            </Route>
        </Switch>
  );
}

export default App;

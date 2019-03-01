import React, {useState, useEffect} from 'react';
import {Alert} from 'reactstrap';
import {FadeLoader} from 'react-spinners';
import './App.css';
import AppHeader from './AppHeader.jsx';
import UserInfo from './UserInfo.jsx';
import {checkPermissionToRegisterFights, onUserChange} from 'marathon-lib/src/auth';
import AppView from './AppView.jsx';

const App = () => {
    const [user, setUser] = useState(null);
    const [hasPermissionToRegisterFights, setHasPermissionToRegisterFights] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        return onUserChange(user => {
            setUser(user);
            setHasPermissionToRegisterFights(false);
            if (user === null) {
                return;
            }

            setLoading(true);
            checkPermissionToRegisterFights(user)
                .then(setHasPermissionToRegisterFights)
                .finally(() => setLoading(false));
        });
    }, []);

    const displayAlert = alert => {
        const newAlerts = alerts.slice();
        newAlerts.unshift(alert);
        setAlerts(newAlerts);

        setTimeout(() => {
            setAlerts([]);
        }, 3000);
    };

    return (
        <div className="App">
            <AppHeader/>
            {alerts.map((alert, key) => (
                <Alert key={key} color="danger">
                    {alert}
                </Alert>
            ))}
            <UserInfo user={user}/>
            {loading && (<div style={{width: '50px', margin: 'auto'}}>
                <FadeLoader loading={loading}/>
            </div>)}

            {user && hasPermissionToRegisterFights && <AppView displayAlert={displayAlert}/>}
            {user && !hasPermissionToRegisterFights && !loading && (
                <span style={{color: 'red'}}>Brak uprawnień. Skontaktuj się z administratorem.</span>
            )}
        </div>
    );
};

export default App;

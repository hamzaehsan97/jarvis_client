import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <Link to="/service1">
                    <div>
                        <h3>Service 1</h3>
                        <p>Description of Service 1</p>
                    </div>
                </Link>
                <Link to="/service2">
                    <div>
                        <h3>Service 2</h3>
                        <p>Description of Service 2</p>
                    </div>
                </Link>
                <Link to="/service3">
                    <div>
                        <h3>Service 3</h3>
                        <p>Description of Service 3</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;

import React from 'react';
import Sidebar from './Sidebar.jsx';
import './Dashboard.css';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';

// ✅ Import required modules from Chart.js
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// ✅ Register required modules
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "Total Amount",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, 4000]
            }
        ]
    };

    const doughnutState = {
        labels: ["Out of Stock", "In Stock"],
        datasets: [
            {
                backgroundColor: ["#00A600", "#FFC0CB"],
                hoverBackgroundColor: ["#36A2EB", "#3e95cd"],
                data: [2, 10]
            }
        ],  
    };

    return (
        <div className='dashboard'>   
            <Sidebar />

            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> Rs. 100
                        </p>
                    </div>

                    <div className="dashboardSummaryBox2">
                        <Link to='/admin/products'>
                            <p>Products</p>
                            <p>50</p>
                        </Link>

                        <Link to='/admin/orders'>
                            <p>Orders</p>
                            <p>4</p>
                        </Link>

                        <Link to='/admin/users'>
                            <p>Users</p>
                            <p>2</p>   
                        </Link>
                    </div>
                </div>

                <div className="lineChart">
                    <Line data={lineState} />
                </div>

                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

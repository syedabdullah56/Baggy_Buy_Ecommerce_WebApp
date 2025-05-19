import React,{Fragment,useEffect} from 'react';
import Sidebar from './Sidebar.jsx';
import './Dashboard.css';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';
import { useSelector,useDispatch } from 'react-redux';
import {  getAdminProducts } from '../../actions/productAction';


// ✅ Import required modules from Chart.js
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { getAllOrders } from '../../actions/orderAction.js';
import { getAllUsers } from '../../actions/userAction.js';

// ✅ Register required modules
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
    const dispatch=useDispatch();
    const {products}=useSelector((state)=>state.adminProducts)
    const {orders}=useSelector((state)=>state.allOrders)
    const {users}=useSelector((state)=>state.allUsers)
    

    let outOfStock = 0;
    products && 
        products.forEach((item) => {
            if (item.Stock === 0) {
                outOfStock += 1;
            }
    })

     useEffect(() => {
        
            dispatch(getAdminProducts());  
            dispatch(getAllOrders())
            dispatch(getAllUsers())
        }, [dispatch]);


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
                data: [outOfStock, products.length - outOfStock]
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
                            <p>{products && products.length}</p>
                        </Link>

                        <Link to='/admin/orders'>
                            <p>Orders</p> 
                            <p>{orders && orders.length}</p>
                        </Link>

                        <Link to='/admin/users'>
                            <p>Users</p>
                            <p>{users && users.length}</p>   
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

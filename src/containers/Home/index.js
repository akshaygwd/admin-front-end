import React from "react";
import { Container, Jumbotron, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Layout from "../../components/Layout";
import './style.css';

const Home = (props) => {
    return (
        <Layout sidebar>
            {/* <Jumbotron style={{margin: '5rem', background: '#fff'}} className="text-center">
                <h1>Welcome to Admin Dashboard</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,</p>
            </Jumbotron> */}
        </Layout>
    );
}

export default Home;
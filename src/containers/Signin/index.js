import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from '../../components/UI/Input';
import { login, isUSerLOggedIn } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { Redirect } from 'react-router-dom';
import { useEffect } from "react";

const Signin = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();


  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password
    }

    dispatch(login(user));
    console.log(auth, 'hit');
  }

  if(auth.authenticate) {
    return <Redirect to={'/'} />
  }



  return (
    <Layout>
      <Container>
        <Row style={{marginTop: '50px'}}>
          <Col md={{span: 6, offset: 3}}>
            <Form onSubmit={userLogin}>
            <Input
                    label="Email"
                    placeholder="Enter Email"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    label="Password"
                    placeholder="Enter Password"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Signin;
import React, {Component} from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { saveuserData, redirectMapView, removeuserData } from 'helpers/functions';

class LoginForm extends Component {
    
  constructor(props){
    super(props);
    this.state= {
      email:'',
      password:'',
      errors:[],
    }
  }

  componentDidMount() {
    removeuserData()
  }

  handleChange = (event) => {
    this.setState({ email: event.target.value });
  }
    
  render() {
    const { getFieldDecorator } = this.props.form;
      return (
        <>
        <Mutation mutation={SIGNIN_USER_MUTATION}>
        {(loginUser, { data, loading, error }) => {       
          let token = data?data.loginUser.accessToken:''
          saveuserData(token, token)
          return (
          <Row className='login_container' type='flex' justify='center' align='middle'>
            <Col className='login_content'>
              <div>
                {loading &&
                  <div>Authenticating...</div>
                }   
                { data &&
                  redirectMapView()
                }
                { error &&
                  <div>Error with your credentials</div>
                }
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.form.validateFields((err, values) => {
                      if (!err) {
                        loginUser({ 
                          variables: { 
                              'user': {
                                'email': values.email,
                                'password': values.password
                              } 
                          } 
                        });
                        console.log('Received values of form: ', values.email, values.password);
                      }
                    });
                  }} className='login-form'>
                  <Form.Item>
                    {getFieldDecorator('email', {
                      rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                      <Input
                      prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type='email'
                      placeholder='Email'
                      onChange={(event) => this.setState({ email: event.target.value })}
                      />,
                      )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                      <Input
                      prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type='password'
                      placeholder='Password'
                      onChange={(event) => this.setState({ password: event.target.value })}
                      />,
                      )}
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' htmlType='submit' className='login-form-button primary_btn'>
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
          )}}
          </Mutation>
        </>
      );
    }
  }
  const Login = Form.create({ name: 'normal_login' })(LoginForm);
  Login.defaultName = 'LoginPage';
  export default Login
  
  const  SIGNIN_USER_MUTATION = gql`
  mutation loginUser($user:LoginType!)  {
    loginUser(user:$user) {
      accessToken
      message
      status
    }
  }
  `;
  
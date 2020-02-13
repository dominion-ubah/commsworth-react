import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Button, Modal, Icon, Form, Input, Row, Col} from 'antd';
import { redirectLogin } from 'helpers/functions';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class HeaderContainer extends Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null, visible:false, title:'',  };
    }

    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleCancel = () => {
      this.setState({
        visible: false,
      });
    };
    
    handleSuccess = (data, form) => {
      this.setState({
        ModalText: 'Project Created !',
      });
      form.resetFields()
    }

  render() {
    const { visible, ModalText } = this.state;
    const { getFieldDecorator } = this.props.form;
    console.log('form', this.props.form)
      return (
        <Mutation mutation={CREATE_PROJECT_MUTATION}>
        {(createProject, { data, loading, error }) => {
         return ( <PageHeader
      style={{
        border: '1px solid rgb(235, 237, 240)',
      }}
      onBack={redirectLogin}
      title="Map View"
      subTitle="See Location and View details"
      extra={[
        <Link to="/login">
        <Button key="1" type="secondary">
          Logout
        </Button>
        </Link>,
        <Button key="1" type="primary" onClick={this.showModal}>
          Create Project
        </Button>,
      ]}
    >
      <Modal
          title="Create New Project"
          visible={visible}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
          <Row className=''>
            <Col className='login_content'>
              <div>
                {loading &&
                  <div>Saving...</div>
                }
                
                { data && 
                  this.handleSuccess(data, this.props.form)
                
                }
                { error &&
                  <div>Error with your Input</div>
                }
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.form.validateFields((err, values) => {
                      if (!err) {
                        createProject({ 
                          variables: { 
                              'project': {
                                'title':values.title,
                                'budget': values.budget,
                                'startDate': values.startDate,
                                'endDate': values.endDate,
                                'contractorName': values.contractorName,
                                'contractorAddress': values.contractorAddress
                              } 
                          } 
                        });
                        console.log('Received values of form: ', values.email, values.password);
                      }
                    });
                  }} className='login-form'>                  
                  <Form.Item>
                    {getFieldDecorator('title', {
                      rules: [{ required: true, message: 'Please add a project Title!' }],
                    })(
                      <Input
                      prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type='text'
                      placeholder='Project Title'
                      onChange={(event) => this.setState({ title: event.target.value })}
                      />,
                      )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('budget', {
                      rules: [{ required: true, message: 'Please input your Budget!' }],
                    })(
                      <Input
                      prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type='number'
                      placeholder='Budget ($)'
                      onChange={(event) => this.setState({ budget: event.target.value })}
                      />,
                      )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('startDate', {
                      rules: [{ required: true, message: 'Please input your Start Date!' }],
                    })(
                      <Input
                      prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type='text'
                      placeholder='Start Date '
                      onChange={(event) => this.setState({ startDate: event.target.value })}
                      />,
                      )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('endDate', {
                      rules: [{ required: true, message: 'Please input your End Date!' }],
                    })(
                      <Input
                      prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type='text'
                      placeholder='End Date'
                      onChange={(event) => this.setState({ endDate: event.target.value })}
                      />,
                      )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('contractorName', {
                      rules: [{ required: true, message: 'Please input the Contractor\'s Name!' }],
                    })(
                      <Input
                      prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type='text'
                      placeholder='Contractor Name'
                      onChange={(event) => this.setState({ contractorName: event.target.value })}
                      />,
                      )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('contractorAddress', {
                      rules: [{ required: true, message: 'Please input your Contractor\'s Address!' }],
                    })(
                      <Input
                      prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type='text'
                      placeholder='Contractor Address'
                      onChange={(event) => this.setState({ contractorAddress: event.target.value })}
                      />,
                      )}
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Create Project
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </Modal>
    </PageHeader>)
      }}
          </Mutation>
      
      )}
}
const Header = Form.create({ name: 'create_project_header' })(HeaderContainer);

Header.defaultName = 'HeaderContainer';

export default Header;


const  CREATE_PROJECT_MUTATION = gql`
mutation createProject($project:CreateProjectType!)  {
  createProject(project:$project) {
    message
    status
  }
}
`;



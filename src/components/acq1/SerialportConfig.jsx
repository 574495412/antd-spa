import React, {Component} from 'react';
import { Row, Col, Form, Select, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
let socket = {};

class SerialportConfigTemp extends Component{
    constructor(props){
        super(props);
        socket = props.socket;
        this.state = {
            portsName: [],
        }
    }
    componentWillMount(){
        fetch('http://localhost/portsName')
            .then(response  => {
                // console.log(response.status);
                // console.log(response);
                // console.log(response.json());
                response.json().then(function(data){
                    // console.log(data);
                    this.setState({
                        portsName: data
                    })
                }.bind(this));
            }).catch(e => {
            console.log("something wrong");
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                fetch('http://localhost/connect',{
                    method: 'POST',
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values)
                }).then(function (res) {
                    console.log(res);
                }).catch(function (err) {
                    console.log(err);
                })
            }
        });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const { portsName } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const SelectCOM = portsName.map(function (item) {
            return (
                <Option value={item} key={item}>{item}</Option>
            )
        });
        return(
            <div className="config">
                <Row type="flex" justify="center">
                    <Col md={12} xs={24}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label="串口"
                                hasFeedback
                            >
                                {getFieldDecorator('COM', {
                                    initialValue:'COM1',
                                    rules: [{
                                        required: true, message: '请选择串口！',
                                    }],
                                })(
                                    <Select>
                                        {SelectCOM}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="波特率"
                                hasFeedback
                            >
                                {getFieldDecorator('baudRate', {
                                    initialValue:'115200',
                                    rules: [{
                                        required: true, message: '请选择波特率！',
                                    }],
                                })(
                                    <Select>
                                        <Option value="9600">9600</Option>
                                        <Option value="19200">19200</Option>
                                        <Option value="38400">38400</Option>
                                        <Option value="57600">57600</Option>
                                        <Option value="115200">115200</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="数据位"
                                hasFeedback
                            >
                                {getFieldDecorator('dataBits', {
                                    initialValue:'8',
                                    rules: [{
                                        required: true, message: '请选择数据位！',
                                    }],
                                })(
                                    <Select>
                                        <Option value="5">5</Option>
                                        <Option value="6">6</Option>
                                        <Option value="7">7</Option>
                                        <Option value="8">8</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="校验位"
                                hasFeedback
                            >
                                {getFieldDecorator('parity', {
                                    initialValue:'none',
                                    rules: [{
                                        required: true, message: '请选择校验位！',
                                    }],
                                })(
                                    <Select>
                                        <Option value="none">None</Option>
                                        <Option value="even">Even</Option>
                                        <Option value="odd">Odd</Option>
                                        <Option value="mark">Mark</Option>
                                        <Option value="space">Space</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="停止位"
                                hasFeedback
                            >
                                {getFieldDecorator('stopBits', {
                                    initialValue:'1',
                                    rules: [{
                                        required: true, message: '请选择停止位！',
                                    }],
                                })(
                                    <Select>
                                        <Option value="1">1</Option>
                                        <Option value="1.5">1.5</Option>
                                        <Option value="2">2</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="流控"
                                hasFeedback
                            >
                                {getFieldDecorator('flowControl', {
                                    initialValue:'none',
                                    rules: [{
                                        required: true, message: '请选择流控！',
                                    }],
                                })(
                                    <Select>
                                        <Option value="none">None</Option>
                                        <Option value="rts/cts">RTS/CTS</Option>
                                        <Option value="xon/xoff">XON/XOFF</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" style={{width:'100%'}}>连接</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

const SerialportConfig = Form.create()(SerialportConfigTemp);
export default SerialportConfig;
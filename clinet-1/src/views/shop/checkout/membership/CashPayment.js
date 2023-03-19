import { useState } from 'react'

// ** Reactstrap Imports
import { Form, Label, Input, Button, Row, Col } from 'reactstrap'
import useMessage from '../../../../lib/useMessage';
import {checkoutMembership} from '../../store'
import { validateMembership } from '../../../../utility/Utils';
const CashPayment = (props) => {
    const {contact, total, membershipdetail, dispatch, setIsPaid}=props;
    const [selectedMethod, setSelectedMethod] = useState();
    const [status, setStatus]=useState(false);
    const [state, setState]=useState({
        chequenumber:''
    });
    const {error, success}=useMessage();
    const submitHandler=()=>{
        if(selectedMethod===''){
            error('payment type must not be empty!')
            return;
        }
        if(selectedMethod==='cheque' && state.chequenumber===''){
            error('checue number must not be empty!')
            return;
        };
        const err=validateMembership(membershipdetail);
        if(Object.keys(err).length){
            error('membership information must not be correct!')
            return;
        }
        else{
            const membership_detail={...membershipdetail, cheque_no:state.chequenumber};
            const data={
                type:selectedMethod,
                holderName:'',
                cardNumber:'',
                expiryDate:'',
                cvv:'',
                contact:contact.value,
                membership:membership_detail,
                total:total,
                email:contact.email,
                name:contact.label
            };
            dispatch(checkoutMembership(data)).then((res, err)=>{
                if(res && res.payload){
                    const result=res.payload.data;
                    if(result.status==='success'){
                        setIsPaid(true);
                        setStatus(true);
                        success('payment successfully done.');
                    }
                    else{
                        const msg=result.msg;
                        error(msg);
                    }
                }
    
            });
        }
    }
    return (
        <div className="card-payment">
            <Form className="form">
                <Row>
                    <Label className="form-label mb-1" for="payment-input-name">
                        Choose a payment method
                    </Label>
                    <Col sm="12" className="mb-3">
                        <div className="d-flex">
                            <div className="form-check me-3">
                                <Input
                                    type="radio"
                                    id="ex1-active"
                                    name="ex1"
                                    value="cash"
                                    onChange={(e) =>
                                        setSelectedMethod(e.target.value)
                                    }
                                />
                                <Label
                                    className="form-check-label"
                                    for="ex1-active"
                                >
                                    Cash
                                </Label>
                            </div>
                            <div className="form-check">
                                <Input
                                    type="radio"
                                    name="ex1"
                                    value="cheque"
                                    onChange={(e) =>
                                        setSelectedMethod(e.target.value)
                                    }
                                    id="ex1-inactive"
                                />
                                <Label
                                    className="form-check-label"
                                    for="ex1-inactive"
                                >
                                    Check
                                </Label>
                            </div>
                        </div>
                    </Col>
                    {selectedMethod && selectedMethod === 'cheque' ? (
                        <Col sm="12" className="mb-2">
                            <Label
                                className="form-label"
                                for="payment-input-name"
                            >
                                Check Number
                            </Label>
                            <Input
                                placeholder="Type the cheque number here"
                                id="payment-input-name"
                                onChange={(e) => {
                                    setState((p) => ({
                                  ...p,
                                  type:'check',
                                  chequenumber: e.target.value
                                }));
                              }}
                            />
                        </Col>
                    ) : (
                        <></>
                    )}

                    <Col className="d-grid" sm="12">
                        <Button color={status?"success":'primary'} onClick={submitHandler}>{status?"Payment Paid":"Pay Now"}</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default CashPayment

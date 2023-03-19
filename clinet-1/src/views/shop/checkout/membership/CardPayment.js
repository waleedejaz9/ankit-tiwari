// ** Third Party Components
import Cleave from 'cleave.js/react'
import useMessage from '../../../../lib/useMessage';
// ** Reactstrap Imports
import { Form, Label, Input, Button, Row, Col } from 'reactstrap'
import {useSelector } from 'react-redux'
import { useState } from 'react'
import {checkoutMembership} from '../../store'
import { validateMembership } from '../../../../utility/Utils';
const CardPayment = (props) => {
    const {contact, total, membershipdetail, dispatch, setIsPaid}=props;
    const [status, setStatus]=useState(false);
    const [state, setState]=useState({
        holderName:'',
        cardNumber:0,
        expiryDate:'',
        cvv:''   
    });
    const {error, success}=useMessage();
    const store = useSelector((state) => state.shop);
    const submitHandler=()=>{
        const {holderName, cardNumber, expiryDate, cvv}=state;
        if(contact===''){
            error('contact address must not be empty!');
            return;
        }
        if(holderName===''){
            error('holder name must not be empty!');
            return;
        }
        if(cardNumber===0){
            error('card number must not be empty!');
            return;
        }
        if(expiryDate===''){
            error('expiry date must not be empty!');
            return;
        };
        if(cvv===''){
            error('cvv must not be empty!');
            return;
        };
        const err=validateMembership(membershipdetail);
        if(Object.keys(err).length){
            error('membership info mush be correct.');
            return;
        }
        else{
            const data={
                type:'card',
                holderName:holderName,
                cardNumber:cardNumber,
                expiryDate:expiryDate,
                cvv:cvv,
                contact:contact.value,
                membership:membershipdetail,
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
    };
    return (
        <div className="card-payment">
            <Form className="form">
                <Row>
                    <Col sm="12" className="mb-2">
                        <Label className="form-label" for="payment-input-name">
                            Card Holder Name
                        </Label>
                        <Input
                            placeholder="Curtis Stone"
                            id="payment-input-name"
                            onChange={(e) => {
                                setState((p) => ({
                              ...p,
                              holderName: e?.target?.value
                            }));
                          }}
                        />  
                    </Col>
                    <Col sm="12" className="mb-2">
                        <Label className="form-label" for="payment-card-number">
                            Card Number
                        </Label>
                        <Cleave
                            className="form-control"
                            placeholder="2133 3244 4567 8921"
                            options={{ creditCard: true }}
                            id="payment-card-number"
                            onChange={(e) => {
                                setState((p) => ({
                              ...p,
                              cardNumber: e?.target?.value
                            }));
                          }}
                        />
                    </Col>
                    <Col sm="6" className="mb-2">
                        <Label className="form-label" for="payment-expiry">
                            Expiry
                        </Label>
                        <Cleave
                            className="form-control"
                            placeholder="MM / YY"
                            options={{
                                date: true,
                                delimiter: '/',
                                datePattern: ['Y', 'm']
                            }}
                            id="payment-expiry"
                            onChange={(e) => {
                                setState((p) => ({
                              ...p,
                              expiryDate: e?.target?.value
                            }));
                          }}
                        />
                    </Col>
                    <Col sm="6" className="mb-2">
                        <Label className="form-label" for="payment-cvv">
                            CVV / CVC
                        </Label>
                        <Input
                            type="number"
                            placeholder="123"
                            id="payment-cvv"
                            onChange={(e) => {
                                setState((p) => ({
                              ...p,
                              cvv: e?.target?.value
                            }));
                          }}
                        />
                    </Col>

                    <Col className="d-grid" sm="12">
                        <Button color={status?"success":"primary"} onClick={submitHandler}>{status?"Payment Paid":"Pay Now"}</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default CardPayment

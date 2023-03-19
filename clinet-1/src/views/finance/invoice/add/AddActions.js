// ** React Imports
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import { Card, CardBody, Button, Input } from 'reactstrap';
import ChangeTemplate from './ChangeTemplate';
import EditPayment from './EditPayment';
import Select, { components } from 'react-select';
import { selectThemeColors } from '@utils';

const paymentOptions = [
  { value: 'Cradit Card', label: 'Cradit Card' },
  { value: 'Debit Card', label: 'Debit Card' },
  { value: 'Wire Transfer', label: 'Wire Transfer' },
  { value: 'PayPal', label: 'PayPal' },
];

const AddActions = (props) => {
  const { handlesubmit, invoicedata, setinvoice } = props
  const [payUsing, setPayUsing] = useState([])
  console.log(payUsing)

  return (
    <Fragment>
      <Card className="invoice-action-wrapper">
        <CardBody>
          <Button color="primary" block className="mb-75" disabled>
            Send Invoice
          </Button>
          <Button tag={Link} to="/public-invoice" target="_blank" color="primary" block outline className="mb-75">
            Preview
          </Button>
          <ChangeTemplate />
          <EditPayment invoicedata={invoicedata} setinvoice={setinvoice} />
          <Button className="mb-75" color="success" block onClick={handlesubmit}>
            Save
          </Button>
        </CardBody>
      </Card>
      <div className="mt-2">
        <div className="invoice-payment-option">
          <p className="mb-50">Accept payments via</p>
          <Select
            theme={selectThemeColors}
            defaultValue={payUsing}
            isMulti
            className="react-select"
            classNamePrefix="select"
            options={paymentOptions}
            isClearable={false}
            name="country"
            onChange={(data) => { setPayUsing(data) }}
          />
        </div>
        {/* <div className="invoice-terms mt-1">
          <div className="d-flex justify-content-between">
            <label className="cursor-pointer mb-0" htmlFor="payment-terms">
              Payment Terms
            </label>
            <div className="form-switch">
              <Input type="switch" id="payment-terms" defaultChecked />
            </div>
          </div>
          <div className="d-flex justify-content-between py-1">
            <label className="cursor-pointer mb-0" htmlFor="client-notes">
              Client Notes
            </label>
            <div className="form-switch">
              <Input type="switch" id="client-notes" defaultChecked />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <label className="cursor-pointer mb-0" htmlFor="payment-stub">
              Payment Stub
            </label>
            <div className="form-switch">
              <Input type="switch" id="payment-stub" />
            </div>
          </div>
        </div> */}
      </div>
    </Fragment>
  );
};

export default AddActions;

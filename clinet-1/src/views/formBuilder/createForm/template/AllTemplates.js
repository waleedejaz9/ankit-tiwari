import React, { Fragment } from 'react';
import { Plus } from 'react-feather';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';

export default function AllTemplates({form,setForm}) {
  const handleSelectTemplate = (e)=>{
    setForm({...form,templateId:e.target.value})
  }
  return (
    <Fragment>
      <div className="p-1">
        <Row>
          <Col sm="6" md="4">
            <Card>
              <CardBody className="text-center text-primary">
                <div>
                  <Plus size={35} />
                  <h5 className="py-2">New Blank</h5>
                  <Button color="outline-primary" value="1" onClick={handleSelectTemplate}>
                    Select new blank
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}

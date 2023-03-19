import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import Buyimg from '../../../assets/img/card-img-overlay.jpg';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import { AiOutlinePlusSquare } from 'react-icons/ai';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function JournalDetail() {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  return (
    <div>
      <div className="detail-m">
        <img src={Buyimg} className="" alt="" width="100%" />
        <div className="detail-1 mt-2">
          <Container>
            <form>
              <Row>
                <Col md="12">
                  <p className="mm-1">
                    Date - 23/02/2023 time - 2:00{' '}
                    <span className="right-side">
                      {' '}
                      <AiOutlinePlusSquare
                        size={25}
                        // onClick={() => handleAddJournal('Open')}
                        className="categorybtntext mb-2"
                      ></AiOutlinePlusSquare>
                    </span>
                  </p>
                </Col>
                <Col md="12" className="mt-1 mb-1">
                  <Input type="file" className="form-control" />
                </Col>
                <Col md="12">
                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    // onEditorStateChange={onEditorStateChange}
                    toolbar={{
                      options: ['inline', 'textAlign'],
                      inline: {
                        inDropdown: false,
                        options: ['bold', 'italic', 'underline', 'strikethrough']
                      }
                    }}
                  />
                </Col>
                <Col md="12">
                  <div className="btn-st-r">
                    <Button color="primary" outline>
                      Save
                    </Button>
                  </div>
                </Col>
              </Row>
            </form>
          </Container>
        </div>
      </div>
    </div>
  );
}

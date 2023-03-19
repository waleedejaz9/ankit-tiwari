import { useState } from 'react';
import Flatpickr from 'react-flatpickr';

import {
  Button,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Badge,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card
} from 'reactstrap';
// import Select, { components } from 'react-select'; //eslint-disable-line

import { useForm, Controller } from 'react-hook-form';
import { Trash, Plus, Dribbble, Check, Settings } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Upload from './component/Upload';
import Select, { components } from 'react-select'; //eslint-disable-line

import classnames from 'classnames';

// ** Store & Actions
import { useDispatch } from 'react-redux';

// ** Styles
import '@src/assets/styles/label-management.scss';

// ** Utils
import { selectThemeColors } from '@utils';
import AddNewExpense from './AddNewExpense';
import { useLocation } from 'react-router-dom';

const labelOptions = [
  { value: 'Working on it', label: 'Working on it' },
  { value: 'Done', label: 'Done' },
  { value: 'Status', label: 'Status' },
  { value: 'Stuck', label: 'Stuck' }
];

const labelColors = {
  Done: 'info',
  Status: 'success',
  Stuck: 'warning',
  Forms: 'success',
  'Code Review': 'danger',
  'Charts & Maps': 'primary'
};

const colorData = [
  { hex: '#7367f0', color: 'primary' },
  { hex: '#82868b', color: 'secondary' },
  { hex: '#28c76f', color: 'success' },
  { hex: '#ea5455', color: 'danger' },
  { hex: '#ff9f43', color: 'warning' },
  { hex: '#00cfe8', color: 'info' },
  { hex: '#a0a0d0', color: 'light-primary' },
  { hex: '#a0a0a0', color: 'light-secondary' },
  { hex: '#90d0b0', color: 'light-success' },
  { hex: '#d08080', color: 'light-danger' },
  { hex: '#ffc0a0', color: 'light-warning' },
  { hex: '#40e0ff', color: 'light-info' }
];

const AddExpense = (props) => {
  const [open, setOpen] = useState(false);
  const [labelManagementFlag, setLabelManagementFlag] = useState(false);
  const locationPath = useLocation();
  const isExpenseSection = locationPath.pathname === '/finance/expense';

  const handleOpen = () => {
    setOpen(!open);
  };

  // ** Store Vars
  const dispatch = useDispatch();

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { labelTitle: '' } });

  const [selectedLabel, setSelectedLabel] = useState([]);
  const [labels, setLabels] = useState([]);
  const [lbTitle, setLbTitle] = useState();
  const [lbColor, setLbColor] = useState();

  const [state, setState] = useState({
    date: new Date(),
    time: new Date(),
    category: ''
  });

  // // ** Function to run when sidebar closes
  const handleModalClosed = () => {
    setSelectedLabel({ _id: '', title: '', color: '' });
    setLbTitle('');
    setLbColor('');
  };

  const LabelOptions = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <Badge color={labelColors[data.label]}>{data.label}</Badge>
      </components.Option>
    );
  };

  return (
    <>
      <AddNewExpense modalFlag={labelManagementFlag} setModalFlag={setLabelManagementFlag} />
      <Button color="primary" onClick={handleOpen} style={{ marginLeft: '5px', height: '38px' }}>
        Add Expense
      </Button>
      <Modal
        centered
        isOpen={open}
        toggle={() => setOpen(false)}
        onClosed={handleModalClosed}
        className="modal-dialog-label-management"
        style={{}}
      >
        <ModalHeader toggle={() => setOpen(false)}>Add Expense</ModalHeader>
        <ModalBody>
          <div>
            <Label>Expense Name</Label>
            <Input type="text" placeholder="Expense name.." />
          </div>
          <div>
            <Label>Date</Label>
            <Flatpickr
              onChange={(date) =>
                setState({
                  ...state,
                  date: date
                })
              }
              value={state?.date}
              options={{
                dateFormat: 'm-d-Y'
              }}
              className="form-control invoice-edit-input date-picker"
            />
          </div>
          <div>
            <Label>Time</Label>
            <Flatpickr
              value={state?.time}
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: 'h:i K'
              }}
              onChange={(time) =>
                setState({
                  ...state,
                  date: time
                })
              }
              className="form-control invoice-edit-input date-picker bg-white"
            />
          </div>
          <div>
            <div className="d-flex justify-content-between">
              <Label>Category</Label>
              <div style={{ marginRight: '10px' }}>
                <Settings size={16} onClick={() => setLabelManagementFlag(true)} />
              </div>
            </div>
            <Select
              isMulti
              value={labels}
              id="task-labels"
              isClearable={false}
              options={labelOptions}
              className="react-select"
              classNamePrefix="select"
              theme={selectThemeColors}
              components={{ Option: LabelOptions }}
              onChange={(data) => {
                setLabels(data !== null ? [...data] : []);
              }}
            />
          </div>
          <div>
            <Label>Amount</Label>
            <Input name="Account" placeholder="Account" />
          </div>
          <div>
            <Label>Note</Label>
            <Input name="Note" placeholder="Note" />
          </div>
          <div>
            <Upload />
          </div>
          <div className="d-flex justify-content-end">
            <Button onClick={() => setOpen(false)} className="m-1" outline color="primary">
              Cancle
            </Button>
            <Button onClick={handleOpen} className="m-1" color="primary">
              Save
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddExpense;

// ** React Imports
import { useState, useEffect } from 'react';

// ** Reactstrap Imports
import { Badge, Modal, ModalBody, Button, Form, Input, Label, FormFeedback } from 'reactstrap';

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux';

// ** Third Party Components
import Flatpickr from 'react-flatpickr';
import { useDropzone } from 'react-dropzone';
import { X, DownloadCloud, Settings, Sliders } from 'react-feather';
import Select, { components } from 'react-select'; //eslint-disable-line
import { useForm, Controller } from 'react-hook-form';
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Actions
import { updateTask, handleSelectTask } from './store';
import { getSelectedWorkspaceData } from '../workspace/store';
import { contactListRequest } from '../../contacts/employee/store/actions';

// ** Utils
import { isObjEmpty, selectThemeColors } from '@utils';

// ** Child Componets
import LabelManagementModal from '../../tasks/label-management/LabelManagementModal';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Styles Imports
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/file-uploader/file-uploader.scss';

// ** Assignee Select Options
const assigneeOptions = [
  // { value: 'Pheobe Buffay', label: 'Pheobe Buffay', img: img1 },
  // { value: 'Chandler Bing', label: 'Chandler Bing', img: img2 },
  // { value: 'Ross Geller', label: 'Ross Geller', img: img3 },
  // { value: 'Monica Geller', label: 'Monica Geller', img: img4 },
  // { value: 'Joey Tribbiani', label: 'Joey Tribbiani', img: img5 },
  // { value: 'Rachel Green', label: 'Rachel Green', img: img6 },
  // { value: 'Jerry Seinfeld', label: 'Jerry Seinfeld', img: img3 },
  // { value: 'Jerry Seinfeld', label: 'Jerry Seinfeld', img: img3 },
  // { value: 'Astro Kramer', label: 'Astro Kramer', img: img2 },
  // { value: 'George Costanza', label: 'George Costanza', img: img5 },
  // { value: 'Charlie Kelly', label: 'Charlie Kelly', img: img4 },
  // { value: 'Dennis Reynolds', label: 'Dennis Reynolds', img: img3 }
];

// ** Label Select Options
// const labelOptions = [
//   { value: 'UX', label: 'UX' },
//   { value: 'App', label: 'App' },
//   { value: 'Forms', label: 'Forms' },
//   { value: 'Images', label: 'Images' },
//   { value: 'Code Review', label: 'Code Review' },
//   { value: 'Charts & Maps', label: 'Charts & Maps' }
// ];

const TaskSidebar = (props) => {
  // ** Props
  const { sidebarOpen, labelColors, selectedTask, store, handleTaskSidebarToggle } = props;

  // const store = useSelector((state) => state.workspace);

  // ** State
  const [desc, setDesc] = useState('');
  const [files, setFiles] = useState([]);
  const [uploadData, setUploadData] = useState(null);

  const [labels, setLabels] = useState([]);
  const [dueDate, setDueDate] = useState(new Date());
  const [assignedTo, setAssignedTo] = useState(null);

  const [labelManagementFlag, setLabelManagementFlag] = useState(false);
  // ** Hooks
  const dispatch = useDispatch();
  const { employeeList } = useSelector((state) => state.employeeContact);

  const renderClient = (row) => {
    let tmpValue = 0;
    Array.from(row?.value).forEach((x, index) => {
      tmpValue += x.codePointAt(0) * (index + 1);
    });
    const stateNum = tmpValue % 6,
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];

    if (row?.img) {
      return <Avatar className="me-1" img={row.img} width="32" height="32" />;
    } else {
      return (
        <Avatar
          color={color || 'primary'}
          className="me-1"
          content={row.value || 'John Doe'}
          initials
        />
      );
    }
  };

  useEffect(() => {
    dispatch(
      contactListRequest({
        page: 1,
        pageSize: 100,
        text: ''
      })
    );
  }, [dispatch]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles([...acceptedFiles.map((file) => Object.assign(file))]);
    }
  });

  const {
    control,
    setError,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { title: '' }
  });
  // const labelColorData = store
  //   ? () => {
  //      const data={};
  //       for(let i = 0; i < store.labels?.length; i++){
  //          const { title, color } = store.labels[i];
  //          data[title] = color;
  //       };
  //       return data;
  //     }
  //   : null;
  // ** Custom Select Components
  const LabelOptions = ({ data, ...props }) => {
    // const labelColorData={};
    //  for(let i = 0; i < store.labels?.length; i++){
    //     const { title, color } = store.labels[i];
    //     labelColorData[title] = color;
    //  };
    return (
      <components.Option {...props}>
        <Badge color={labelColors[data.label]}>{data.label}</Badge>
      </components.Option>
    );
  };

  const labelOptions = store
    ? store.labels?.map((label) => {
        return { value: label.title, label: label.title };
      })
    : null;
  const assigneeOptions = employeeList.data
    ? employeeList.data.list.map((employee) => {
        return { value: employee.fullName, label: employee.fullName, img: employee.photo };
      })
    : null;

  const AssigneeComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          {renderClient(data)}
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };

  // ** Function to run when sidebar opens
  const handleSidebarOpened = () => {
    if (!isObjEmpty(selectedTask)) {
      setValue('title', selectedTask.title);
      setDueDate(selectedTask.dueDate);
      setDesc(selectedTask.description);
      if (selectedTask.coverImage) {
        setFiles([selectedTask.coverImage]);
      }
      if (selectedTask.assignedTo.length) {
        const arr = [];
        selectedTask.assignedTo.map((assignee) => {
          arr.push({ value: assignee.title, label: assignee.title, img: assignee.img });
        });
        setAssignedTo(arr);
      }
      if (selectedTask.labels.length) {
        const labelsArr = [];
        selectedTask.labels.map((label) => {
          labelsArr.push({ value: label, label });
        });
        setLabels(labelsArr);
      }
    }
  };

  // ** Function to run when sidebar closes
  const handleSidebarClosed = () => {
    setDesc('');
    setFiles([]);
    setLabels([]);
    setValue('title', '');
    setDueDate(new Date());
    clearErrors();
    dispatch(handleSelectTask({}));
    setAssignedTo(null);
  };

  const onSubmit = (data) => {
    if (data.title.length) {
      const labelsArr = [];
      const assignedArr = [];

      if (assignedTo !== null) {
        assignedTo.map((item) => {
          assignedArr.push({ title: item.label, img: item.img });
        });
      }

      if (labels !== []) {
        labels.map((label) => {
          labelsArr.push(label.label);
        });
      }
      const postData = new FormData();
      postData.append('selectedTask', JSON.stringify(selectedTask));
      postData.append('data', JSON.stringify(data));
      postData.append('dueDate', dueDate);
      postData.append('labels', labelsArr);
      postData.append('description', desc);
      postData.append('assignedTo', JSON.stringify(assignedArr));
      postData.append('file', files[0]);

      if (files.length && typeof files[0] !== 'string' && files[0].path !== undefined) {
        postData.append('coverImage', URL.createObjectURL(files[0]));
      }
      dispatch(updateTask(postData)).then(() => {
        dispatch(getSelectedWorkspaceData(store.selectedWorkspace._id));
      });
      handleTaskSidebarToggle();
    } else {
      setError('title');
    }
  };

  const renderUploadedImage = () => {
    if (files.length && typeof files[0] !== 'string') {
      // @ts-ignore
      return files.map((file) => (
        <img
          key={file.name}
          alt={file.name}
          className="single-file-image img-fluid"
          src={file.path !== undefined ? URL.createObjectURL(file) : URL.revokeObjectURL(file)}
        />
      ));
    } else {
      if (typeof files[0] === 'string') {
        return <img alt="task-img" className="single-file-image img-fluid" src={files[0]} />;
      }
    }
  };

  const handleResetFields = () => {
    setDesc('');

    setValue('title', store.selectedTask.title);
    setDueDate(store.selectedTask.dueDate);
    if (selectedTask.assignedTo.length) {
      const arr = [];
      selectedTask.assignedTo.map((assignee) => {
        arr.push({ value: assignee.title, label: assignee.title, img: assignee.img });
      });

      setAssignedTo(arr);
    }
    if (selectedTask.labels.length) {
      const labels = [];
      selectedTask.labels.map((label) => {
        labels.push({ value: label, label });
      });
      setLabels(labels);
    }

    if (selectedTask.coverImage) {
      setFiles([selectedTask.coverImage]);
    } else {
      setFiles([]);
    }
  };

  return (
    <>
      <LabelManagementModal
        modalFlag={labelManagementFlag}
        setModalFlag={setLabelManagementFlag}
        store={store}
      />
      <Modal
        isOpen={sidebarOpen}
        className="sidebar-lg"
        contentClassName="p-0"
        onOpened={handleSidebarOpened}
        onClosed={handleSidebarClosed}
        toggle={handleTaskSidebarToggle}
        modalClassName="modal-slide-in sidebar-kanban-modal"
      >
        <Form
          id="form-modal-kanban"
          className="kanban-task-modal"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="modal-header d-flex align-items-center justify-content-between mb-1">
            <h5 className="modal-title">Update Task</h5>
            <X className="fw-normal mt-25" size={16} onClick={handleTaskSidebarToggle} />
          </div>
          <PerfectScrollbar options={{ wheelPropagation: false }}>
            <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
              <div className="mb-1">
                <Label className="form-label" for="task-title">
                  Title <span className="text-danger">*</span>
                </Label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="task-title"
                      placeholder="Title"
                      className="new-todo-item-title"
                      invalid={errors.title && true}
                      {...field}
                    />
                  )}
                />
                {errors.title && <FormFeedback>Please enter a valid task title</FormFeedback>}
              </div>
              <div className="mb-1">
                <Label className="form-label" for="due-date">
                  Due Date
                </Label>
                <Flatpickr
                  id="due-date"
                  name="due-date"
                  value={dueDate}
                  mindate={'today'}
                  className="form-control"
                  options={{ dateFormat: 'm-d-Y', minDate: 'today' }}
                  onChange={(date) => setDueDate(date[0])}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="task-labels">
                  Labels
                </Label>
                <Settings
                  size={16}
                  className="me-25"
                  style={{ float: 'right', cursor: 'pointer' }}
                  onClick={() => setLabelManagementFlag(true)}
                />
                {/* <Button  outline color="primary" size="sm" >
              </Button>*/}
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
              <div className="mb-1">
                <Label className="form-label" for="task-assignee">
                  Assignee
                </Label>
                <Select
                  isMulti
                  id="task-assignee"
                  value={assignedTo}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={assigneeOptions}
                  theme={selectThemeColors}
                  onChange={(data) => setAssignedTo(data)}
                  components={{ Option: AssigneeComponent }}
                />
              </div>
              <div className="mb-1">
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <div className="d-flex align-items-center justify-content-center flex-column text-center">
                    <DownloadCloud size={64} />
                    <h5>Drop Files here or click to upload</h5>
                  </div>
                  {files.length ? renderUploadedImage() : null}
                </div>
              </div>
              <div className="mb-1">
                <Label className="form-label" for="task-desc">
                  Description
                </Label>
                <Input
                  type="textarea"
                  value={desc}
                  name="text"
                  id="task-desc"
                  rows="3"
                  placeholder="Description..."
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <div>
                <Button type="submit" color="primary" className="me-1">
                  Update
                </Button>
                <Button outline color="secondary" onClick={handleResetFields}>
                  Reset
                </Button>
              </div>
            </ModalBody>
          </PerfectScrollbar>
        </Form>
      </Modal>
    </>
  );
};

export default TaskSidebar;

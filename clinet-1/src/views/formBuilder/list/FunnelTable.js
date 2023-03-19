import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, Eye } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useHistory } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs';
import { Button } from 'reactstrap';

export default function FunnelTable({ store, active }) {
  // ** STATES
  const [tableData, setTableData] = useState(null);

  const history = useHistory()

  // ** FUNCTIONS
  const handleSetData = (e)=>{

  }

  const handleDetails = (row) =>{
    history.push('/form-funnel/form-setting/'+row._id)
  }

  // ** Load initial Data
  useEffect(() => {
    if (store?.funnels) {
      switch (active) {
        case '1':
            setTableData(store?.funnels);
          break;
        case '2':
            setTableData(store?.favorites);
          break;
        case '3':
            setTableData(store?.funnels?.filter(x=>x?.status==='archived'));
          break;
        case '4':
            setTableData(store?.funnels?.filter(x=>x?.status==='removed'));
          break;

        default:
            setTableData(store?.funnels);
          break;
      }
      
    }
  }, [store]);

const columns = [
  // {
  //   name: 'Form',
  //   sortable: 'true',
  //   selector: (row) => row._id, // show snapshot of form
  // },
  {
    name: 'Form Name',
    sortable: 'true',
    selector: (row) => row.name,
  },
  {
    name: 'Type',
    sortable: 'true',
    selector: (row) => row.formType,
  },
  {
    name: 'Category',
    sortable: 'true',
    selector: (row) => row.subCategory,
  },
  {
    name: 'Is Automated',
    selector: (row) => row.automateEntry,
    cell: (row) => <span>{row.automateEntry ? 'Yes':'No'}</span>,
  },
  {
    name: 'Member Type',
    selector: (row) => row.memberType,
  },
  {
    name: 'Smart list',
    selector: (row) => row.smartList,
  },
  {
    name: 'Status',
    selector: (row) => row.status,
  },
  {
    name: 'Action',
    selector: (row) => row._id,
    cell:(row) => (<>
    <Button color='link' onClick={()=>handleDetails(row)}>
      <Eye/>
    </Button>
    </>)
  },
]
  return (
    <div className="task-application">
      <div className="content-body">
        <PerfectScrollbar
          className="list-group task-task-list-wrapper"
          options={{ wheelPropagation: false }}
          containerRef={(ref) => {
            if (ref) {
              ref._getBoundingClientRect = ref.getBoundingClientRect;

              ref.getBoundingClientRect = () => {
                const original = ref._getBoundingClientRect();

                return {
                  ...original,
                  height: Math.floor(original.height)
                };
              };
            }
          }}
        >
          {tableData && tableData?.length ? (
            <ReactSortable
            tag="ul"
            list={tableData}
            handle=".drag-icon"
            className="task-task-list media-list"
            setList={(newState) => handleSetData(newState)}
            overFlow="auto"
          >
            <DataTable
              className="react-dataTable"
              responsive
              data={tableData}
              style={{ cursor: 'pointer' }}
              sortIcon={<ChevronDown size={14} />}
              columns = {columns}
            />
          </ReactSortable>
          ):(
            <div className="no-results show mx-auto">
            <h5>No Items Found</h5>
          </div>
          )}
        </PerfectScrollbar>
      </div>
    </div>
  );
}

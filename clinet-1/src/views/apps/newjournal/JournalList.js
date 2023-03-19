import React, { useState } from 'react';
import Buyimg from '../../../assets/img/card-img-overlay.jpg';
import Select from 'react-select';
import { Input } from 'reactstrap';
import JournalCalender from './JournalCalender';
import { Link } from 'react-router-dom';
export default function JournalList() {
  const [viewType, setViewType] = useState('List View');

  const handleViewType = (e) => {
    setViewType(e.target.value);
  };
  return (
    <div>
      {/* <Select
        // onChange={handleChange}
        className="React customSelect"
        classNamePrefix="select"
        // defaultValue={colourOptions[1]}
        name="color"
        options={colourOptions}
      /> */}
      <Input type="select" onChange={handleViewType} value={viewType}>
        <option value="List View">List View</option>
        <option value="Calendar View">Calendar View</option>
      </Input>

      {viewType === 'List View' ? (
        <>
          <div className="d-flex jour-1">
            <div className="jour-lf">
              <p className="dayofcard">Tue </p>
              <h2 className="dateincard">19</h2>
            </div>
            <div className="jour-md">
              <h5>What is journal?</h5>
              <p className="">The articles are about a particular subject </p>
              <p className="">04:32 PM IST New Delhi India</p>
            </div>
            <div className="jour-rg">
              <img src={Buyimg} className="app-img" alt="" />
            </div>
          </div>
          <div className="d-flex jour-1">
            <div className="jour-lf">
              <p className="dayofcard">Tue </p>
              <h2 className="dateincard">19</h2>
            </div>
            <div className="jour-md">
              <h5>What is journal?</h5>
              <p className="">The articles are about a particular subject </p>
              <p className="">04:32 PM IST New Delhi India</p>
            </div>
            <div className="jour-rg">
              <img src={Buyimg} className="app-img" alt="" />
            </div>
          </div>
          <div className="d-flex jour-1">
            <div className="jour-lf">
              <p className="dayofcard">Tue </p>
              <h2 className="dateincard">19</h2>
            </div>
            <div className="jour-md">
              <h5>What is journal?</h5>
              <p className="">The articles are about a particular subject </p>
              <p className="">04:32 PM IST New Delhi India</p>
            </div>
            <div className="jour-rg">
              <img src={Buyimg} className="app-img" alt="" />
            </div>
          </div>
        </>
      ) : (
        <>
          <JournalCalender />
        </>
      )}
    </div>
  );
}

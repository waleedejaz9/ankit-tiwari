import React, { memo, useEffect, useState } from 'react';
import { Badge, CardText, ListGroup } from 'reactstrap';
// ** Custom Components
import Avatar from '@components/avatar';
import { useDispatch } from 'react-redux';
import { activeTextContacts } from '../store';
import { formatDateToMonthShort } from '../../../../utility/Utils';

function UserChatList({ query, filteredContacts, store }) {
  const dispatch = useDispatch();
  const { contacts } = store;
  const [arrayOne, setArrayOne] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    contacts.map((item) => {
      if (item.unReadMessages === 0) {
        setArrayOne((arrayOne) => [...arrayOne, false]);
      } else {
        setArrayOne((arrayOne) => [...arrayOne, true]);
      }
    });
  }, [contacts]);

  useEffect(() => {
    setSelectedItem(null); // reset selected item when contacts change
  }, [contacts]);

  const UserChatActivity = async (event, Info, index) => {
    dispatch(activeTextContacts(Info));
  };
  const updateArray = (index) => {
    setSelectedItem(index);
    const newArray = [...arrayOne];
    newArray[index] = false;
    setArrayOne(newArray);
  };
  if (contacts && contacts.length) {
    if (query.length && !filteredContacts.length) {
      return (
        <div className="no-results show">
          <h6 className="mb-0">No Chats Found</h6>
        </div>
      );
    } else {
      const arrToMap = query.length && filteredContacts.length ? filteredContacts : contacts;

      return arrToMap.map((item, index) => {
        const time = formatDateToMonthShort(item.lastMessage?.createdAt || new Date());

        return (
          <>
            <ListGroup className="m-0 p-0">
              <div
                key={item.fullName}
                className={`w-100 p-1 gap-1 d-flex align-items-center ${
                  selectedItem === index ? 'chatSelect' : ''
                }`}
                onClick={(event) => {
                  UserChatActivity(event, {
                    fullName: item?.fullName,
                    email: item?.email,
                    uid: item?._id,
                    phone: item?.phone
                  });
                  updateArray(index);
                }}
              >
                {item.photo ? (
                  <Avatar img={item.photo} imgHeight="32" imgWidth="32" status="online" />
                ) : (
                  <Avatar
                    color="primary"
                    imgHeight="32"
                    imgWidth="32"
                    status="online"
                    content={item.fullName.charAt(0).toUpperCase() || 'N/A'}
                  />
                )}
                <div className="chat-info flex-grow-1 width-40-per">
                  <h5 className="mb-0">{item.fullName}</h5>
                  <CardText className="text-truncate">{item.lastMessage?.textContent}</CardText>
                </div>
                <div className="chat-meta text-nowrap">
                  <small className="float-end mb-25 chat-time ms-25">{time}</small>
                  {arrayOne[index] === true ? (
                    <Badge className="float-end" color="danger" pill>
                      {item.unReadMessages}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </ListGroup>
          </>
        );
      });
    }
  } else {
    return null;
  }
}

export default memo(UserChatList);

import React, { memo, useState, useEffect } from 'react';
import { Alert, CardText } from 'reactstrap';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { getMessageContacts } from '../store';
import { formatDateToMonthShort, formatToShortName } from '../../../../utility/Utils';
import Avatar from '@components/avatar';
import classnames from 'classnames';

function ChatRoom() {
  const dispatch = useDispatch();

  const { ActiveContact, messages } = useSelector((state) => state.text);

  const [getMessages, setMessages] = useState([]);
  const [dayWiseData, setDayWiseData] = useState([]);
  const chatContainer = React.createRef(null);

  useEffect(() => {
    dispatch(getMessageContacts(ActiveContact?.uid));
  }, [ActiveContact]);

  useEffect(() => {
    chatContainer.current.scrollIntoView();
  }, [getMessages]);

  let scrollToBottom = () => {
    const section = document.querySelector('#last_message');
    const scroll = chatContainer.current.scrollHeight - chatContainer.current.clientHeight;
    chatContainer.current.scrollTo(0, scroll);
    if (section) {
      section.scrollIntoView({ overscrollBehavior: 'none' });
    }
  };
  useEffect(() => {
    scrollToBottom();
  });

  useEffect(() => {
    setMessages(messages);
  }, [messages]);

  const getModifiedData = () => {
    let modifiedData = [];

    if (messages?.length > 0) {
      let time = messages[0]['time'];
      let list = [moment(time).format('MM/DD/YYYY')];
      
      
      for (let message of messages) {
        if (moment(message?.time).format('MM/DD/YYYY') !== moment(time).format('MM/DD/YYYY')) {
          time = moment(message?.time).format('MM/DD/YYYY');
          list.push(time);
        }
      }

      let uniqueChars = [...new Set(list)];

      for (var date of uniqueChars) {
        const filteredData = messages.filter(
          (item) => date === moment(item?.time).format('MM/DD/YYYY')
        );

        modifiedData.push({ time: date, messages: filteredData });
      }
    }

    setDayWiseData(modifiedData);
  };

  useEffect(() => {
    getModifiedData();
  }, [messages]);

  return (
    <div
      style={{
        overflowY: 'scroll',
        overflowX: 'hidden'
      }}
      id={'chats'}
      className="chats"
    >
      <div>
        <div className="chatsMsg">
          {ActiveContact &&
            messages.length > 0 &&
            dayWiseData?.map((chat, index) => {
              //const time = formatDateToMonthShort(chat ? chat.createdAt : new Date());

              return (
                <div
                  key={index}
                  className={classnames('chat', {
                    'chat-right': true
                  })}
                >
                  <div className="chat-avatar">
                    {ActiveContact.photo ? (
                      <Avatar
                        imgWidth={36}
                        imgHeight={36}
                        className="box-shadow-1 cursor-pointer"
                        img={ActiveContact.photo || null}
                        status="online"
                        color="primary"
                      />
                    ) : (
                      <Avatar
                        imgWidth={36}
                        imgHeight={36}
                        className="box-shadow-1 cursor-pointer"
                        status="online"
                        color="primary"
                        content={formatToShortName(ActiveContact.fullName || '')}
                      />
                    )}
                  </div>

                  <div className="chat-body">
                    {chat.messages.map((chat) => (
                      <div key={chat._id} className="chat-content">
                        <p>{chat.textContent}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div ref={chatContainer} id={'last_message'} />
    </div>
  );
}

export default memo(ChatRoom);

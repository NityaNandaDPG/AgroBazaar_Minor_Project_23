import ChatOnline from "../../components/chatOnline/ChatOnline"
import Conversation from "../../components/conversations/Conversations"
import Message from "../../components/message/Message"
import "./messenger.css"
import React from 'react'

export function Messenger() {

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
            <input placeholder="Search for farmers" className="chatMenuInput" />
            <Conversation/>
            <Conversation/>
            <Conversation/>
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
            <div className="chatBoxTop">
                <Message/>       
                <Message own={true}/>
                <Message/>        
            </div>
            <div className="chatBoxBottom">
              <textarea  className="chatMessageInput " placeholder="Write Something..."></textarea>
              <button className="chatSubmitButton">Send</button>
            </div>
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
            <ChatOnline/>
        </div>
      </div>
    </div>
  )
}

export default Messenger

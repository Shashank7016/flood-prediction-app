import React, { useState } from 'react';
import { Button, Drawer, Input, List } from 'antd';
import { Comment } from '@ant-design/compatible';
import './FAQ.module.css';
import './Chatbot.css';

const ChatBot = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: 'user' }];
      const response = generateResponse(input);
      setMessages([...newMessages, { text: response, sender: 'bot' }]);
      setInput('');
    }
  };

  const generateResponse = (input) => {
    // Placeholder for response logic
    return "This is a placeholder response.";
  };

  return (
    <>
      <Button className="chatbot-container"
      type="primary" onClick={showDrawer}>
        Chat with us
      </Button>
      <Drawer
        title="Flood Info ChatBot"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={350}
      >
        <List
          dataSource={messages}
          renderItem={item => (
            <List.Item>
              <Comment
                author={item.sender === 'user' ? 'You' : 'ChatBot'}
                content={<p>{item.text}</p>}
              />
            </List.Item>
          )}
        />
        <Input.Search
          value={input}
          onChange={handleInputChange}
          enterButton="Send"
          onSearch={handleSend}
        />
      </Drawer>
    </>
  );
};

export default ChatBot;

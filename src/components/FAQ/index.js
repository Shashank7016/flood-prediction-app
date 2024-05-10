import React, { useState } from 'react';
import { Collapse, Input } from 'antd';
import './FAQ.module.css'; // Import the CSS module for styling
import ChatBot from './ChatBot';
const { Panel } = Collapse;
const { Search } = Input;

const faqData = [
  {
    title: "Pre-Flood FAQs",
    faqs: [
      // FAQs data...
    ]
  },
  {
    title: "During-Flood FAQs",
    faqs: [
      // FAQs data...
    ]
  },
  {
    title: "Post-Flood FAQs",
    faqs: [
      // FAQs data...
    ]
  }
];

const FAQ = () => {
  const [searchText, setSearchText] = useState('');

  const onSearch = value => {
    setSearchText(value);
  };

  let filteredFAQs = faqData.flatMap(section =>
    section.title.toLowerCase().includes(searchText.toLowerCase()) ? section.faqs : []
  );

  return (
    <div className="faq-centering-wrapper">
      <div className="faq-container">
        <div style={{ marginBottom: '20px' }}>
          <h1>Frequently Asked Questions</h1>
          <p>Here are responses to common questions, covering various topics including the industries we serve and the locations we provide coverage in.</p>
        </div>
        <h2>For the Flood App</h2>
        <Search
          placeholder="Search for a question"
          allowClear
          onSearch={onSearch}
          style={{ width: 300, marginBottom: 20 }}
        />
        
        {searchText === '' ? (
          faqData.map((section, index) => (
            <div key={index} className="faq-section">
              <h2>{section.title}</h2>
              <Collapse accordion>
                {section.faqs.map((faq, idx) => (
                  <Panel header={faq.question} key={idx}>
                    <p>{faq.answer}</p>
                  </Panel>
                ))}
              </Collapse>
            </div>
          ))
        ) : (
          <div className="faq-section">
            <h2>{searchText}</h2>
            <Collapse accordion>
              {filteredFAQs.map((faq, idx) => (
                <Panel header={faq.question} key={idx}>
                  <p>{faq.answer}</p>
                </Panel>
              ))}
            </Collapse>
          </div>
        )}
      </div>
      <ChatBot />
    </div>
  );
};

export default FAQ;

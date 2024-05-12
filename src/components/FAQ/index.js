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
      {
        question: "What should I do to prepare for a flood?",
        answer: "To prepare for a flood, you should create an emergency kit, develop an evacuation plan, and secure your property by elevating valuables and sealing entry points."
      },
      {
        question: "Is flood insurance necessary?",
        answer: "Flood insurance is highly recommended, especially if you live in a flood-prone area. It can help protect your property and belongings in case of flood damage."
      }
    ]
  },
  {
    title: "During-Flood FAQs",
    faqs: [
      {
        question: "What should I do if a flood occurs while I'm at home?",
        answer: "If a flood occurs while you're at home, prioritize your safety. Move to higher ground if possible, and avoid walking or driving through floodwaters."
      },
      {
        question: "How can I stay informed during a flood?",
        answer: "Stay tuned to local news and weather updates for flood warnings and evacuation orders. Follow the instructions of emergency services and evacuate if necessary."
      }
    ]
  },
  {
    title: "Post-Flood FAQs",
    faqs: [
      {
        question: "What should I do after a flood?",
        answer: "After a flood, assess the damage to your property and prioritize safety. Document the damage for insurance claims, and begin cleanup and restoration efforts."
      },
      {
        question: "Is it safe to enter a flooded area after the water recedes?",
        answer: "It's important to wait until authorities declare the area safe before returning. Floodwaters can contain contaminants and pose health risks."
      }
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

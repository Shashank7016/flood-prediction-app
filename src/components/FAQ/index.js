import React, { useState } from 'react';
import { Collapse, Input } from 'antd';
import './FAQ.module.css'; // Import the CSS module for styling
import ChatBot from './ChatBot';
const { Panel } = Collapse;
const { Search } = Input;

const faqData = [
  {
    title: 'Pre-Flood FAQs',
    faqs: [
      {
        question:
          'How can I stay informed about potential floods and take preventive measures before they occur?',
        answer:
          'Stay informed by monitoring weather forecasts, flood alerts, and warnings from local authorities.',
      },
      {
        question:
          'What actions should I take before a flood to prepare my home and ensure the safety of my family?',
        answer:
          'Develop a family emergency plan that includes evacuation routes, designated meeting points, and contact information for local authorities.',
      },
      {
        question:
          'Are there any evacuation routes or shelters designated in my area, and how can I access this information?',
        answer:
          'Contact local authorities or emergency management agencies to inquire about designated evacuation routes and shelters in your area.',
      },
      {
        question:
          'What emergency supplies should I have ready before a flood, and where can I obtain them?',
        answer:
          'Emergency supplies may include non-perishable food, water, medications, first aid kits, flashlights, batteries, blankets, and personal hygiene items.',
      },
      {
        question:
          'What steps should I take to protect my garden, crops, and agricultural equipment from flood damage?',
        answer:
          'Harvest ripe fruits and vegetables and secure or relocate equipment to higher ground.',
      },
      {
        question:
          'Are there any measures I can take to reinforce my home or property against potential floodwaters?',
        answer:
          'Install flood barriers, such as sandbags or flood panels, around doors, windows, and other vulnerable openings.',
      },
      {
        question:
          'How can I safeguard electrical appliances and utilities to minimize potential damage during a flood?',
        answer:
          'Elevate electrical appliances and utilities above potential flood levels or install flood-proofing measures.',
      },
      {
        question:
          'What should I do if I live in a mobile home or temporary shelter during a flood, and how can I ensure my safety?',
        answer:
          'Evacuate mobile homes or temporary shelters before a flood and seek safer accommodations.',
      },
      {
        question:
          'How can I prepare my vehicle for potential flooding, and what precautions should I take if I need to evacuate?',
        answer:
          'Park vehicles in elevated areas or garages to minimize flood damage.',
      },
      {
        question:
          'How can I stay connected with family members and loved ones during a flood, and what communication devices should I have on hand?',
        answer:
          'Establish communication channels such as phone trees, social media, and messaging apps to stay in touch with family members and loved ones.',
      },
    ],
  },
  {
    title: 'During-Flood FAQs',
    faqs: [
      {
        question:
          "What should I do if a flood occurs while I'm at home, and how can I ensure my safety?",
        answer:
          'Stay calm and prioritize your safety. If necessary, evacuate to higher ground or the highest level of your home.',
      },
      {
        question:
          'How can I stay informed about flood warnings and evacuation orders during a flood event?',
        answer:
          'Stay tuned to local news sources, radio, or television for updates and instructions from local authorities.',
      },
      {
        question:
          'Should I evacuate my home, and if so, what steps should I take to evacuate safely?',
        answer:
          'Follow evacuation orders issued by local authorities and evacuate to designated shelters or higher ground if necessary.',
      },
      {
        question:
          'Is it safe to drive or walk through flooded streets or areas, and what precautions should I take if I need to travel?',
        answer:
          'Avoid driving or walking through flooded streets or areas, as they may be hazardous and contain unseen dangers such as debris and strong currents.',
      },
      {
        question:
          'How can I protect myself and my family from health risks associated with floodwaters and debris?',
        answer:
          'Avoid contact with floodwaters if possible, as they may be contaminated with sewage, chemicals, and other hazardous materials.',
      },
      {
        question:
          'What should I do if I become trapped or stranded during a flood, and how can I signal for help?',
        answer:
          'Stay calm and call for help if you become trapped or stranded during a flood.',
      },
    ],
  },
  {
    title: 'Post-Flood FAQs',
    faqs: [
      {
        question:
          'Once the floodwaters recede, what steps should I take to assess damage and begin the recovery process?',
        answer:
          'Assess the damage to your property and prioritize cleanup and repairs.',
      },
      {
        question:
          'How can I safely return home after a flood, and what precautions should I take when re-entering my property?',
        answer:
          'Wait until authorities deem it safe to return home before re-entering your property.',
      },
      {
        question:
          'Are there any health risks associated with exposure to floodwaters and debris, and how can I protect myself and my family?',
        answer:
          'Be aware of health risks associated with exposure to floodwaters, including contamination by sewage, chemicals, and other hazardous materials.',
      },
      {
        question:
          'What resources are available for post-flood cleanup and recovery assistance, such as debris removal or financial aid?',
        answer:
          'Contact local government agencies, disaster relief organizations, or community groups for assistance with cleanup, repairs, and financial aid.',
      },
      {
        question:
          'Should I receive any vaccinations after a flood to prevent the spread of diseases, and where can I access vaccination services?',
        answer:
          'Consult with healthcare providers or local health departments to determine if vaccinations are recommended after a flood.',
      },
      {
        question:
          'How can pesticides be used effectively to control pests and vectors following a flood, and what precautions should I take when using them?',
        answer:
          'Follow guidelines for safe and effective pesticide use, including selecting appropriate products and applying them according to label instructions.',
      },
    ],
  },
];

const FAQ = () => {
  const [searchText, setSearchText] = useState('');
  const [foundSection, setFoundSection] = useState(null);
  const [foundQuestion, setFoundQuestion] = useState(null);

  const onSearch = (value) => {
    setSearchText(value.toLowerCase());
    const foundQuestion = faqData
      .flatMap((section) => section.faqs)
      .find((faq) => faq.question.toLowerCase().includes(value.toLowerCase()));

    if (foundQuestion) {
      setFoundQuestion(foundQuestion);
      const sectionContainingQuestion = faqData.find((section) =>
        section.faqs.includes(foundQuestion)
      );
      setFoundSection(sectionContainingQuestion);
    } else {
      const foundSection = faqData.find((section) =>
        section.title.toLowerCase().includes(value.toLowerCase())
      );
      setFoundSection(foundSection);
      setFoundQuestion(null);
    }
  };

  return (
    <div
      className='faq-centering-wrapper'
      style={{
        margin: '0 auto',
        width: '80%',
        marginTop: '30px',
        paddingBottom: '100px',
      }}
    >
      <div className='faq-container'>
        <div style={{ marginBottom: '20px' }}>
          <h1>Frequently Asked Questions</h1>
          <p>
            Here are responses to common questions, covering various topics
            including the industries we serve and the locations we provide
            coverage in.
          </p>
        </div>
        <h2>Search for the FAQs</h2>
        <Search
          placeholder='Search for a question'
          allowClear
          onSearch={onSearch}
          style={{ width: 500, marginBottom: 20 }}
        />

        {searchText === '' &&
        foundQuestion === null &&
        foundSection === null ? (
          faqData.map((section, index) => (
            <div key={index} className='faq-section'>
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
        ) : foundQuestion ? (
          <div className='faq-section'>
            <h2>{foundSection.title}</h2>
            <Collapse accordion>
              <Panel header={foundQuestion.question} key={0}>
                <p>{foundQuestion.answer}</p>
              </Panel>
            </Collapse>
          </div>
        ) : foundSection ? (
          <div className='faq-section'>
            <h2>{foundSection.title}</h2>
            <Collapse accordion>
              {foundSection.faqs.map((faq, idx) => (
                <Panel header={faq.question} key={idx}>
                  <p>{faq.answer}</p>
                </Panel>
              ))}
            </Collapse>
          </div>
        ) : (
          <p>Item not found</p>
        )}
      </div>
      <ChatBot />
    </div>
  );
};

export default FAQ;

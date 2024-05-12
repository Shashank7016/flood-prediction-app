import React from 'react';
import { Collapse } from 'antd';
import './Chatbot.css';  // Import the CSS module for styling
import ChatBot from './ChatBot';
const { Panel } = Collapse;

const faqData = [
  {
    title: "Pre-Flood FAQs",
    faqs: [
      {
        question: "How can I stay informed about potential floods and take preventive measures before they occur?",
        answer: "Stay informed by monitoring weather forecasts and flood warnings from local authorities. Take preventive measures such as installing flood barriers, sealing basement walls, and elevating electrical appliances."
      },
      {
        question: "What actions should I take before a flood to prepare my home and ensure the safety of my family?",
        answer: "Develop a family emergency plan that includes evacuation routes, designated meeting points, and contact information for local authorities. Prepare an emergency kit with essential items such as non-perishable food, water, medications, flashlights, batteries, and important documents."
      },
      {
        question: "Are there any evacuation routes or shelters designated in my area, and how can I access this information?",
        answer: "Contact local authorities or emergency management agencies to inquire about designated evacuation routes and shelters in your area. Familiarize yourself with evacuation routes and shelter locations to ensure a safe evacuation if necessary."
      },
      {
        question: "Should I consider purchasing flood insurance, and where can I find information about coverage options?",
        answer: "Consider purchasing flood insurance to protect your property from flood-related damages. You can obtain information about coverage options from insurance providers or through the National Flood Insurance Program (NFIP)."
      },
      // Include other FAQs similarly
    ]
  },
  {
    title: "During-Flood FAQs",
    faqs: [
      // Define during-flood FAQs
      {
        question: "What should I do if a flood occurs while I'm at home, and how can I ensure my safety?",
        answer: "Stay calm and prioritize your safety. If necessary, evacuate to higher ground or the highest level of your home. Avoid walking or driving through floodwaters, as they may be deeper or faster-moving than they appear."
      },
    ]
  },
  {
    title: "Post-Flood FAQs",
    faqs: [
      // Define post-flood FAQs
      {
        question: "Once the floodwaters recede, what steps should I take to assess damage and begin the recovery process?",
        answer: "Assess the damage to your property and prioritize cleanup and repairs. Document the damage with photographs or videos for insurance claims and assistance applications."
      },
    ]
  }
];

const FAQ = () => {
  return (
    <div className="faq-container">
      {faqData.map((section, index) => (
        <div key={index}>
          <h2>{section.title}</h2>
          <Collapse accordion>
            {section.faqs.map((faq, idx) => (
              <Panel header={faq.question} key={idx}>
                <p>{faq.answer}</p>
              </Panel>
            ))}
          </Collapse>
        </div>
      ))}
      <ChatBot />
    </div>
  );
};

export default FAQ;
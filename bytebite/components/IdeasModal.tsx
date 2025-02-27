import React from 'react';

interface IdeasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IdeasModal: React.FC<IdeasModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Idea Generator</h2>
        <p>
          Use the <strong>Idea Generator</strong> to create a handful of unique recipe 
          suggestions based on ingredients you have or something you're craving. 
          Then, create full recipes of your favorite ideas with one click.
        </p>
        
        <div className="idea-input">
          <input 
            type="text" 
            placeholder="Enter ingredients or cravings..." 
          />
          <button className="generate-ideas-btn">Generate Ideas</button>
        </div>
        
        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          
          .modal-content {
            background-color: #fff9f5;
            padding: 30px;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            position: relative;
          }
          
          .close-button {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            background: none;
            color: #be0822;
            cursor: pointer;
          }
          
          h2 {
            color: #be0822;
            margin-bottom: 15px;
          }
          
          p {
            margin-bottom: 20px;
            line-height: 1.5;
          }
          
          .idea-input {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-top: 20px;
          }
          
          input {
            padding: 12px;
            border: 1px solid #fcd7d0;
            border-radius: 5px;
          }
          
          .generate-ideas-btn {
            background-color: #be0822;
            color: #fff9f5;
            padding: 12px;
            border-radius: 5px;
            font-weight: bold;
          }
        `}</style>
      </div>
    </div>
  );
};

export default IdeasModal;
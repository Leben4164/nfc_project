'use client' //client component 선언

import React, { useState } from 'react';
import { updateWhatHappened } from '../lib/github-db'; // github-db.ts에서 결석 사유 업데이트 함수 임포트

interface ReasonProps {
    students: Student[];
    onUpdateReason: (name: string, reason: string) => void;
}

export function Reason({ students, onUpdateReason }: ReasonProps) {
    const [studentName, setStudentName] = useState("");
    const [whatHappened, setWhatHappened] = useState("");

    const handleSubmit = () => {
        if (studentName && whatHappened) {
            onUpdateReason(studentName, whatHappened);
            setStudentName("");
            setWhatHappened("");
        }
    };

    return (
        <div className="reason-container">
            <h2 className="reason-title">결석 사유 입력</h2>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="이름을 입력해주세요"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="uid-input"
                />
                <input
                    type="text"
                    placeholder="결석 사유를 입력해주세요"
                    value={whatHappened}
                    onChange={(e) => setWhatHappened(e.target.value)}
                    className="uid-input"
                />
                <button onClick={handleSubmit} className="action-button">제출</button>
            </div>
        </div>
    );
}

const styles = `
  .reason-container {
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: 0 auto;
      padding: 35px;
  }

  .reason-title {
      color: #333;
      text-align: center;
      margin-bottom: 20px;
  }

  .input-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
  }

  .uid-input {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 200px;
  }

  .action-button {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
  }

  .action-button:hover {
      background-color: #45a049;
  }
`;

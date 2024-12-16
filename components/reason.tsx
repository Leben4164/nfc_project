'use client' //client component 선언

import React, { useState } from 'react';

export function Reason() {
    const [studentName, setStudentName] = useState("");
    const [whatHappened, setWhatHappened] = useState("");

    /**
     * 결석 사유 갱신 함수
     * 
     * input으로 입력받은 학생의 이름을 DB에 검색해서
     * 
     * 정보를 얻은 다음 밑의 input으로 입력받은 
     * 
     * 결석 사유를 위에서 판별한 학생의 결석 사유로 저장함
     */
    const updateWhatHappened = async () => {
        if (studentName === "") {
            alert('학생 이름을 입력해주세요.');
            return;
        }

        try {
            const response = await fetch('/api/happen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ studentName, whatHappened }),
            });

            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert(data.message);
            setStudentName(""); // 입력 필드 초기화
            setWhatHappened(""); // 입력 필드 초기화
        } catch (error) {
            console.error('Error updating what happened:', error);
            alert('결석 사유 업데이트 중 오류가 발생했습니다.');
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
                <button onClick={updateWhatHappened} className="action-button">제출</button>
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

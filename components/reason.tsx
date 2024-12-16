'use client' //client component 선언

import React, { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

// JSON 파일에서 데이터 읽기
const readData = () => {
    try {
        const dataBuffer = fs.readFileSync(dataFilePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        console.error('Error reading data:', error);
        return [];
    }
};

// JSON 파일에 데이터 쓰기
const writeData = (data: any) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2)); // JSON 파일에 저장
    } catch (error) {
        console.error('Error writing data:', error);
    }
};

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

        const students = readData(); // JSON 파일에서 학생 데이터 읽기
        const studentIndex = students.findIndex((student: { name: string; }) => student.name === studentName);

        if (studentIndex === -1) {
            alert('해당 이름의 학생을 찾을 수 없습니다.');
            return;
        }

        // 결석 사유 업데이트
        students[studentIndex].whatHappened = whatHappened; // 결석 사유 업데이트
        writeData(students); // JSON 파일에 저장

        alert('결석 사유가 업데이트 되었습니다.'); // 성공 메시지 표시
        setStudentName(""); // 입력 필드 초기화
        setWhatHappened(""); // 입력 필드 초기화
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

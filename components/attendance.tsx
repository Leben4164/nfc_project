"use client"

import { useState, useEffect } from 'react';
import PocketBase, { RecordModel } from 'pocketbase';

const th = {
    border: '1px solid black',
    padding: '8px',
}

const td: React.CSSProperties = {
    textAlign: 'center',
    border: '1px solid black',
    padding: '8px',
}

export function Attendance() {
    const [items, setItems] = useState<RecordModel[]>([]);
    const [error, setError] = useState<string | undefined>();
    const [uid, setUid] = useState("");
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

    const refresh = async () => {
        const response = await pb.collection('students').getList(1, 50, {
            sort: '+studentId',
        });
        setItems(response.items);
        console.log(response.items)
    }

    async function reset(): Promise<void> {
        try {
            for (const item of items) {
                await pb.collection('students').update(item.id, {
                    attendance: false,
                    attendanceTime: null,
                });
            }
        } catch (error) {
            console.error('출석 초기화 오류:', error);
            setError('출석을 초기화하는 중 오류가 발생했습니다.');
        }
        refresh();
    }

    async function updateAttendance() {
        console.log("검색한 UID:", uid);
        const now = new Date().toISOString();
        
        const record = await pb.collection('students').getFirstListItem(`uid="${uid}"`);
        if (record) {
            await pb.collection('students').update(record.id, {
                attendance: true,
                attendance_time: now,
            });
            
        }
        setUid(""); // UID 입력 필드 초기화
        refresh();
    }

    useEffect(() => {
        // 스타일을 head에 추가
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);

        // 컴포넌트가 언마운트될 때 스타일 요소 제거
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []); // 빈 배열을 전달하여 마운트 시에만 실행

    return (
        <div className="attendance-container">
            <h2 className="attendance-title">학생 목록</h2>
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <table className="attendance-table">
                    <thead>
                        <tr>
                            <th>학번</th>
                            <th>이름</th>
                            <th>출석 상태</th>
                            <th>출석 일자</th>
                            <th>결석 사유</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.studentId}</td>
                                <td>{item.name}</td>
                                <td>
                                    <span className={`attendance-status ${item.attendance ? "present" : "absent"}`}>
                                        {item.attendance ? "출석" : "결석"}
                                    </span>
                                </td>
                                <td>
                                    {item.attendanceTime ? item.attendanceTime.split('.')[0] : '기록 되지 않음'}
                                </td>
                                <td>
                                    {item.attendance ? '-' : item.whatHappened}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className="button-group">
                <button className="action-button" onClick={refresh}>새로고침</button>
                <button className="action-button" onClick={reset}>초기화</button>
            </div>
            <div className="uid-input-group">
                <input
                    type="text"
                    placeholder="UID를 입력하세요"
                    value={uid}
                    onChange={(e) => {
                        setUid(e.target.value);
                        refresh();
                    }}
                    className="uid-input"
                />
                <button className="action-button" onClick={updateAttendance}>UID 지정 출석</button>
            </div>
        </div>
    )
}

// 스타일 추가
const styles = `
.attendance-container {
    font-family: Arial, sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
}

.attendance-title {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
}

.attendance-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.attendance-table th, .attendance-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
}

.attendance-table th {
    background-color: #f2f2f2;
    font-weight: bold;
}

.attendance-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.attendance-status {
    padding: 5px 10px;
    border-radius: 15px;
    font-weight: bold;
}

.attendance-status.present {
    background-color: #e6f7e6;
    color: #2e7d32;
}

.attendance-status.absent {
    background-color: #ffebee;
    color: #c62828;
}

.button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
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

.uid-input-group {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.uid-input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 200px;
}

.error-message {
    color: #c62828;
    text-align: center;
    margin-bottom: 20px;
}
`;

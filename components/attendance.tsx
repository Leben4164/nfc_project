"use client" //cilent component 선언

import { useState, useEffect } from 'react';
import PocketBase, { RecordModel } from 'pocketbase';

export function Attendance() {
    const [items, setItems] = useState<RecordModel[]>([]);
    const [error, setError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const [adminId, setAdminId] = useState(''); // 관리자 아이디 상태 추가
    const [adminPassword, setAdminPassword] = useState(''); // 관리자 비밀번호 상태 추가
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // 인증 모달 상태 추가
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
        /**
         * 새로고침 함수
         * 
         * DB에서 정보를 가져와 학번을 기준으로 오름차 순으로 정렬함
         */
        async function refresh() {
        const response = await pb.collection('students').getList(1, 50, { //students 콜렉션의 모든 정보를 가져옴
            sort: '+studentId', //학번 오름차순으로 정렬
        });
        setItems(response.items);
    }
    /**
     * 출석 정보 초기화 함수
     * 
     * 모든 학생의 출석을 false로,
     * 
     * 출석 시간을 공백으로 바꾼다
     */
    async function reset(): Promise<void> {
        setIsLoading(true); // 초기화 시작 시 로딩 상태 설정
        try {
            for (const item of items) {
                await pb.collection('students').update(item.id, {
                    attendance: false,    //모든 학생의 출석을 false로 바꾸고
                    attendanceTime: null, //출석 시간을 공백으로 바꿈
                });
            }
            alert('출석을 초기화하는데 성공했습니다.')
        } catch (error) {
            console.error('출석 초기화 오류:', error);
            setError('출석을 초기화하는 중 오류가 발생했습니다.');
        }
        await refresh();
        setIsLoading(false); // 초기화 완료 후 로딩 상태 해제
    }

    // 관리자 인증 함수
    const authenticateAdmin = () => {
        const validAdminId = 'admin'; // 지정된 관리자 아이디
        const validAdminPassword = '1234'; // 지정된 관리자 비밀번호

        if (adminId === validAdminId && adminPassword === validAdminPassword) {
            reset(); // 인증 성공 시 초기화 함수 호출
            setIsAuthModalOpen(false); // 모달 닫기
        } else {
            alert('관리자 인증에 실패했습니다. 관리자 이외에는 초기화가 불가능합니다.'); // 인증 실패 알림
        }
    };

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
                                <td className="centered-cell">{item.studentId}</td>
                                <td className="centered-cell">{item.name}</td>
                                <td className="centered-cell">
                                    <span className={`attendance-status ${item.attendance ? "present" : "absent"}`}>
                                        {item.attendance ? "출석" : "결석"}
                                    </span>
                                </td>
                                <td className="centered-cell">
                                    {item.attendanceTime ? item.attendanceTime.split('.')[0] : '기록 되지 않음'}
                                </td>
                                <td className="centered-cell">
                                    {item.attendance ? '-' : item.whatHappened}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className="button-group">
                <button className="action-button" onClick={refresh} disabled={isLoading}>새로고침</button>
                <button className="action-button" onClick={() => setIsAuthModalOpen(true)} disabled={isLoading}>
                    초기화
                </button>
            </div>
            {isAuthModalOpen && (
                <div className="auth-modal">
                    <h3>관리자 인증</h3>
                    <input 
                        type="text" 
                        placeholder="아이디" 
                        value={adminId} 
                        onChange={(e) => setAdminId(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="비밀번호" 
                        value={adminPassword} 
                        onChange={(e) => setAdminPassword(e.target.value)} 
                    />
                    <button onClick={authenticateAdmin}>인증</button>
                    <button onClick={() => setIsAuthModalOpen(false)}>취소</button>
                </div>
            )}
        </div>
    )
}

// 스타일 추가
const styles = `

    .centered-cell {
        text-align: center; 
        vertical-align: middle;
    }

    .attendance-container {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 35px;
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
        text-align: center;
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

    .action-button.loading {
        background-color: #ccc; /* 로딩 중 버튼 색상 변경 */
        cursor: not-allowed; /* 커서 변경 */
        transition: background-color 0.3s; /* 부드러운 전환 효과 */
    }

    .auth-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
    }
    .auth-modal input {
        display: block;
        margin: 10px 0;
        padding: 10px;
        width: 100%;
    }
`

"use client" // client component 선언

import { useState, useEffect } from 'react';
import { Student } from '@prisma/client';
import '../styles/attendance.css';

export function Attendance() {
    const [items, setItems] = useState<Student[]>([]);
    const [error, setError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    /**
     * 새로고침 함수
     * 
     * DB에서 정보를 가져와 학번을 기준으로 오름차 순으로 정렬함
     */
    async function refresh() {
        setIsLoading(true);
        try {
            const response = await fetch('../api/refresh'); // API 엔드포인트로 요청
            if (!response.ok) {
                throw new Error('학생 정보를 가져오는 데 실패했습니다.');
            }
            const data = await response.json();
            setItems(data); // 가져온 데이터를 상태에 저장
        } catch (error) {
            console.error('Error fetching students:', error);
            setError('학생 정보를 가져오는 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    }

    /**
     * 출석 정보 초기화 함수
     * 
     * 모든 학생의 출석을 false로,
     * 
     * 출석 시간을 공백으로 바꾼다
     */
    async function reset(): Promise<void> {
        setIsLoading(true);
        try {
           const response = await fetch('../api/reset', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
           })
           if (!response.ok) {
            throw new Error('출석 초기화에 실패했습니다.')
           }
            alert('출석을 초기화하는데 성공했습니다.');
        } catch (error) {
            console.error('출석 초기화 오류:', error);
            setError('출석을 초기화하는 중 오류가 발생했습니다.');
        } finally {
            await refresh();
            setIsLoading(false);
        }
    }

    // 관리자 인증 함수
    const authenticateAdmin = () => {
        const validAdminPassword = '1234'; // 지정된 관리자 비밀번호
        if (adminPassword === validAdminPassword) {
            reset(); // 인증 성공 시 초기화 함수 호출
            setIsAuthModalOpen(false); // 모달 닫기
            setAdminPassword("");
            alert('관리자 인증에 성공했습니다. 초기화를 진행합니다.');
        } else {
            alert('관리자 인증에 실패했습니다. 관리자 이외에는 초기화가 불가능합니다.'); // 인증 실패 알림
        }
    };

    useEffect(() => {
        refresh().catch((error) => {
            console.error('Error fetching students:', error);
            setError('학생 정보를 가져오는 중 오류가 발생했습니다.');
        });
    }, []);

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
                <button className="action-button" onClick={refresh} disabled={isLoading || isAuthModalOpen}>새로고침</button>
                <button className="action-button" onClick={() => setIsAuthModalOpen(true)} disabled={isLoading || isAuthModalOpen}>
                    초기화
                </button>
            </div>
            {isAuthModalOpen && (
                <div className="auth-modal">
                    <h3>관리자 인증</h3>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                    />
                    <div className='auth-button-div'>
                        <button onClick={authenticateAdmin}>인증</button>
                        <button onClick={() => setIsAuthModalOpen(false)}>취소</button>
                    </div>
                </div>
            )}
        </div>
    );
}

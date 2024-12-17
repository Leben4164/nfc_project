"use client" // client component 선언

import { useState, useEffect } from 'react';
import '../styles/attendance.css';
import { getStudents } from '../lib/github-db'; // github-db.ts에서 학생 정보를 가져오는 함수 임포트

interface Student {
    name: string;
    studentId: string;
    uid: string;
    attendance: boolean;
    attendanceTime: string | null;
    whatHappened: string | null;
}

interface AttendanceProps {
    students: Student[];
    onAttendance: (uid: string) => void;
}

export function Attendance({ students, onAttendance }: AttendanceProps) {
    const [uid, setUid] = useState("");

    const handleSubmit = () => {
        if (uid) {
            onAttendance(uid);
            setUid("");
        }
    };

    return (
        <div className="attendance-container">
            <h2 className="attendance-title">학생 목록</h2>
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
                    {students.map((student) => (
                        <tr key={student.uid}>
                            <td className="centered-cell">{student.studentId}</td>
                            <td className="centered-cell">{student.name}</td>
                            <td className="centered-cell">
                                <span className={`attendance-status ${student.attendance ? "present" : "absent"}`}>
                                    {student.attendance ? "출석" : "결석"}
                                </span>
                            </td>
                            <td className="centered-cell">
                                {student.attendanceTime ? student.attendanceTime.split('.')[0] : '기록 되지 않음'}
                            </td>
                            <td className="centered-cell">
                                {student.whatHappened ? '-' : student.whatHappened}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-group">
                <button className="action-button" onClick={handleSubmit}>출석</button>
            </div>
        </div>
    );
}

'use client'

import { useState, useEffect } from 'react';
import { Attendance } from '../components/attendance';
import { Reason } from '../components/reason';
<<<<<<< HEAD

=======
import { updateGlobalStudents } from '../app/api/post/route';
>>>>>>> e256a626f414500e07a7dc762f9c9edaf757eacb
import { initialStudents } from '@/data/students';

interface Student {
  name: string;
  studentId: string;
  uid: string;
  attendance: boolean;
  attendanceTime: string | null;
  whatHappened: string | null;
}

export default function Home() {
<<<<<<< HEAD
  const [students, setStudents] = useState<Student[]>(initialStudents); // 초기 상태 설정

  const handleAttendance = async (uid: string) => {
    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid }), // uid를 요청 본문에 포함
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message); // 오류 메시지 표시
        return;
      }

      const updatedStudent = await response.json(); // 업데이트된 학생 정보 가져오기
      setStudents(prev => prev.map(student => {
        if (student.uid === updatedStudent.uid) {
          return {
            ...student,
            attendance: true,
            attendanceTime: updatedStudent.attendanceTime, // 서버에서 받은 출석 시간으로 갱신
          };
        }
        return student;
      }));
    } catch (error) {
      console.error('Error updating attendance:', error);
      alert('출석 업데이트 중 오류가 발생했습니다.');
    }
=======
  const [students, setStudents] = useState<Student[]>(initialStudents);

  useEffect(() => {
    updateGlobalStudents(students);
  }, [students]);

  const handleAttendance = (uid: string) => {
    setStudents(prev => prev.map(student => {
      if (student.uid === uid) {
        return {
          ...student,
          attendance: true,
          attendanceTime: new Date().toISOString()
        };
      }
      return student;
    }));
>>>>>>> e256a626f414500e07a7dc762f9c9edaf757eacb
  };

  const handleWhatHappened = (name: string, reason: string) => {
    setStudents(prev => prev.map(student => {
      if (student.name === name) {
        return {
          ...student,
<<<<<<< HEAD
          whatHappened: reason,
=======
          whatHappened: reason
>>>>>>> e256a626f414500e07a7dc762f9c9edaf757eacb
        };
      }
      return student;
    }));
  };

  return (
    <main>
      <Attendance students={students} onAttendance={handleAttendance} />
      <Reason students={students} onUpdateReason={handleWhatHappened} />
    </main>
  );
}

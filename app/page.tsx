'use client'

import { useState, useEffect } from 'react';
import { Attendance } from '../components/attendance';
import { Reason } from '../components/reason';
import { updateGlobalStudents } from '../app/api/post/route';
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
  };

  const handleWhatHappened = (name: string, reason: string) => {
    setStudents(prev => prev.map(student => {
      if (student.name === name) {
        return {
          ...student,
          whatHappened: reason
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

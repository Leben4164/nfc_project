import sql from 'better-sqlite3';

// 데이터베이스 연결 설정
const db = sql('students.db'); // 데이터베이스 파일 경로

db.prepare(`
  CREATE TABLE IF NOT EXISTS students (
    name TEXT,
    studentId TEXT,
    uid TEXT,
    attendance INTEGER,
    attendanceTime TEXT,
    whatHappen TEXT
  )  
`).run();

async function initData() {
  const st = db.prepare(`
    INSERT INTO students (name, studentId, uid, attendance, attendanceTime, whatHappen) VALUES (?, ?, ?, ?, ?, ?)
  `);

  const studentData = [
    ['박현승', '1109', 'A3B4EE0F', 0, '', ''],
    ['이시온', '1216', '4AAD1B1A', 0, '', ''],
    ['정지훈', '1219', '64A81F2B', 0, '', ''],
    ['김다윤', '1304', '7A9A071A', 0, '', ''],
    ['노주현', '1308', '7AA3061A', 0, '', ''],
    ['유태연', '1312', '8A261C1A', 0, '', ''],
    ['이서진', '1314', '1AA71A1A', 0, '', ''],
    ['임건후', '1318', '5A210E1A', 0, '', ''],
    ['최정우', '1323', '3A780F1A', 0, '', ''],
    ['김준성', '1404', 'AA0C0F1A', 0, '', ''],
    ['이에녹', '1418', '7AA97B3B', 0, '', ''],
    ['백대훈', '1615', 'CA38BE3B', 0, '', ''],
    ['원휘연', '1812', 'FA8B021A', 0, '', ''],
    ['김성욱', '2102', 'A32F2914', 0, '', ''],
    ['양건모', '2113', 'A2A9212A', 0, '', ''],
    ['박민혁', '2307', '2A7E1D1A', 0, '', ''],
    ['송하진', '2416', '7AA9011A', 0, '', ''],
    ['최호근', '2423', '6AFC0F1A', 0, '', ''],
    ['곽동현', '2501', '5AFB993A', 0, '', ''],
    ['나상일', '2511', '9AB6011A', 0, '', ''],
    ['안현태', '2518', '0A19031A', 0, '', ''],
    ['이준석', '2619', 'EACA061A', 0, '', ''],
    ['송민찬', '2711', 'DAC0121A', 0, '', ''],
    ['조윤민', '2724', '3A97161A', 0, '', ''],
    ['나기원', '2807', 'EAF91A1A', 0, '', ''],
    ['손우현', '2811', 'DAE3001A', 0, '', '']
  ];

  for (const student of studentData) {
    st.run(...student);
  }
}

initData()
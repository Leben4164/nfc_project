Arduino Uno 4 Wifi 보드와 RFID-RC522 모듈을 이용해서 학생들의 출석을 관리하는 시스템

## To Do List

 - [x] Next js를 통한 출석 결과 출력 웹사이트 구현
 - [x] Pocketbase를 통한 출석 데이터 보관&갱신
 - [x] AWS EC2 서비스를 통한 Pocketbase 상시 가동
 - [x] Vercel를 통한 웹사이트 배포
 - [x] 무료 도메인을 만들고 SSL 등록해서 CORS오류를 방지 및 Https로 사이트 등록(데이터 베이스)
 - [ ] NFC 리더기 완성
 - [x] NFC 리더기 코딩 완성

# 해결된 문제점

1. 데이터 베이스(pocketbase) 배포 문제
  : pocketbase는 exe로 실행되는 데이터 베이스 이기 때문에 배포하기 위해서는 exe를 항상 실행하고 있을 컴퓨터가 필요하고, 데이터 베이스에 접속하려면 실행하고 있는 컴퓨터의 ip로 접속할 필요가 있다는 문제점 확인
    AWS EC2 서비스를 이용해서 Linux 인스턴스를 만들어 pocketbase를 세팅하고, 무료 도메인을 사용해서 인스턴스의 ip를 할당해서 문제 해결

2. Https 문제
  : 본 웹사이트를 Next JS 프레임워크로 제작했기 때문에 Vercel로 배포하는 것이 좋다고 판단함, 그런데 Vercel로 배포된 웹사이트는 https를 사용하기 때문에 http를 사용하는 곳에서 온 데이터를 받지 못함(Cors 문제)
    인스턴스에 SSL 등 여러가지 설정해서 https를 사용하도록 해서 문제 해결

3. Post 요청 문제
  : post 요청을 받기 위한 다양한 시도가 있었는데 실패함.
    API route를 사용해서 문제 해결

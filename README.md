# 🧾 기술 면접 대비 서비스 - 떨면뭐하니 README

<img width="1915" alt="스크린샷 2024-07-18 오후 7 02 00" src="https://github.com/user-attachments/assets/ee91070a-7151-421f-8446-c3302ddb033d">


- 배포 URL : https://dmmhn-next-js.vercel.app/

<br>

## 프로젝트 소개

- 떨면뭐하니는 개발 직군의 기술 면접을 대비하여 자신의 면접 모습을 체크할 수 있는 서비스입니다.
- 다양한 질문들을 TTS를 이용하여 음성으로 들을 수 있습니다.
- 자신의 면접 모습을 녹화하여 말의 세기와 빠르기, 동작과 모습들을 체크할 수 있습니다.

<br>

## 팀원 구성

<div align="center">

| **김민섭** | 
| :------: | 
|<img width="193" alt="스크린샷 2024-07-18 오후 7 10 28" src="https://github.com/user-attachments/assets/5808cfe4-800a-482a-a90a-b1db84f92410">
 [ <br/> @striker1826](https://github.com/striker1826) |



</div>

<br>

## 1. 개발 환경

- Front : Next.js, module.scss, Zustand, Axios, React-Query, video-react
- Back-end : Nest.js, mysql, typeORM, jwt, Swagger
- 버전 및 이슈관리 : Github
- 서비스 배포 환경 : Vercel
<br>

## 2. 채택한 개발 기술과 브랜치 전략

### Next.js

- 패치 및 GET 요청이 적은 사이트의 특성
- SEO에서의 이점
    
    
### Zustand

- 최상위 컴포넌트를 만들어 props로 유저 정보를 내려주는 방식의 경우 불필요한 props 전달이 발생합니다. 따라서, 필요한 컴포넌트 내부에서만 상태 값을 가져다 사용하기 위해 상태 관리 라이브러리를 사용하기로 했습니다.
- 별도의 Provider가 필요없고 사용법이 기존의 useState 훅을 사용하는 방식과 유사해 학습비용을 낮출 수 있었습니다.

### eslint, prettier

- 정해진 규칙에 따라 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 했습니다.
- 코드 품질 관리는 eslint에, 코드 포맷팅은 prettier에 일임해 사용했습니다.
- 협업 시 매번 컨벤션을 신경 쓸 필요 없이 빠르게 개발하는 데에 목적을 두었습니다.

### 브랜치 전략

- Git-flow 전략을 기반으로 main, develop 브랜치와 feature 보조 브랜치를 운용했습니다.
- main, develop, Feat 브랜치로 나누어 개발을 하였습니다.
    - **main** 브랜치는 배포 단계에서만 사용하는 브랜치입니다.
    - **develop** 브랜치는 개발 단계에서 git-flow의 master 역할을 하는 브랜치입니다.
    - **Feat** 브랜치는 기능 단위로 독립적인 개발 환경을 위하여 사용했습니다.

<br>

## 3. 프로젝트 구조

<img width="1066" alt="스크린샷 2024-07-18 오후 7 22 03" src="https://github.com/user-attachments/assets/c6f17d60-8f91-4bc0-aed4-f03307bdc08b">


<br>


## 4. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2024-06-13 ~ 2024-06-19

<br>


## 5. 페이지별 기능

### [초기화면]
- 서비스 접속 초기화면으로 로그인 페이지와 모의면접 페이지로 이동할 수 있습니다.


<img width="1429" alt="스크린샷 2024-07-18 오후 7 26 12" src="https://github.com/user-attachments/assets/691d6fb4-883e-4798-891c-203efaeea7a0">

<br>

### [회원가입]
- 카카오 계정으로 로그인 할 수 있습니다.


<img width="1432" alt="스크린샷 2024-07-18 오후 7 28 34" src="https://github.com/user-attachments/assets/0ebfeb7f-a969-4501-be59-99f645cf6d1a">

<br>

### [모의면접 준비 페이지]
- 모의면접 시작 전 준비를 할 수 있는 페이지 입니다.


<img width="1436" alt="스크린샷 2024-07-18 오후 7 30 02" src="https://github.com/user-attachments/assets/7e0a1d97-91ed-4621-aee2-2f58b08eecfb">

<br>

### [모의면접 시작 직전 페이지]
- 모의면접 시작 전 자신의 모습을 점검할 수 있는 페이지 입니다.


<img width="1425" alt="스크린샷 2024-07-18 오후 7 33 04" src="https://github.com/user-attachments/assets/840f037e-5eac-49ad-b4ed-665682958abf">


<br>

### [면접 진행 페이지]
- 모의면접을 진행하는 페이지 입니다.
- 모의면접을 진행하는 동안 화면은 녹화되고 있습니다.
- 나오는 음성을 들으며 면접을 진행할 수 있습니다.



<img width="1424" alt="스크린샷 2024-07-18 오후 7 34 15" src="https://github.com/user-attachments/assets/a6ad85f8-ac65-4ddc-af9e-551e529ee8aa">

<br>

### [면접 종료 페이지]
- 면접을 종료하는 페이지 입니다.
- 종료 버튼을 클릭하면 면접 녹화본이 다운로드 됩니다.

<img width="1431" alt="스크린샷 2024-07-18 오후 7 37 39" src="https://github.com/user-attachments/assets/55a19fdc-ae8e-4a61-bc0a-231d346307c0">

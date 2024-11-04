# 🧾 기술 면접 대비 서비스 - 떨면뭐하니 README 
<h1>배포 URL : https://dmmhn-next-js.vercel.app/</h1>

<img width="1915" alt="스크린샷 2024-07-18 오후 7 02 00" src="https://github.com/user-attachments/assets/c6bd244c-214e-4677-baa1-9cbf7dcca6f3">

<br>

## 프로젝트 소개

<h3>개발자를 위한 모의면접 솔루션, 떨면뭐하니가 있습니다! 🎉</h3>

1️⃣ 기술 스택 기반 모의면접 - 선택한 기술 스택에 맞춘 질문을 통해 실제 면접처럼 모의면접을 진행할 수 있어요.

2️⃣ 실시간 피드백 - 면접 질문에 대한 대답 후 AI에게 실시간으로 피드백을 받아보세요. 자신이 어떤 부분을 보완해야 할지 바로 알 수 있어, 면접 준비가 한층 더 수월해집니다.

<br>

## 팀원 구성

<div align="center">

<table>
  <tr>
    <td align="center">
      <strong>김민섭</strong>
      <br/>
      <img width="193" height="193" alt="김민섭 프로필 이미지" src="https://github.com/user-attachments/assets/5808cfe4-800a-482a-a90a-b1db84f92410">
      <br/>
      <a href="https://github.com/striker1826">@striker1826</a>
    </td>
    <td align="center">
      <strong>권주현</strong>
      <br/>
      <img width="193" height="193" alt="권주현 프로필 이미지" src="https://avatars.githubusercontent.com/u/113277713?s=400&u=67736d0738dff308f29459a97cc271dafa1e2848&v=4">
      <br/>
      <a href="https://github.com/kuum97">@kuum97</a>
    </td>
  </tr>
</table>

</div>

<br>

## 1. 개발 환경

- Front : Next.js, module.scss
- Back-end : Nest.js
- 버전 및 이슈관리 : Github
- 서비스 배포 환경 : Vercel
<br>

## 2.브랜치 전략

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
- 서비스 접속 초기화면으로 모의면접 페이지로 이동할 수 있습니다.


<img width="1429" alt="스크린샷 2024-07-18 오후 7 26 12" src="https://github.com/user-attachments/assets/b850dc83-c190-4a2e-8f9b-4c40415ac831">

<br>

### [회원가입 및 로그인]
- 카카오 계정으로 로그인 할 수 있습니다.

<img width="1432" alt="스크린샷 2024-07-18 오후 7 28 34" src="https://github.com/user-attachments/assets/956c14d7-2ea6-4d68-8e01-4aa46a36deab">

<br>

### [모의면접 스택 선택 화면]
- 모의면접 시작 전 면접을 진행할 기술 스택을 선택할 수 있는 페이지 입니다.

<img width="1436" alt="스크린샷 2024-07-18 오후 7 30 02" src="https://github.com/user-attachments/assets/d9ad8778-4eeb-4df0-9a63-f3fa83f5d1f2">

<br>

### [모의면접 안내사항 화면]
- 모의면접 시작 전 자신의 모습을 점검하고 면접 시 필요한 안내사항들을 볼 수 있는 페이지 입니다.

<img width="1425" alt="스크린샷 2024-07-18 오후 7 33 04" src="https://github.com/user-attachments/assets/45d0c378-1d0c-4163-87b3-61d0ba5b7e50">


<br>

### [면접 진행 화면]
- 모의면접을 진행하는 페이지 입니다.
- 질문을 읽고 음성으로 질문에 대한 대답을 합니다.


<img width="1424" alt="스크린샷 2024-07-18 오후 7 34 15" src="https://media.disquiet.io/images/product/gallery/b47a5cbd32a4921894376878ae56f47134a4b1f41a42d1e5bb76f6419fa35d9c?w=1200">

<br>

### [면접 피드백 화면]
- 면접의 피드백을 확인할 수 있는 화면입니다.

<img width="1431" alt="스크린샷 2024-07-18 오후 7 37 39" src="https://media.disquiet.io/images/product/gallery/f1f817ceb930a782d7b7a200aff1313571574a2607294a95f64ccd440042407a?w=1200">

**ZEEBRA**

**📚 프로젝트 소개** <br>


- KREAM 같은 명품 **리셀 플랫폼**과 당근 같은 중고거래 **중개 플랫폼**을 분석하여, <br> 대규모 트래픽에서도 **안정정인 성능**을 확보하는 것을 목표로 한 패션 이커머스 플랫폼입니다. <br> 3단계의 고도화 과정을 거쳐서 기능을 개발했습니다. <br>
1. MVP 제작 <br>
   기획부터 mvp까지 핵심 요구사항을 위주로 빠르게 구현하였습니다.
2. 단위/통합 테스트 및 1차 성능 개선 <br>
  검색 기능의 쿼리 최적화 등 초기 성능 개선을 진행하였습니다.<br>
  핵심 기능에 대한 단위/통합 테스트를 진행했습니다.<br>
3. 부하테스트 및 2차 성능 개선 <br>
  상품 검색, 채팅, 주문/결제 로직에 대한 부하 테스트를 진행하였습니다. <br>
  다양한 동시성 이슈와 병목 현상을 해결하였습니다.<br>
  병목 현상의 원인을 분석하고 단계적으로 최적화하여 성능을 개선하였습니다.<br>

<hr>


**핵심목표** <br>

단순 구현을 넘어 웹 성능 최적화와 E2E 테스트를 통한 안정적인 서비스 구축 <br>

시연 영상 : https://www.youtube.com/watch?v=LEjwIThP93Q <br>

**팀원 구성** <br>
FE - 이한음, 홍성경 <br>
BE - 박가영, 이정민, 윤태우 <br>

<hr>

**협업 컨벤션**<br>
- JIRA, github actions, notion <br>

**사용한 기술 스택 & 툴 & 라이브러리**<br><br>

<img width="2400" height="960" alt="2" src="https://github.com/user-attachments/assets/428b9535-676b-4283-aa66-e9ccc6dab712" />

<img width="2400" height="960" alt="3" src="https://github.com/user-attachments/assets/a4147b4f-a937-4fcf-a6a6-a07f9c5a3cc4" />

<hr>
**아키텍처** <br> 
<img width="525" height="670" alt="image" src="https://github.com/user-attachments/assets/9c133ba0-ec50-45ad-93ff-38b6c835da8a" />

<hr>

**ERD** <br>

<img width="3450" height="1642" alt="KakaoTalk_20251215_170838674" src="https://github.com/user-attachments/assets/1c2f0e46-e8d1-433a-89aa-cfe601cc5365" />




<hr>

**MVP 기능** <br>

1. 사용자 인증 (Auth)<br>
2. 상품 검색 및 탐색 (Search & Browse)<br>
3. 관심 상품 (Wishlist)<br>
4. 실시간 단체 채팅 (Real-time Chat)<br>
5. 알림 센터 (Notification)<br>
6. 주문 및 결제 (Order & Payment)<br>

<br> <hr>

**핵심 성과**
1. 웹 성능 최적화 (Lighthouse Score Up)
  
사용자 경험 향상을 위해 초기 로딩 속도와 레이아웃 이동(CLS)을 개선했습니다.
- **이미지 최적화:** `weserv.nl`을 도입하여 이미지를 WebP로 변환, 용량을 **00% 절감**했습니다.
- **CLS 개선:** 데이터 로딩 시 Skeleton UI를 적용하여 CLS 점수를 **0.x -> 0.0**으로 개선했습니다.
- **캐싱 전략:** `Cache-Control` 및 `Redux-persist`를 활용해 불필요한 네트워크 요청을 최소화했습니다.

<img width="1527" height="784" alt="image" src="https://github.com/user-attachments/assets/e982a142-6788-4a4f-aa05-a97391b8d4ca" />

2. 탐색의 흐름을 끊지 않는 몰입감

- **페이지네이션**으로 인한 경험의 단절을 제거.<br>
- **스크롤 기반**의 데이터 로딩을 통해 사용자가 별도의 클릭 없이 자연스럽게 상품을 탐색<br>
- 체류 시간과 상품 노출 빈도를 높이는 UX를 구현. <br> <br>

3. 안정적인 서비스를 위한 테스트 환경 구축

- **Unit/Integration Test:** `Vitest`와 `RTL`을 활용해 핵심 로직 검증.
- **E2E Test:** `Cypress`를 도입하여 사용자 시나리오 기반의 통합 테스트 수행.
- **Error Monitoring:** `Sentry`를 연동하여 프로덕션 환경의 에러 로그를 실시간으로 수집.

- <img width="3356" height="1766" alt="image" src="https://github.com/user-attachments/assets/7684503c-33c7-4828-b619-ef645724ef55" />
<img width="1801" height="903" alt="image" src="https://github.com/user-attachments/assets/86b5cb21-d149-4e93-b14c-f10446fd754a" />


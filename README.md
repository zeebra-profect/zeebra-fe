# 🦓 ZEEBRA : 사용자의 3초를 지켜낸 이커머스 플랫폼

> KREAM, 당근마켓을 모티브로 한 패션 이커머스 플랫폼입니다.
> 유일한 프론트엔드 개발자로서 아키텍처 설계, UI/UX 구현, 프론트엔드 성능 최적화 및 배포 파이프라인 구축까지 전 과정을 주도했습니다.
> **단순한 기능 구현을 넘어, 대규모 트래픽에서도 견고한 안정성과 쾌적한 렌더링 성능(Lighthouse 90점대)을 확보하는 데 집중했습니다.**

🎥 **[시연 영상 보기](https://www.youtube.com/watch?v=LEjwIThP93Q)**
📝 **[트러블 슈팅 및 기술 블로그](https://velog.io/@mebung2/Jest%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BD%94%EB%93%9C-%EC%9E%91%EC%84%B1%EA%B3%BC-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B3%A0%EB%8F%84%ED%99%94-0-)**

<br/>

## 🛠️ 기술 스택 및 아키텍처 (Tech Stack & Architecture)

### Frontend & Backend Tech Stack
<img width="2400" height="960" alt="526448201-428b9535-676b-4283-aa66-e9ccc6dab712" src="https://github.com/user-attachments/assets/f7243626-1792-426e-b42c-4442e6e93328" />

<img width="2400" height="960" alt="526448237-a4147b4f-a937-4fcf-a6a6-a07f9c5a3cc4" src="https://github.com/user-attachments/assets/610ef695-0dc3-4faf-9ea9-2666ca88f444" />

<br/>

### AWS Infrastructure Architecture
<img width="525" height="670" alt="526422105-9c133ba0-ec50-45ad-93ff-38b6c835da8a" src="https://github.com/user-attachments/assets/6bae9185-463d-4ff5-a62a-1602e305a1e8" />


<br/>

## 🔥 핵심 성과 (Key Achievements)

### 1. ⚡ 렌더링 성능 최적화 : LCP 82% 단축 및 Lighthouse 수치 대폭 향상
초기 대용량 이미지 병목으로 인한 성능 저하를 해결하기 위해 다각도의 최적화를 진행했습니다.
* **이미지 포맷 최적화:** CDN(weserv.nl)을 도입하여 이미지를 WebP로 온디맨드 변환.
* **캐싱 전략 재설계:** `Cache-Control` 및 `Redux-persist`를 활용해 불필요한 네트워크 요청 최소화.
* **결과:** **LCP 2.3초 ➔ 0.4초 단축**, 초기 성능 부하 완벽 해결.

<img width="1527" height="784" alt="526411318-e982a142-6788-4a4f-aa05-a97391b8d4ca" src="https://github.com/user-attachments/assets/5c442af8-5725-4dbf-bd2f-c7ebc5d10789" />

<br/>

### 2. 🛡️ 견고한 서비스 구축 : 테스트 자동화 및 에러 모니터링
1인 프론트엔드 환경에서 발생할 수 있는 휴먼 에러를 시스템으로 방어했습니다.
* **E2E 테스트 자동화:** Cypress를 도입하여 주요 비즈니스 시나리오(로그인, 검색, 장바구니)에 대한 E2E 테스트를 수행하여 배포 전 결함 차단.
<img width="3356" height="1766" alt="526413609-7684503c-33c7-4828-b619-ef645724ef55" src="https://github.com/user-attachments/assets/83be0296-d0d8-43c9-a729-49a5e3188d50" />

<br/>

* **실시간 모니터링:** Sentry를 연동하여 프로덕션 배포 이후 발생하는 에러(TTFB, CLS 등 Web Vitals 포함)를 실시간으로 트래킹하는 파이프라인 구축.
<img width="1801" height="903" alt="526414234-86b5cb21-d149-4e93-b14c-f10446fd754a" src="https://github.com/user-attachments/assets/2a444a02-bfd9-4ffd-9745-fabbebc55d12" />
<br/>


### 3. ✨ UX 고도화 및 체계적인 협업 프로세스
사용자가 상품을 탐색하는 과정의 불편함을 기술적으로 제거하고, 팀 내 소통 비용을 최소화했습니다.
* **시각적 안정성 (CLS 개선):** 데이터 로딩 시 Skeleton UI를 적용하여 컴포넌트 렌더링 시 발생하는 레이아웃 이동 현상(CLS)을 완벽하게 개선.
* **문서 기반 협업:** 요구사항 명세서, Figma 와이어프레임, ERD를 기반으로 백엔드 4명과 정확한 기술 명세를 조율하여 개발 병목을 제거.

<br/>

**[Figma 와이어프레임 및 화면 설계]**
<img width="1081" height="598" alt="537117310-3dd9861a-d2b3-4ab0-a78f-62dced9975dd" src="https://github.com/user-attachments/assets/a589b54c-0029-4a0d-a1bc-591b0522cdb1" />

<br/>

**[요구사항 명세서 및 ERD]**
<img width="1517" height="652" alt="537117165-5df2217b-9516-44c7-98cc-911c85369b19" src="https://github.com/user-attachments/assets/bef23aa5-2516-4948-82ca-3a478240485d" />

<img width="3450" height="1642" alt="526453210-1c2f0e46-e8d1-433a-89aa-cfe601cc5365" src="https://github.com/user-attachments/assets/1d01dd3c-a8de-41b3-8389-87e7251bed1f" />

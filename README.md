# MySofa Backend

MySofa 소파 커스터마이징 플랫폼의 백엔드 REST API 서버입니다. 사용자 인증, 소파 상품 관리, 커스터마이징 세션 저장 등의 핵심 기능을 제공합니다.

## 🛋️ 프로젝트 소개

MySofa는 사용자가 원하는 소파를 실시간으로 커스터마이징하고, 다양한 공간과 조명 환경에서 배치해보며 나만의 스타일을 완성할 수 있는 웹 기반 소파 시뮬레이션 플랫폼입니다.

이 저장소는 MySofa 플랫폼의 백엔드 API 서버로, NestJS 프레임워크를 기반으로 구축되었습니다.

## ✨ 주요 기능

### 🔐 사용자 관리
- JWT 기반 회원가입/로그인/로그아웃
- 리프레시 토큰을 통한 토큰 갱신
- 사용자 프로필 관리

### 🛋️ 상품 관리
- 소파 상품 등록, 수정, 삭제 (관리자)
- 상품 목록 조회 및 상세 정보 제공
- 소파 모델별 옵션 관리 (색상, 재질, 크기, 모델 타입)

### 🎨 커스터마이징 세션
- 사용자별 소파 커스터마이징 결과 저장
- 커스텀 이름, 색상, 재질, 크기, 모델 타입 설정
- 사용자의 저장된 커스터마이징 목록 관리

### 📚 API 문서화
- Swagger를 통한 자동 API 문서 생성
- `/api-docs` 엔드포인트에서 API 문서 확인 가능

## 🛠️ 기술 스택

| 분야 | 기술 |
|------|------|
| **프레임워크** | NestJS, TypeScript |
| **데이터베이스** | MySQL, TypeORM |
| **인증** | JWT, Passport |
| **API 문서** | Swagger/OpenAPI |
| **검증** | class-validator, class-transformer |
| **배포** | AWS EC2, Docker |
| **CI/CD** | GitHub Actions |

## 🚀 시작하기

### 환경 요구사항
- Node.js 18+
- MySQL 8.0+
- npm

### 설치 및 실행

```bash
# 의존성 설치
$ npm install

# 환경변수 설정
$ cp .env.example .env
# .env 파일에서 데이터베이스 연결 정보 등 설정

# 개발 모드 실행
$ npm run start:dev

# 프로덕션 모드 실행
$ npm run start:prod
```

### 테스트

```bash
# 단위 테스트
$ npm run test

# e2e 테스트
$ npm run test:e2e

# 테스트 커버리지
$ npm run test:cov
```

## 📁 프로젝트 구조

```
src/
├── common/              # 공통 모듈 (필터, 가드, 파이프 등)
├── modules/
│   ├── auth/           # 인증 관련 모듈
│   ├── users/          # 사용자 관리 모듈
│   ├── products/       # 상품 관리 모듈
│   └── custom_sessions/ # 커스터마이징 세션 모듈
└── main.ts             # 애플리케이션 진입점
```

## 🌐 API 엔드포인트

### 인증
- `POST /auth/signup` - 회원가입
- `POST /auth/login` - 로그인
- `POST /auth/logout` - 로그아웃
- `POST /auth/refresh` - 토큰 갱신

### 사용자
- `GET /users/profile` - 사용자 프로필 조회
- `PUT /users/profile` - 사용자 프로필 수정

### 상품
- `GET /products` - 상품 목록 조회
- `GET /products/:id` - 상품 상세 조회
- `POST /products` - 상품 등록 (관리자)
- `PUT /products/:id` - 상품 수정 (관리자)
- `DELETE /products/:id` - 상품 삭제 (관리자)

### 커스터마이징 세션
- `GET /custom-sessions` - 사용자의 커스터마이징 목록 조회
- `POST /custom-sessions` - 커스터마이징 결과 저장
- `PUT /custom-sessions/:id` - 커스터마이징 수정
- `DELETE /custom-sessions/:id` - 커스터마이징 삭제

## 🔒 환경변수

프로젝트 실행을 위해 다음 환경변수가 필요합니다:

```env
# 데이터베이스
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=mysofa

# JWT
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

# 기타
NODE_ENV=development
PORT=3000
```

## 🚀 배포

### Docker 배포

```bash
# 이미지 빌드
$ docker build -t mysofa-backend .

# 컨테이너 실행
$ docker run -d -p 3000:3000 --name mysofa-backend mysofa-backend
```

### AWS EC2 배포

GitHub Actions를 통한 자동 배포가 설정되어 있습니다. `main` 브랜치에 push하면 자동으로 EC2 서버에 배포됩니다.

## 📚 API 문서

서버 실행 후 `http://localhost:3000/api-docs`에서 Swagger API 문서를 확인할 수 있습니다.

## 🤝 관련 프로젝트

- [MySofa Frontend](https://github.com/udune/MySofa) - React 웹 클라이언트
- [MySofa Unity](https://github.com/udune/MySofa_Unity) - Unity WebGL 3D 시뮬레이션

## 📄 라이선스

MIT License

## 👥 개발팀

- **백엔드 개발**: minchan kim
- **API 문서**: minchan kim

---

🛋️ **MySofa**로 나만의 완벽한 소파를 찾아보세요!

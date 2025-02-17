# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `회원가입, 로그인 구현`

2025.01.24
Firebase와 연결하여 회원가입 및 로그인 기능을 추가했습니다.\
이메일 Validity, 비밀번호와 비밀번호 확인란의 일치 여부, 그 외 연락처와 닉네임 등을 유저 객체에 저장하고, 추가로 비어있는 wishlist 배열을 추가하여 향후 "좋아요" 목록을 확인할 수 있도록 하였습니다.\

Context API를 통해 현재 로그인 여부에 따라 "/login"과 "register", 혹은 "/my" 페이지로 라우팅되도록 구현하였습니다.\

### `컨텐츠의 재정렬`

2025.01.25
정렬 버튼을 통해 아티스트의 등록일(id)과 이름의 오름차순, 내림차순 기능을 구현하였습니다.\
artistdata 배열을 default state로 받아온 뒤 switch 문을 통해 sort 옵션과 버튼에 표시되는 문자열을 제어하였습니다.

또한, 해당 버튼 스타일링 과정에서 부모요소보다 z-index를 낮게 설정하더라도 동작하지 않는 문제가 발생하였습니다.
이에 따라 Stacking context라는 개념을 공부하고 습득하였고, 부모 요소와 형제관계인 가상요소를 생성하고 그 가상요소를 기준으로 삼아 버튼을 배치하는 방식으로 문제를 해결하였습니다.


### `회원 페이지 및 좋아요 목록 불러오기`

2025.01.29
회원 페이지에서 현재 유저가 "좋아요" 표시한 항목을 불러오는 기능을 추가했습니다.
대표 사진과 아티스트의 이름을 볼 수 있는 "간략히 보기" 와 다른 세부사항까지 확인할 수 있는 "펼쳐보기" 로 이루어진 두가지 모드를 적용하였습니다.

더 나아가 좋아요 표시된 항목이 5개가 넘는 경우, "더보기" 버튼을 통해 다음 배열을 5개씩 추가로 불러오도록 하였습니다.
현재 보여지는 좋아요 목록의 개수가 5개가 넘는다면, 즉 항목이 한번 이상 펼쳐진 경우라면 "접기" 버튼을 활성화시켜 과하게 길어지는 스크롤을 방지하여 유저 경험을 개선하려 하였습니다.


### `오늘의 이슈`

2025.01.30
1. 회원가입 후 "/login"으로 리다이렉트 되지 않음
2. invlaid 클래스 및 애니메이션 누락


### `Next.js로 마이그레이션 하기`

2025.02.03
기존 프로젝트를 App router 방식의 next.js로 바꾸는 작업을 진행하였습니다.
기본적인 경로 구성을 하고, react-router-dom 방식 대신 next router로 교체했습니다.


### `Query 기준으로 페이지 동적 생성하기`

2025.02.07
아티스트 별 페이지를 기존에는 해당 id를 추적하고 데이터 상에서 필터링하여 생성했다면, next.js로 바꾸면서 query string을 기준으로 동적 생성하도록 개선했습니다.

### `Query 기준으로 페이지 동적 생성하기`

2025.02.08
목업 데이터를 로컬에 저장해두었다가, 실제 데이터를 fetching하는 듯한 효과를 주기 위해 API route를 생성하여 불러오도록 수정하였습니다.
또한 빌드 과정에서 의존성 배열의 누락, 과도한 state의 변경 및 호출 문제 등을 발견하고 개선하였습니다.


### `정렬 로직 수정하기`

2025.02.10
API route를 통해 각 아티스트 별 페이지를 동적 생성하도록 하였습니다.


Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

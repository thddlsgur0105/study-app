스터디 팀 매칭 

mongoose -> 해당 조건을 해시태그로 걸고 관련된 스터디 구인 room 이 검색되는 기능 ? 
mongoose Model.findOne({...})
Search Room -> Hashtag 로 filtering 혹은 직접 검색 -> 원하는 room 검색
Room 게시글 작성 -> form 활용 -> Create Study Room 
-> 분야설정 토익시험 준비 / 공무원시험 준비 / 컴퓨터 공부 / 자율 공부 -> Hashtag 로 설정 가능
Room 마다 고유 id -> room detail page 접속 -> Comment 기능
room detail page -> 게시글 내용 로드 -> 유저의 참여 여부 선택

-> 스터디룸 입장하기 -> 날짜별 : 유저들이 공부 관련 시간 기록 form -> Study model database 에 document 생성
-> 날짜마다 공부한 친구들의 공부시간을 도표로 날짜별 비교
-> 내 정보 : 날짜별 내 공부시간 

# Router

## rootRouter --> __Done__ 

[o] / -> Home -> Search 랑 Hashtag 로 검색하면 관련 room 모아보기
[o] /login -> Login -> __form__
[o] /join -> Join -> __form__
[o] /logout -> Logout
[o] /create -> Create Room -> __form__

## roomRouter --> __Done__

[o] /rooms/:id -> Watch Room
[x] /rooms/:id/edit -> Edit Room -> __form__
[x] /rooms/:id/delete -> Delete Room

## userRouter --> __Done__

[x] /users/:id/profile -> See User Profile
[x] /users/:id/edit -> Edit My Profile -> __form__
[x] /users/:id/delete -> Delete User

## apiRouter --> __차후에 라우터 & 컨트롤러 만들기__

[o] /api/join -> Join Study
[x] /api/view -> views = views + 1
[x] /api/users/:id/remove -> 특정 user remove

----------------------------------------------------------------

# Controller

[o] / -> Room Controller
[o] /login -> User Controller
[o] /join -> User Controller
[o] /logout -> User Controller
[o] /create -> Room Controller

[o] /rooms/:id -> Room Controller
[o] /rooms/:id/edit -> Room Controller
[o] /rooms/:id/delete -> Room Controller

[o] /users/profile -> User Controller
[o] /users/edit -> User Controller
[o] /users/delete -> User Controller


----------------------------------------------------------------

# Model

## User Schema {
    _id: {...},
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    studies: [{ type: ObjectId, ref: Study }],
    rooms: [{ type: ObjectId, ref: Room }]
} --> __Done__

## Room Schema {
    _id: {...},
    title: { type: String, required: true }, --- 변경 가능
    author: { type: String, required: true }, --- 변경 불가
    comments: [{ type: ObjectId, ref: Comment }], --- 
    createdAt: { type: Date, default: Date.now }, --- 변경 불가
    hashtags: [{ type: String }], --- 변경 가능
    users: [{ type: ObjectId, ref: User }], --- 변경 가능 -> 방장이 필요 시 유저 제거할 수 있는 기능
    meta: {
        views: Number, --- 변경 불가
    }
} --> __Done__

## Comment

## Study Schema {
    _id: {...},
    author: { type: String, required: true },
    targetRoom: { type: ObjectId, ref: Room },
    createdAt: { type: Date, default: Date.now },
    durations: [{ type: Number }],
    totalTime: { type: Number, default: 0 },
} --> __Done__


----------------------------------------------------------------


1. Home page

Search 랑 Hashtag 로 검색하면 관련 room 모아보기

-> 전체 rooms 보여주기
-> hashtag btn sumbit -> GET method 방식 backend 로 req.query 전송 -> rooms update 후 pug template 로 updated rooms rendering
-> search input sumbit -> GET method 방식 backend 로 req.query 전송 -> rooms update 후 pug template 로 updated rooms rendering 


----------------------------------------------------------------

2. Login page --> __Done__

-> base.pug template 에서 anchor tag 로 /login 으로의 login btn
-> GET method 로 /login 이동 -> template 통해 form 작성 -> POST method 로 /login 이동 -> form data 정보 user authentication
-> mongoDB 
-> Done login


----------------------------------------------------------------


3. Join page --> __Done__

-> base.pug template 에서 anchor tag 로 /join 으로의 join btn
-> GET method 로 /join 이동 -> template 통해 form 작성 -> POST method 로 /join 이동 -> form data 정보 user authentication
-> mongoDB 
-> Done join


----------------------------------------------------------------

4. Log out --> __Done__

-> base.pug template 에서 anchor tag 로 /logout 으로의 logout btn
-> GET method 로 /logout 이동 -> session destroy -> redirect /


----------------------------------------------------------------


5. Create Room --> __Done__

-> base.pug template 에서 anchor tag 로 /create 으로의 create btn
-> GET method 로 /create 이동 -> templace 통해 form 작성 -> POST method 로 /create 이동 
-> form data 로 mongoDB database 에 one document 생성
-> redirect /


----------------------------------------------------------------


1. Watch Room

-> Home page 에서 mixins 활용 container 클릭 시 /rooms/:id 특정 anchor 로 이동
-> GET method 에서 req.params 의 id 로 database 에서 document 발견 -> pug template 에 room 관련 form data rendering
-> __Join Study btn 생성 후 클릭 시 /api/join 으로 frontend 단의 fetch 활용__
-> POST 방식의 fetch 활용해서 api 사용
-> api : Room model users 에 user objectId push & User model rooms 에 room objectId push


----------------------------------------------------------------


7. Edit Room

-> /rooms/:id 에 ./edit 을 통해 /rooms/:id/edit 로 이동하는 anchor btn 생성
-> GET method 로 req.params 의 id 로 database 에서 document 발견 -> pug template 에 기존 data 를 input value 로 설정
-> 변경 가능 정보 : title 수정 & users 삭제
-> room 관련 전체 정보를 pug template 으로 보여주고 title 은 input value로 설정해서 수정가능하게
-> __users 역시 btn 으로 생성 후 삭제 가능하게__ -> api 활용해서 user

----------------------------------------------------------------

## 남은 과정

1. userController 
   1. profile
   2. edit
   3. remove
2. homepage
   1. search input -> query args 활용 GET method
   2. filtering btn -> frontend api 전송 -> ??
3. watchRoom
   1. __Join Study btn 생성 후 클릭 시 /api/join 으로 frontend 단의 fetch 활용__
   2. -> POST 방식의 fetch 활용해서 api 사용
   3. -> api : Room model users 에 user objectId push & User model rooms 에 room objectId push
4. 공부하는 studyroom 생성
   1. createRoom 시 studyRoom 생성
5. editRoom
   1. __users 역시 btn 으로 생성 후 삭제 가능하게__ -> api 활용해서 user
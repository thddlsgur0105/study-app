# 스터디 팀 매칭앱

1. 해당 조건을 **Hashtags** 로 필터링해서 검색하면 관련된 스터디 구인 **Room** 이 검색됨
2. **Room** 내에서 **form** 활용해서 **Study Room** 생성
3. **Room** 내에서 **Comment** 작성 기능
4. **Study** 내에서 **User** 들이 공부 관련 시간 기록 **form**
5. **Study model database** 에 **document** 생성
6. 날짜마다 공부한 친구들의 시간 정보 기록

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

[x] /users/:id -> See User Profile
[x] /users/:id/edit -> Edit My Profile -> __form__
[x] /users/:id/delete -> Delete User
[x] /users/:id/change-password -> Change Password -> __Done__

## apiRouter --> __차후에 라우터 & 컨트롤러 만들기__

[o] /api/:id/join -> :id 인 Study 로 Join
[x] /api/view -> views = views + 1
[x] /api/users/:id/remove -> 특정 user remove

## studyRouter

[x] /studies/:id -> Watch my study room

----------------------------------------------------------------

## Controller

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

## Model

### User Schema
    {
    _id: {...},
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    studies: [{ type: ObjectId, ref: Study }],
    rooms: [{ type: ObjectId, ref: Room }]
    }

## Room Schema 
    {
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
    }

## Comment

## Study Schema 
    {
    _id: {...},
    author: { type: String, required: true },
    targetRoom: { type: ObjectId, ref: Room },
    createdAt: { type: Date, default: Date.now },
    durations: [{ type: Number }],
    totalTime: { type: Number, default: 0 },
    }


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


6. Watch Room

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

8. Watch StudyRoom

-> /rooms/:id 에서 anchor 통해 studyRoom 으로 이동
-> frontend 에서는 api 통해 btn click 시 fetch를 통해 특정 room과 연결된 study의 member list에 currentUser _id 추가
-> if currentUser is member 이면 참여 취소 btn 으로 변경
-> else 참여하기 btn 그대로 유지
-> member 가 공부 post 를 업로드 할 수 있는 anchor btn
-> 전체 members 의 공부 기록을 표시하는 graph? -> __추가적인 라이브러리 필요__
-> post 를 해당 날짜에 upload 할 수 있는 기능 

----------------------------------------------------------------

9. Change Password

-> /change-password

----------------------------------------------------------------

10. Study Template

-> Controller에서부터 study document를 받아서 pug template에 전달
-> 멤버 별 username
-> study author username
-> __POSTS__ 게시 기능

----------------------------------------------------------------

11. frontend 작업

-> scss 활용?
-> webpack configuration
-> wetube course webpack configuration 강의 듣고 넘어가는 걸로


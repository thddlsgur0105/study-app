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

## globalRouter

/ -> Home -> Search 랑 Hashtag 로 검색하면 관련 post 모아보기
/login -> Login
/join -> Join
/logout -> Logout

## roomRouter

/rooms/create -> Create Room
/rooms/:id -> Watch Room
/rooms/:id/edit -> Edit Room
/rooms/:id/delete -> Delete Room

## userRouter

/users/profile -> See My Profile
/users/edit -> Edit My Profile
/users/delete -> Delete User

## apiRouter

/api/join -> Join Study
/api/view -> views = views + 1

----------------------------------------------------------------


# Model

## User Schema {
    _id: {...},
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    location: String,
    studies: [{ type: ObjectId, ref: Study }]
}

## Room Schema {
    _id: {...},
    title: { type: String, required: true },
    author: { type: String, required: true },
    comments: [{ type: ObjectId, ref: Comment }],
    createdAt: { type: Date, default: Date.now },
    hashtags: [{ type: String }],
    friends: [{ type: ObjectId, ref: User }],
    meta: {
        views: Number,
    }
}

## Comment

## Study Schema {
    _id: {...},
    target: { type: ObjectId, ref: Room },
    createdAt: { type: Date, default: Date.now },
    startTime: { type: Date },
    startLunch: { type: Date },
    
}
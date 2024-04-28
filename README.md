# Nomad Twitter Clone Coding

## 페이지 구현 스크린샷

### Enter : 로그인 되지 않은 유저가 처음으로 보게 될 로그인 화면
![Screenshot 2024-04-29 at 12 15 55 AM](https://github.com/Eastynfromeast/nomad-twitter-by-nulnu/assets/95607479/1c9a7643-28e6-4ca2-81a2-8ebde65d38b7)

### Join : 회원가입이 되어 있지 않은 혹은 로그인 페이지에서 회원가입 글귀를 누르면 나오게 될 회원가입 화면
![Screenshot 2024-04-29 at 12 16 02 AM](https://github.com/Eastynfromeast/nomad-twitter-by-nulnu/assets/95607479/cd4b1891-ca5d-4953-a4ab-a5316b59763b)

### Home : 로그인이 완료된 유저가 이동될 홈페이지
![Screenshot 2024-04-29 at 12 08 22 AM](https://github.com/Eastynfromeast/nomad-twitter-by-nulnu/assets/95607479/6639f868-32df-414f-bedd-3a5036fbb22c)


### Individual Tweet : 개별 트윗을 클릭했을 때 이동할 페이지
![Screenshot 2024-04-29 at 12 08 34 AM](https://github.com/Eastynfromeast/nomad-twitter-by-nulnu/assets/95607479/248f1f73-e5ad-4e34-9ac7-823628f0863a)

### Write : 유저가 트윗을 작성하는 페이지
![Screenshot 2024-04-29 at 12 10 23 AM](https://github.com/Eastynfromeast/nomad-twitter-by-nulnu/assets/95607479/cefc310d-5171-4e7f-85b4-cc279f34c97e)

### Profile : 유저의 프로필을 볼 수 있는 페이지
![Screenshot 2024-04-29 at 12 08 38 AM](https://github.com/Eastynfromeast/nomad-twitter-by-nulnu/assets/95607479/9aee6f38-10c3-45aa-abe9-2b0dfc69400c)



## 요구 사항
- **NextJS**, **Prisma**, **Tailwind**, **API Routes** 그리고 **SWR** 를 활용하여 아래 페이지를 완성합니다.
- `/` : 로그인 여부를 확인하여 로그인이 되어있다면 홈페이지를 그렇지 않다면 계정 생성 / 로그인 페이지로 이동하세요.
- `/create-account` : 계정을 생성하는 페이지입니다.
- `/log-in` : 로그인을 진행하는 페이지입니다.
- `/tweet/[id]` : 트윗의 상세 정보를 보는 페이지 입니다.

### **`/`:**

- After logging in, in the Home Page, the user should see all the Tweets on the database, the user should also be able to `POST` a Tweet.
- 로그인이 완료되었을 경우, 사용자는 데이터베이스에 존재하는 모든 트윗을 볼 수 있어야 합니다.
- 또한 트윗을 작성할 수 있어야 합니다.

### **`/tweet/[id]`:**

- The user should be able to see the tweet + a `Like` button.
- When the `Like` button is pressed, save the like on the database and reflect the update using `mutate` from `useSWR`.
- 사용자는 id에 해당하는 트윗의 내용과 `좋아요` 버튼을 볼 수 있어야 합니다.
- `좋아요`버튼을 클릭했 을 경우 좋아요의 상태값이 데이터베이스에 저장되어야 하며 `useSWR`의 `mutate`를 사용하여 업데이트를 반영해야 합니다.

### **참고사항**

- 챌린지 blueprint에는 `SQLite`을 기반으로 한 `Prisma`가 설정되어있습니다.
- `prisma.schema`파일을 변경했다면 `npm run db-sync`를 실행하세요.
- `SWR`와 `tailwind`도 챌린지 blueprint에 설정되어 있습니다.


### nomad-twitter-by-nulnu

## 앞으로 추가하고 싶은 사항
- 로그아웃
- 프로필 수정 기능
- 트윗 수정 / 삭제 기능


FROM node:14-alpine

# 앱 소스 추가
COPY . ./app

# 앱 디랙터리 생성
WORKDIR /app

# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY package*.json ./
COPY tsconfig.json ./

# 추후 --production 옵션으로 실행할 수 있게 변경하기
RUN npm ci

EXPOSE 3000

ENV NODE_ENV production

CMD [ "npm", "run", "start" ]
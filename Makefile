# 사용법: make build -e tag=0.1.1

tag ?= latest

build:
	docker build . -t knownow/word-server:${tag}
clean:
	docker rmi -f knownow/word-server:${tag}
run:
	docker run -d -p 3000:3000 --name word-server knownow/word-server:${tag}

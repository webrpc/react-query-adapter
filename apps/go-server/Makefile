all:
	@echo "please read Makefile source or README to see available commands"

generate: generate-server generate-client

generate-server:
	webrpc-gen -schema=example.ridl -target=go -pkg=main -server -out=./server/example.gen.go

generate-client:
	webrpc-gen -schema=example.ridl -target=ts -client -out=./webapp/src/client.gen.ts

bootstrap:
	rm -rf webapp/node_modules
	cd webapp && pnpm i

run-server:
	@go run ./server

run-client:
	@cd webapp && pnpm start

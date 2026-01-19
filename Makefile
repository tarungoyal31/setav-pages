# Makefile

.PHONY: run_local build start_local_server swag_gen deploy

run_local:
	npm start

build:
	npm run build

start_local_server:
	server -s build

swag_gen:
	wget http://localhost:8080/swagger/doc.json
	npx swagger-typescript-api -p doc.json -o ./src/swag/
	mv doc.json ./src/swag/doc.json

deploy:
	npm run build
	firebase deploy --only hosting

firebase_login:
	firebase login --reauth


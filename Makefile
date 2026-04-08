# Makefile

.PHONY: run_local build start_local_server swag_gen deploy preview og-image fetch-youtube

fetch-youtube:
	node scripts/fetch-youtube-videos.mjs

build: fetch-youtube
	npm run build

start_local_server:
	server -s build

swag_gen:
	wget http://localhost:8080/swagger/doc.json
	npx swagger-typescript-api -p doc.json -o ./src/swag/
	mv doc.json ./src/swag/doc.json

preview:
	npm run preview

og-image:
	node scripts/capture-og-image.mjs

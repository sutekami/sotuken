DOCKER_COMPOSE = sudo docker compose
DOCKER_PS = sudo docker compose ps -q

migrate:
	$(DOCKER_COMPOSE) run --rm express bash -lc 'yarn prisma migrate dev'
status:
	$(DOCKER_COMPOSE) run --rm express bash -lc 'yarn prisma migrate status'
enter-mysql:
	sudo docker exec -it $$($(DOCKER_COMPOSE) ps -q mysql) bash -lc 'mysql -uroot -proot -Dmydb'
yarn_express:
	$(DOCKER_COMPOSE) run --rm express bash -lc 'yarn'
yarn_svelte:
	$(DOCKER_COMPOSE) run --rm svelte bash -lc 'yarn'
enter-svelte:
	$(DOCKER_COMPOSE) run --rm svelte bash
enter-express:
	$(DOCKER_COMPOSE) run --rm express bash
build_vite:
	$(DOCKER_COMPOSE) run --rm svelte bash -lc 'yarn vite build'
build_express:
	$(DOCKER_COMPOSE) run --rm express bash -lc 'yarn webpack --config ./webpack.config.js'

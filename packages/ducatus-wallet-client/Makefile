.PHONY: cover

BIN_PATH:=node_modules/.bin/

all:	ducatus-wallet-client.js

clean:
	rm ducatus-wallet-client.js

ducatus-wallet-client.js: index.js lib/*.js
	${BIN_PATH}browserify $< > $@

cover:
	./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha -- --reporter spec test

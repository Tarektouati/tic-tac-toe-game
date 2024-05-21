# tic-tac-toe Managed Component & Worker

## Documentation

This repo relies on [pnpm](https://pnpm.io/) and pnpm workspaces to cohabit Managed component/ Worker / common game logic

### Managed Component

### Node version

- I encountered some issues with `node@v20.12.2` downgraded back to `node@v18.20.2` and everything seems to be working well

### Scripts

Root's `package.json` defines useful scripts.
Script `pnpm mc:dev` will execute `webcm src http://localhost:8000` in in mc-tic-tac-toe where :

- `src` : Managed component path
- `http://localhost:8000` Host target

Deploy first the worker by running `pnpm worker:deploy` based on `wrangler deploy` command. Once deployed copy the worker URL and and replace this line `const WORKER_URL = '<DEFINE_YOUR WORKER_URL>';` located in `packages/mc-tic-tac-toe/src/index.ts`

 Tried to pass worker URL thought settings flag, with `--settings_workerUrl=http://localhost:8787`. Unfortunately, webcm doesn't take in count `--settings_workerUrl` flag see [cloudflare/webcm/manager.ts#L286](https://github.com/cloudflare/webcm/blob/f52f1306869f37279aa045b66e56fdb64c7c0a93/src/manager.ts#L286) patching it end up with node.js `ECONNREFUSED` errors.

## 📝 License

Licensed under the [Apache License](./LICENSE).

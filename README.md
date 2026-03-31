# VALORANT Overlay

This is a customizable overlay that displays rank and win/loss count via OBS browser source.

## Requirements

- Windows 10 or later
- [bun](https://bun.com/)（Package management, build, and execution environment）
- [HENRIKDEV](https://docs.henrikdev.xyz/)（VALORANT API）

### Libraries

- [hono](https://hono.dev/)（Web server and API endpoint creation）

## Installation

```powershell
# Current directory: ~/valorant_overlay_exe
bun install     # Install dependencies
bun run build   # Generated files are in the dist directory
```

## How to Run

Run the generated `valorant_overlay.exe` or use the following command to start the server for development preview.

```powershell
# Current directory: ~/valorant_overlay_exe
bun run dev
```

After starting, specify the URL in the OBS browser source as\
`http://localhost:8888/?region=<REGION>&name=<NAME>&tag=<TAG>&platform=<PLATFORM>`

### Parameters

・REGION（Play Region）※required\
Available values: eu, na, latam, br, ap, kr

・NAME（Riot ID）※required

・TAG（The tag starts with #）※required

・PLATFORM ※optional\
Available values: pc, console

## License

This project is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).

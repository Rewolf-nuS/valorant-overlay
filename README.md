# VALORANT Overlay

This is a customizable overlay that displays rank and win/loss count via OBS browser source.

## Requirements

- Windows 10 or later
- [Bun](https://bun.com/) (Package manager, build, and runtime environment)
- [HenrikDev VALORANT API](https://docs.henrikdev.xyz/) (Used for data fetching)

## Setup Instructions

### 1. Get an API Key

You will need a HenrikDev API key to use this tool.

1. Visit the [HenrikDev API Dashboard](https://dash.henrikdev.xyz/), create an account, and generate an API key.

### 2. Configure Environment Variables

Copy `.env.example` to `.env` in the root directory and add your API key.

```powershell
cp .env.example .env
```

`.env` content:

```env
HENRIK_API_KEY=your_api_key_here
PORT=8888
```

### 3. Install and Build

```powershell
# Install dependencies
bun install

# Build client and server (output will be in the dist directory)
bun run build
```

## How to Run

Run the generated `dist/valorant_overlay.exe` or use the following command to start the server for development preview.

```powershell
# Start development server
bun run dev
```

## OBS Configuration

1. Add a **Browser Source** in OBS.
2. Enter the following URL (replace parameters with your own info):\
   `http://localhost:8888/?region=ap&name=YourName&tag=YourTag&platform=pc`
3. **Recommended Size**: Width 1500px, Height 400px (Adjust to fit your design).

### URL Parameters

| Parameter  | Description               | Possible Values / Example             |
| :--------- | :------------------------ | :------------------------------------ |
| `region`   | Play Region (Required)    | `ap`, `na`, `eu`, `kr`, `latam`, `br` |
| `name`     | Riot ID (Required)        | e.g., `Username`                      |
| `tag`      | Tag (Required, without #) | e.g., `JP1`                           |
| `platform` | Platform (Optional)       | `pc`, `console` (Default: `pc`)       |

## Customization

To change the look and feel, edit the files in `dist/client/`.

- **Background Image**: Replace `dist/client/bg.jpg` with your desired image (JPEG format).
- **Styles (CSS)**: Edit `dist/client/style.css` to change colors or filter opacity.
  - `--text-color`: Text color
  - `--bg-url`: Background image path or URL
  - `--bg-filter`: Opacity of the black background filter (0 to 1)

## Troubleshooting

- **Error: "Failed to start server. Is port 8888 in use?"**
  - Another application is using port 8888. Change the `PORT` value in your `.env` file to something else like `8889`.
- **Data not showing (401 Unauthorized)**
  - Check your `.env` file to ensure the API key is correct.
- **Data not showing (404 Not Found)**
  - Double-check your Riot ID, Tag, and Region.

## Developer Info

### Directory Structure

- `client/`: Frontend TypeScript code, HTML, and CSS.
- `server/`: Hono API server and static file serving.
- `dist/`: Build artifacts and standalone executable.
- `build.bat`: Windows build script.

## License

This project is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).

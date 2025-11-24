# DnD Character Sheet

This is my personal project where I'm experimenting with some libraries for the React framework,
particularly [Jotai](https://github.com/pmndrs/jotai) and [MUI](https://mui.com/). Currently, the project is a simple
character sheet interface for DnD, and it's quite basic, with more features planned to be added gradually. The only
client-side persistence lives in the browser's `localStorage`, so the demo can stay fully static.

## Live Demo

[Open the GitHub Pages build](https://alfonsZelicko.github.io/dnd-character-sheet/)

The demo is published automatically from `main` whenever the workflow in `.github/workflows/deploy-demo.yml` succeeds.

## Project Setup

- **Node Version**: 20.17
- **Build Tool**: Vite

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install

2. Run the development server:
    ```bash
    vite

3. Build a Chrome extension:
    ```bash
   vite build

... the Extension will be built into the {root}/dist folder -> this needs to be added into the Chrome as usually

# TODO
- add "custom xml layout configuration"
- add more features: 
   - companion list
   - better inventory
   - detailed features, etc. ...
- Future Plans - As this project evolves, I may consider porting it to Electron for a desktop app experience. If you’d be interested in
helping out with this transition, feel free to reach out!

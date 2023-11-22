# Mobius-ext

## Introduction

**Mobius-ext** is a web extension currently in development, designed to modernize the user interface of the Mobius editor by leveraging new technologies. The project aims to replace the traditional Mobius editor interface with a more contemporary, efficient, and user-friendly design built using Svelte, TypeScript, and Tailwind CSS.

### Current Status

As of now, Mobius-ext is a work in progress and is not yet available for download or use through Firefox or Chrome extension stores. This documentation will be updated accordingly as the project progresses towards a release.

## License

This project is licensed under the MIT License. See the LICENSE file in the repository for more details.

## Project Structure

- `/src`: Main source code directory.
  - `/pages`: Contains all front-end components built with Svelte, replacing the old Mobius user interface.
  - `/bridge`: Houses web extension files, including `manifest.json`.
  - `/lib`: Utility functions used across different components.
  - `/types`: Type definitions used in the project.
- `/dist`: Compiled output files are placed here (no subfolders).

## Built With

- Svelte: Front-end framework.
- Tailwind CSS: Styling framework.
- TypeScript: Programming language.
- esbuild: Build tool.

## Installation

To install Mobius-ext:

1. Clone the repository to your local machine.
2. Run `npm install` to install dependencies.
3. Manually remove the `exports` field from the `package.json` of the `flowbite-svelte` library to resolve build issues.

## Usage

### How Mobius-ext Works

- **On Page Load**: When a URL matching the one specified in `manifest.json` is loaded, `interceptor.ts` blocks the connection to the Mobius server.
- **Script Injection**: The `init.ts` script is then injected into the page. This script refetches the original Mobius page query, prepares data, and attaches it to a global variable.
- **Svelte Front-End**: Finally, the Svelte front-end is injected, accessing the global data variable prepared by `init.ts`.

### Interacting with the Extension

- Ensure the extension is properly installed and active.
- Navigate to a Mobius-related URL.
- Experience the enhanced interface provided by Mobius-ext.

## Contributing

Contributions are welcome! If you're interested in improving Mobius-ext, please read our contributing guidelines first (link to contributing guidelines).

## Contact

For questions or suggestions, feel free to contact us (provide contact information or link to the issue tracker).

## Acknowledgments

- (Any acknowledgments to contributors, inspirations, etc.)

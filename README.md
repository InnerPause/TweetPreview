# A Simple Tweet Preview

**A Simple Tweet Preview** is a web application designed to help users preview how their tweets, including text and up to four images, will look before posting them on Twitter. This tool addresses the issue with Twitter's current compose feature, which doesn't accurately display media layouts, ensuring that the visual arrangement of images is as intended.

## Features

- **Input Fields**: Enter tweet text and username.
- **Image Upload**: Add up to four images via drag-and-drop or file selection.
- **Real-Time Preview**: See a live preview of the tweet, including profile picture, username, text, and media layout.
- **Image Reordering**: Reorder images using drag-and-drop.
- **Theme Support**: Switch between light and dark themes with persistent settings.
- **Export Options**: Export the media collage or full tweet preview as PNG images.
- **PWA Functionality**: Install the app for offline use and a native-like experience.

## Usage Instructions

### Online Version (GitHub Pages)

You can use the application directly in your browser without downloading anything. Simply visit the [GitHub Pages site](https://innerpause.github.io/TweetPreview/).

- **How to Access**:
  1. Open your web browser (e.g., Chrome, Firefox, Safari).
  2. Type or paste the URL above into the address bar and press Enter.
  3. Start using the app immediately—no installation required!

### Local Version

If you prefer to run the application locally on your computer:

1. **Clone the Repository**:
   - Open a terminal or command prompt.
   - Run the following command to download the project files:
     ```bash
     git clone https://github.com/innerpause/TweetPreview.git
     ```
   - If you don’t have Git installed, you can download the ZIP file from the GitHub repository page by clicking the green "Code" button and selecting "Download ZIP," then extract it to a folder.

2. **Navigate to the Project Directory**:
   - In your terminal, move into the project folder by typing:
     ```bash
     cd TweetPreview
     ```
   - If you downloaded the ZIP, open the extracted folder in your file explorer.

3. **Open `index.html`**:
   - Locate the `index.html` file in the project folder.
   - Double-click it to open it in your default web browser, or right-click and choose "Open with" followed by your preferred browser (e.g., Chrome).
   - The app will load and be ready to use locally.

## Patch Notes
 
* Known Issue *
In the Online version of the app, the emoji menu remains unresponsive. Currently working on this. 


### Version 1.2
- **Emoji Support**: Added an emoji picker that works both locally and online, allowing users to easily add emojis to their tweet text.
- **Interactive Like Button**: Enhanced the Tweet Preview section with an interactive Like button that animates and increments a counter when clicked, providing a more engaging user experience.
- **Image Handling Improvements**: Resolved issues with image previews to ensure they display correctly in the Tweet Preview section.
- **Local Library Integration**: Integrated local copies of Twemoji and twitter-text libraries to prevent CORS issues when running the app locally.
- **Conditional Manifest and Service Worker**: Implemented logic to manage the manifest and service worker based on the app's running environment (local or online), ensuring seamless functionality in both scenarios.

### Version 1.1
- **Rounded Corners**: Implemented for a softer, modern aesthetic, matching Twitter's visual style.
- **Image Borders**: Added borders (gaps) between images in the tweet preview for a more accurate representation.
- **Interactive Buttons**: Enhanced buttons with hover and click animations for a more responsive user experience.

## Credits

Developed by [InnerPause](https://x.com/InnerPause). Follow for updates and more projects.

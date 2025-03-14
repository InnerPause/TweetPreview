# A Simple Tweet Preview

**A Simple Tweet Preview** is a web-based tool designed to help users create and visualize Twitter posts before sharing them. It allows you to input text, add images, and see a realistic preview of how your tweet will appear on Twitter, complete with a profile picture, username, and interactive buttons. The app is perfect for anyone who wants to perfect their tweets or create mockups for social media content.

Hosted on [GitHub Pages](https://InnerPause.github.io/TweetPreview), this application is free to use and open-source.

---

## Features

- **Realistic Tweet Preview**: See exactly how your tweet will look on Twitter, including text, images, profile picture, and username.
- **Image Support**:
  - Add up to 4 images with drag-and-drop functionality.
  - Single images are cropped to 4:5 (portrait) or 16:9 (landscape) aspect ratios, mimicking Twitter's behavior.
  - Multiple images are arranged in layouts similar to Twitter's (e.g., side-by-side for two images, grid for four).
- **Export Options**:
  - Export the image collage at high resolution: 1200x1500 for portrait, 1920x1080 for landscape.
  - Export the entire tweet preview for a complete mockup.
- **Light and Dark Mode**: Toggle between themes with a button in the header, with your preference saved for future visits.
- **Responsive Design**: Optimized for both desktop and mobile devices, with a mobile-friendly file uploader.
- **Custom Profile Picture**: Automatically fetches the profile picture based on the provided Twitter username.
- **Interactive Mock Buttons**: Preview includes fake "Reply," "Retweet," "Like," and "Share" buttons for a realistic look.

---

## How to Use

1. **Access the Application**:
   - Visit [your-app-url](https://InnerPause.github.io/TweetPreview) to start using the tool.

2. **Input Tweet Details**:
   - **Tweet Text**: Enter your tweet's text in the provided textarea.
   - **Username**: Input your Twitter username (e.g., `@username`), and the app will fetch your profile picture automatically.

3. **Add Images**:
   - Drag and drop images into the drop zone or click to select files (up to 4 images).
   - On mobile, tap the drop zone to open the file picker.
   - Rearrange images by dragging them in the list, or remove them by clicking the "×" button.

4. **Preview Your Tweet**:
   - The preview updates in real-time as you edit.
   - Single images are cropped to 4:5 (portrait) or 16:9 (landscape).
   - Multiple images are arranged in Twitter-like layouts.

5. **Export Your Creation**:
   - **Export Image Collage**: Download just the image portion (1200x1500 for portrait, 1920x1080 for landscape).
   - **Export Tweet Preview**: Download the entire tweet mockup.

6. **Toggle Theme**:
   - Use the "Toggle Theme" button in the header to switch between light and dark modes.

---

## Technical Details

- **Built With**:
  - HTML, CSS, JavaScript
  - [Font Awesome](https://fontawesome.com/) for icons
  - [Sortable.js](https://sortablejs.github.io/Sortable/) for drag-and-drop functionality
  - [html2canvas](https://html2canvas.hertzen.com/) for exporting images

- **Deployment**:
  - Hosted on GitHub Pages for easy access and sharing.

- **Browser Compatibility**:
  - Works on modern browsers (Chrome, Firefox, Safari, Edge).
  - Optimized for mobile devices with touch-friendly controls.

---

## Credits

Developed by [@InnerPause](https://x.com/InnerPause). Feel free to reach out with feedback or contributions!

---

## License

This project is open-source and available under the [MIT License](LICENSE).

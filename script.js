document.addEventListener('DOMContentLoaded', () => {
    const tweetText = document.getElementById('tweet-text');
    const usernameInput = document.getElementById('username');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const imageList = document.getElementById('image-list');
    const previewProfilePic = document.getElementById('preview-profile-pic');
    const previewUsername = document.getElementById('preview-username');
    const previewText = document.getElementById('preview-text');
    const previewMedia = document.getElementById('preview-media');
    const exportCollageBtn = document.getElementById('export-collage-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const charCount = document.getElementById('char-count');
    const emojiBtn = document.getElementById('emoji-btn');
    const emojiPicker = document.getElementById('emoji-picker');
    const likeButton = document.querySelector('.like-button');
    const likeCount = document.querySelector('.like-count');

    let images = [];
    let imageId = 0;
    const MAX_CHARS = 280;

    // Theme toggle functionality
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.add(savedTheme + '-mode');
    themeToggle.textContent = savedTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.classList.remove(currentTheme + '-mode');
        document.body.classList.add(newTheme + '-mode');
        themeToggle.textContent = newTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        localStorage.setItem('theme', newTheme);
    });

    function addImage(file) {
        if (images.length >= 4) {
            alert('Maximum of 4 images allowed.');
            return;
        }
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataURL = e.target.result;
            const img = new Image();
            img.src = dataURL;
            img.onload = () => {
                const isPortrait = img.naturalHeight > img.naturalWidth;
                images.push({ id: imageId++, dataURL, isPortrait });
                renderImageList();
                updatePreview();
            };
        };
        reader.readAsDataURL(file);
    }

    function removeImage(id) {
        images = images.filter(img => img.id !== id);
        renderImageList();
        updatePreview();
    }

    function renderImageList() {
        imageList.innerHTML = '';
        images.forEach((img) => {
            const li = document.createElement('li');
            li.dataset.id = img.id;
            li.innerHTML = `
                <span class="drag-handle"><i class="fas fa-grip-vertical"></i></span>
                <img src="${img.dataURL}" alt="Tweet image">
                <button class="remove-btn" title="Remove image">×</button>
            `;
            imageList.appendChild(li);
        });
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.parentElement.dataset.id);
                removeImage(id);
            });
        });
    }

    function updatePreview() {
        const username = usernameInput.value.replace('@', '');
        previewUsername.textContent = usernameInput.value || '@username';
        previewText.textContent = tweetText.value || '';
        twemoji.parse(previewText); // Render emojis with Twemoji
        previewMedia.innerHTML = '';
        if (images.length === 0) return;

        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'media-container';

        if (images.length === 1) {
            mediaContainer.classList.add('media-one');
            if (images[0].isPortrait) mediaContainer.classList.add('portrait');
            const imgDiv = document.createElement('div');
            const img = document.createElement('img');
            img.src = images[0].dataURL;
            imgDiv.appendChild(img);
            mediaContainer.appendChild(imgDiv);
        } else if (images.length === 2) {
            mediaContainer.classList.add('media-two');
            images.forEach((imgData) => {
                const imgDiv = document.createElement('div');
                const img = document.createElement('img');
                img.src = imgData.dataURL;
                imgDiv.appendChild(img);
                mediaContainer.appendChild(imgDiv);
            });
        } else if (images.length === 3) {
            mediaContainer.classList.add('media-three');
            images.forEach((imgData) => {
                const imgDiv = document.createElement('div');
                const img = document.createElement('img');
                img.src = imgData.dataURL;
                imgDiv.appendChild(img);
                mediaContainer.appendChild(imgDiv);
            });
        } else if (images.length === 4) {
            mediaContainer.classList.add('media-four');
            images.forEach((imgData) => {
                const imgDiv = document.createElement('div');
                const img = document.createElement('img');
                img.src = imgData.dataURL;
                imgDiv.appendChild(img);
                mediaContainer.appendChild(imgDiv);
            });
        }
        previewMedia.appendChild(mediaContainer);

        // Update character count using twitter-text
        const currentLength = twttr.txt.getTweetLength(tweetText.value);
        const remaining = MAX_CHARS - currentLength;
        charCount.textContent = `${remaining} / ${MAX_CHARS}`;

        // Visual feedback for character count
        if (remaining <= 20 && remaining >= 0) {
            charCount.style.color = '#FFD700'; // Yellow when 20 or fewer characters remain
        } else {
            charCount.style.color = 'var(--text-color)'; // Default color
        }
    }

    function fetchProfilePic() {
        const username = usernameInput.value.replace('@', '');
        if (username) {
            previewProfilePic.src = `https://unavatar.io/twitter/${username}`;
        } else {
            previewProfilePic.src = 'https://via.placeholder.com/48';
        }
        previewProfilePic.onerror = () => { previewProfilePic.src = 'https://via.placeholder.com/48'; };
    }

    usernameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            fetchProfilePic();
        }
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        Array.from(files).forEach(addImage);
    });

    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        Array.from(files).forEach(addImage);
        e.target.value = '';
    });

    new Sortable(imageList, {
        animation: 150,
        handle: '.drag-handle',
        onEnd: (evt) => {
            const movedItem = images.splice(evt.oldIndex, 1)[0];
            images.splice(evt.newIndex, 0, movedItem);
            updatePreview();
        }
    });

    tweetText.addEventListener('input', updatePreview);
    usernameInput.addEventListener('input', updatePreview);

    // Emoji picker setup based on protocol
    if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
        // Online: load emoji-button library
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@joeattardi/emoji-button@4.6.0/dist/index.min.js';
        script.onload = () => {
            const picker = new EmojiButton();
            picker.on('emoji', (selection) => {
                tweetText.value += selection.emoji;
                updatePreview();
            });
            emojiBtn.addEventListener('click', () => {
                picker.togglePicker(emojiBtn);
            });
        };
        document.head.appendChild(script);
    } else {
        // Local: use custom emoji picker
        emojiBtn.addEventListener('click', () => {
            emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
        });
        document.querySelectorAll('.emoji').forEach(emoji => {
            emoji.addEventListener('click', () => {
                tweetText.value += emoji.dataset.emoji;
                updatePreview();
                emojiPicker.style.display = 'none';
            });
        });
    }

    // Remove manifest link if running locally
    if (window.location.protocol === 'file:') {
        const manifestLink = document.querySelector('link[rel="manifest"]');
        if (manifestLink) {
            manifestLink.remove();
        }
    }

    // Register service worker only if running online
    if (window.location.protocol !== 'file:' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.register('/TweetPreview/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered');
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }

    // Like button interactivity
    likeButton.addEventListener('click', () => {
        let currentCount = parseInt(likeCount.textContent);
        likeCount.textContent = currentCount + 1;
        likeButton.classList.add('liked');
        setTimeout(() => {
            likeButton.classList.remove('liked');
        }, 500); // Animation duration: 500ms
    });

    function exportElement(element, filename) {
        const isPortraitCollage = images.length === 1 && images[0].isPortrait;
        const desiredWidth = isPortraitCollage ? 1200 : 1920;
        const currentWidth = element.offsetWidth;
        const scale = desiredWidth / currentWidth;
        html2canvas(element, {
            scale: scale,
            useCORS: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = filename;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }

    exportCollageBtn.addEventListener('click', () => {
        exportElement(previewMedia, 'tweet-collage.png');
    });

    updatePreview();
    fetchProfilePic(); // Initial fetch on page load
});

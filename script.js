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
const exportTweetBtn = document.getElementById('export-tweet-btn');
const themeToggle = document.getElementById('theme-toggle');

let images = [];
let imageId = 0;

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
    if (username) {
        previewProfilePic.src = `https://unavatar.io/twitter/${username}`;
    } else {
        previewProfilePic.src = 'https://via.placeholder.com/48';
    }
    previewProfilePic.onerror = () => { previewProfilePic.src = 'https://via.placeholder.com/48'; };
    previewText.textContent = tweetText.value || '';
    previewMedia.innerHTML = '';
    if (images.length === 0) return;

    const mediaContainer = document.createElement('div');
    mediaContainer.className = `media-container media-${images.length === 1 ? 'one' : images.length === 2 ? 'two' : images.length === 3 ? 'three' : 'four'}`;
    if (images.length === 1) {
        mediaContainer.classList.add(images[0].isPortrait ? 'portrait' : 'landscape');
        const imgDiv = document.createElement('div');
        const img = document.createElement('img');
        img.src = images[0].dataURL;
        imgDiv.appendChild(img);
        mediaContainer.appendChild(imgDiv);
    } else if (images.length === 2) {
        images.forEach((imgData) => {
            const imgDiv = document.createElement('div');
            const img = document.createElement('img');
            img.src = imgData.dataURL;
            imgDiv.appendChild(img);
            mediaContainer.appendChild(imgDiv);
        });
    } else if (images.length === 3) {
        const leftDiv = document.createElement('div');
        const leftImg = document.createElement('img');
        leftImg.src = images[0].dataURL;
        leftDiv.appendChild(leftImg);

        const rightDiv = document.createElement('div');
        const topRightDiv = document.createElement('div');
        const topRightImg = document.createElement('img');
        topRightImg.src = images[1].dataURL;
        topRightDiv.appendChild(topRightImg);
        const bottomRightDiv = document.createElement('div');
        const bottomRightImg = document.createElement('img');
        bottomRightImg.src = images[2].dataURL;
        bottomRightDiv.appendChild(bottomRightImg);

        rightDiv.appendChild(topRightDiv);
        rightDiv.appendChild(bottomRightDiv);
        mediaContainer.appendChild(leftDiv);
        mediaContainer.appendChild(rightDiv);
    } else if (images.length === 4) {
        images.forEach((imgData) => {
            const imgDiv = document.createElement('div');
            const img = document.createElement('img');
            img.src = imgData.dataURL;
            imgDiv.appendChild(img);
            mediaContainer.appendChild(imgDiv);
        });
    }
    previewMedia.appendChild(mediaContainer);
}

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

exportTweetBtn.addEventListener('click', () => {
    exportElement(document.getElementById('tweet-preview'), 'tweet-preview.png');
});

updatePreview();
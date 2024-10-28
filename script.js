// JavaScript to open the URL of each task box when clicked

document.addEventListener('DOMContentLoaded', () => {
    const taskBoxes = document.querySelectorAll('.task-box');

    taskBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const url = box.getAttribute('data-url');
            window.open(url, '_blank'); // Open URL in a new tab
        });
    });
});


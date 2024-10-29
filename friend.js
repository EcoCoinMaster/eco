document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the current user's name from localStorage
    const userName = localStorage.getItem('user') || "No Name"; // Default to "No Name" if not found
    const friendCountElement = document.querySelector(".friend-count");
    const inviteButton = document.querySelector(".invite-button");
    const friendInfo = document.querySelector(".friend-info");
    const userNameElement = document.querySelector(".user-name");
    const lionsCountElement = document.querySelector(".lions-count");

    // Initialize friend data from localStorage
    let invitedFriends = JSON.parse(localStorage.getItem("invitedFriends")) || [];
    updateFriendInfo();

    // Set the current user's name
    userNameElement.innerText = invitedFriends.length === 0 ? "No one invited" : invitedFriends[invitedFriends.length - 1];

    // Set up the invite button to share invite link via Telegram
    inviteButton.addEventListener("click", () => {
        const inviteLink = `${window.location.origin}/friend.html?referrer=${userName}`;
        const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent("Join me on Lions Wallet and earn bonus Lions!")}`;

        // Open Telegram share URL
        window.open(telegramShareUrl, '_blank');
    });

    // Check if a friend joined via the invite link
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = urlParams.get("referrer");

    if (referrer && !invitedFriends.includes(referrer)) {
        invitedFriends.push(referrer); // Add the new friend
        localStorage.setItem("invitedFriends", JSON.stringify(invitedFriends)); // Save to localStorage

        // Update the balance (e.g., +359 Lions for each friend)
        let balance = parseInt(localStorage.getItem('balance')) || 100;
        balance += 359;
        localStorage.setItem('balance', balance);

        updateFriendInfo(); // Update UI to reflect new friend data
    }

    // Function to update friend info display
    function updateFriendInfo() {
        if (invitedFriends.length > 0) {
            friendCountElement.innerText = `${invitedFriends.length} friend(s)`;
            userNameElement.innerText = invitedFriends[invitedFriends.length - 1]; // Show the latest invited friend
            lionsCountElement.innerText = "+359 LIONS";
        } else {
            friendCountElement.innerText = ""; // Hide count when no friends are invited
            userNameElement.innerText = "No one invited"; // Initial text
            lionsCountElement.innerText = "+0 LIONS";
        }
    }
});

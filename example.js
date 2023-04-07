const POLL_RATE = 500;

setInterval(
    async () => {
        message = await fetch('https://api.mychatapp.com/messages')
    },
    POLL_RATE
);
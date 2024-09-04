const playAudioNotification = () => {
    const audio = new Audio('https://storage.googleapis.com/chatpilot/sounds/new_message.wav');
    audio.play();
};

export default playAudioNotification;

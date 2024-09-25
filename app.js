const startCallButton = document.getElementById('startCall');
const endCallButton = document.getElementById('endCall');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');
const messagesDiv = document.getElementById('messages');

let localStream;
let peerConnection;
const configuration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

startCallButton.onclick = startCall;
endCallButton.onclick = endCall;
sendMessageButton.onclick = sendMessage;

async function startCall() {
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    peerConnection = new RTCPeerConnection(configuration);
    peerConnection.addTrack(localStream.getTracks()[0], localStream);

    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            // Send candidate to remote peer
        }
    };

    peerConnection.ontrack = event => {
        // Handle remote track
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    // Send offer to remote peer
}

function endCall() {
    peerConnection.close();
    localStream.getTracks().forEach(track => track.stop());
    console.log('Call ended');
}

function sendMessage() {
    const message = messageInput.value;
    if (message) {
        messagesDiv.innerHTML += `<div>${message}</div>`;
        messageInput.value = '';
        // Send message to remote peer
    }
}
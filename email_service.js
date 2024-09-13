const { v4: uuidv4 } = require('uuid');

function sendNotification(notification, receiverIds) {

    const RETURN_CODE_TO_STATUS = {
        0: 'SUCCESS',
        1: 'PENDING',
        2: 'FAILED'
    }
    // send email
    let statusNum = Math.ceil(Math.random(1, 100) * 10) % 3
    console.log(statusNum)
    console.log(`email sending status of notification with id: ${notification.notificationId}  and receiver ids: ${receiverIds} is ${RETURN_CODE_TO_STATUS[statusNum]}`)
    return [RETURN_CODE_TO_STATUS[statusNum], uuidv4()]
}

module.exports = {
    sendNotification
}
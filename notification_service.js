const { v4: uuidv4 } = require('uuid');
const { sendNotification: sendEmail } = require('./email_service.js')



//Current Price of Bitcoin, Daily Percentage Change, Trading Volume
class Notification {
    constructor(...params) {
        this.notificationId = uuidv4();
        this.notificationData = params;
    }
}

class NotificationInstance {


    static STATUS = {
        SUCCESS: 'SUCCESS',
        PENDING: 'PENDING',
        FAILED: 'FAILED'
    }


    constructor(notification, receiverIds = []) {
        this.notificationId = notification.notificationId
        this.receiverIds = receiverIds
        this.status = 'PENDING'
    }

    setStatus(notification, status) {
        notification.status = status
    }
}


class NotificationService {




    constructor() {
        // will store all the notifications
        this.notifications = {}
        // will store instance of each notifcations, like if that same notifcaiton is being send multiple times then {notificationId: [{ status:'SUCCESS', receiver: 'email' }, { status:'PENDING', receiever: 'email' }]}
        this.notificationInstances = {}
        this.EMAIL_SERVICE_STATUS_TO_NOTIFICATION_SERVICE_STATUS = {
            SUCCESS: 'SUCCESS',
            PENDING: 'PENDING',
            FAILED: 'FAILED'
        }
    }


    _addNotification = (notification) => {
        if (!notification || !notification.notificationId) {
            throw 'Notification is not valid'
        }
        this.notifications[notification.notificationId] = notification
    }



    createNotification = (...params) => {
        let notification = new Notification(params)
        this._addNotification(notification)
        return notification.notificationId
    }


    sendNotification = (notificationId, receiverIds) => {


        if (!this.notifications[notificationId]) {
            throw 'Notification not found'
        }

        let notificationInstance = new NotificationInstance(this.notifications[notificationId], receiverIds)
        if (!this.notificationInstances[notificationId]) {
            this.notificationInstances[notificationId] = []
        }

        let [status, ackId] = sendEmail(this.notifications[notificationId], receiverIds)

        notificationInstance.ackId = ackId
        notificationInstance.status = status

        this.notificationInstances[notificationId].push(notificationInstance)


        return [status, ackId]

    }


    getNotfications = (status) => {

        if (!status || !Object.values(NotificationInstance.STATUS).includes(status)) {
            throw 'status is not valid'
        }

        let notifications = []
        for (let notificationId in this.notificationInstances) {
            let notificationInstances = this.notificationInstances[notificationId]
            // console.log(notificationInstances)
            notificationInstances.filter(nf => nf.status === status).map(nf => {
                notifications.push({
                    notificationId: nf.notificationId,
                    status: nf.status,
                    ackId: nf.ackId,
                    receiverIds: nf.receiverIds,
                    notificationData: this.notifications[nf.notificationId].notificationData
                })
            })
        }

        return notifications
    }

}





module.exports = {
    NotificationService
}
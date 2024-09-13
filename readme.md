
instructions:


install node js with version 20.17.0

run below commands:
npm i
node server.js



test the APIs:

POST http://localhost:3200/v1/create-notification
requestbody:
{
    priceOfBitCoin: 100,
    dailyPercentageChange: 10,
    tradingVolume: 1000
}

response: 
{"notificationId":"3d19458e-8b0d-444a-b2f4-a7648fa177e0"}

POST http://localhost:3200/v1/send-notification
request Body:
{
    "notificationId": "75a82274-5f8f-48fd-9a1b-5ccb7273f241",
    "receiverIds" : ["email"]
}

response 
["SUCCESS","4347b3f7-de04-49a4-8a1c-73e1c21d0264"]



GET http://localhost:3200/v1/get-notification?status=SUCCESS


----
problem


Create a crypto notification service as an HTTP Rest API server


Create a Notification (Input parameters: Current Price of Bitcoin, Daily Percentage Change, Trading Volume, etc)

Send a notification to email/emails

List notifications (Sent, Pending, Failed)

Update/Delete notification


ajsrinivas@bitgo.com

9008003968

--- code to test---


// // Current Price of Bitcoin, Daily Percentage Change, Trading Volume
// let notificationData = {
//     priceOfBitCoin: 100,
//     dailyPercentageChange: 10,
//     tradingVolume: 1000
// }

// let notificationId = notificationService.createNotification(notificationData)
// let ackId1 = notificationService.sendNotification(notificationId, ['singhnitesh2311@gmail.com'])

// //sending same notification to other receiver
// let ackId2 = notificationService.sendNotification(notificationId, ['ajsrinivas@gmail.com'])

// // console.log(notificationService.notificationInstances)

// console.log(JSON.stringify(notificationService.getNotfications('PENDING')))
// console.log(JSON.stringify(notificationService.getNotfications('SUCCESS')))
// console.log(JSON.stringify(notificationService.getNotfications('FAILED')))

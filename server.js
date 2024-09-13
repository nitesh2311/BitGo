let { NotificationService } = require('./notification_service.js')

let notificationService = new NotificationService()




const express = require('express');
const http = require('http');
// const httpStatus = require('http-status');
// const routes = require('./routes/v1');

const app = express();


// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));


// v1 api routes
app.post('/v1/create-notification', (req, res) => {
    try {
        let r = notificationService.createNotification(req.body)
        res.status(200).json({ notificationId: r })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error' })
    }
});


app.post('/v1/send-notification', (req, res) => {
    try {
        let notificationId = req.body.notificationId
        let receiverIds = req.body.receiverIds
        let r = notificationService.sendNotification(notificationId, receiverIds)
        res.status(200).json(r)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error' })
    }
});

app.get('/v1/get-notification', (req, res) => {
    try {
        let status = req.query.status
        let r = notificationService.getNotfications(status)
        res.status(200).json(r)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
});


// send back a 404 error for any unknown api request
app.use((req, res) => {
    res.status(404).json({ message: 'NOT FOUND' })
});


app.set('port', 3200);


http.createServer(app).listen(app.get('port'), () => {
    app.set('initialized', true);
    app.emit('app:initialized');

    console.log(`server started on port: ${app.get('port')}`)
})
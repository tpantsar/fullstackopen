## Add these fields to the .env file:
```
PORT=3001

MONGODB_URI=mongodb+srv://<username>:<password>@fullstackopen.qorqt.mongodb.net/<database>?retryWrites=true&w=majority&appName=<app-name>
TEST_MONGODB_URI=MONGODB_URI=mongodb+srv://<username>:<password>@fullstackopen.qorqt.mongodb.net/<testDatabase>?retryWrites=true&w=majority&appName=<app-name>

SECRET=<secret>
```
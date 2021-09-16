# Software Development - Backend Challenge A

## Steps to run this project:

1. Make sure that NodeJS is installed on host machine
2. Run `npm install` to download all dependencies
3. Make sure that the host machine can run Docker containers
4. Run `docker-compose up --build` to start the application
5. Go to `http://localhost:3000` to start making requests

## API Routes

-   `POST /send_message`
    -   Send a message to a chat room with a certain id
    -   Request body requirement:
        -   chat_id: the id of the chatroom. Required string field and can only contains alphanumeric characters
        -   sender: Name of the sender of the message. Required string and can only contains alphanumeric characters
        -   message: Message that is sent to the chat room. Required string and can contains only ASCII characters
-   `POST /read_messages`
    -   Fetch all messages (or those of a certain sender) of a certain group chat.
    -   Request body requirement:
        -   chat_id: the id of the chatroom. Required string field and can only contains alphanumeric characters
        -   sender: Name of the sender whose messages are needed. Optional string and can only contains alphanumeric characters. If this field is not provided, then all messages of the chat room will be returned

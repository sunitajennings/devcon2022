# Resolving Missed Connections
_a fintech_devcon 2022 workshop_

We’ve prepared a few exercises designed to simulate particular error conditions.
Your objective is to:
1. identify the error condition (in code), 
2. make a choice about logging or alerting, and 
3. react to the condition in a way that best supports your user in their goal.

In each of these exercises, you represent a developer at AwesomeMoney, an app that handles a plethora of personal finance management task for their users. "Betty" is the user interacting with your app, and she needs to verify an account so that she can move money. Keep reading for more detail... 

or [Skip to the exercises](#your-turn)

## Meet Betty, your user

Betty is using AwesomeMoney to transfer rent money to her new landlord, but first needs to verify her bank account information. 

AwesomeMoney will use Betty’s retrieved account and routing numbers to create the ACH transfer. 

Betty walks through instant account verification, following AwesomeMoney’s prompts to select her bank, enter her credentials, and select the account she wants to verify.

## Let's work through an example where something goes wrong (discussion + live code)

Betty searches for & selects her bank, but after she enters her credentials, the bank responds with an error indicating her account is LOCKED and cannot be verified.

How should you (AwesomeMoney) handle this and/or communicate the situation back to Betty in a way that helps her move forward with her transfer?

### Things to know
- the embedded widget handles the connection to the institution
- the widget will send postMessages back with data and/or errors and/or other information about the connection and user data.
- in this app, all postmessages are reported to the console like this:
`console.log('MX PostMessage: ', event)`

## Your turn!

For the rest of the session, you'll work through three more examples as we did above. The three exercises are independent of each other, and can be solved in any order. 

We'll take the last 15 minutes of the session to share answers and solutions.

Here's how you'll get set up for exercise1:

1. clone this repository

```
cd devcon2022
cd exercise1/frontend
npm i 
npm start
```
2. in a second terminal:
```
cd exercise1/backend
npm i
npm start
```
The repository is already configured with a client id & api key for this workshop. We will provide new users for each of you.

> (The client id and user data will be deactivated shortly after this session. If you wish to explore these exercises after the session, see [this link](http://placeholder) for instructions.

Each exercise has its own folder, and each folder has a copy of a frontend app & backend server. You'll run both of these in separate terminals, but you can only run one exercise at a time (unless you run them on different ports)

Use the values below:

|     | Institution | Username | Password |
| --- | ----------- | -------- | -------- |
| Exercise 1 | MX Bank | your-first-name.your-last-name | Pa$$word |
| Exercise 2 | MX Bank | talk to Sunita or Candice | challenge |
| Exercise 3 | MX Bank (OAuth) | n/a | n/a | 


## References
https://docs.mx.com/testing/guides/testing
https://docs.mx.com/api#core_resources_members_connection_statuses
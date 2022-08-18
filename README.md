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
`console.log('MX PostMessage: ', event.type, event.metadata)`

## Your turn!

For the rest of the session, you'll work through three more examples as we did above. The three exercises are independent of each other, and can be solved in any order. 

We'll take the last 15 minutes of the session to share answers and solutions.

Here's how you'll get set up:

1. clone this repository

```
cd devcon2022
cd awesomemoney/frontend
npm i 
npm start
```
2. in a second terminal:
```
cd awesomemoney/backend
npm i
npm start
```
The repository is already configured with a client id & api key for this workshop. We will provide new users for each of you.

> (The client id and user data will be deactivated shortly after this session. If you wish to explore these exercises after the session, see [this link](http://placeholder) for instructions.

When you run the app, you'll need to provide a username to initiate the verification flow. An AwesomeMoney user will be created for you with that id.

Use `betty.[yourfirstname]` as the username. This username MUST be unique.
You can delete this user and recreate it with each exercise. OR you can come up with a unique name of your own.

During the verification flow, you'll need to search for an institution then enter credentials. Use the values below.

Use the values below:
|     | Institution | Username | Password |
| --- | ----------- | -------- | -------- |
| Exercise 1 | MX Bank | your-first-name.your-last-name | Pa$$word |
| Exercise 2 | MX Bank | talk to Sunita or Candice | challenge |
| Exercise 3 (_coming soon_)|  |  |  | 

## References
https://docs.mx.com/testing/guides/testing
https://docs.mx.com/api#core_resources_members_connection_statuses
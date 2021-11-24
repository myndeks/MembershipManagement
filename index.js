import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import joi from 'joi';
import { ObjectID } from 'bson';
import short from 'short-uuid';


const app = express()
const port = 3000

dotenv.config();

const { PORT, MONGO_CONNECTION_STRING } = process.env;

app.use(express.json());
app.use(cors());

const mongoClient = new MongoClient(MONGO_CONNECTION_STRING);

app.get('/memberships', async (req, res) => {
 const connection = await mongoClient.connect();
 const memberships = await connection
    .db('subscriptions')
    .collection('services')
    .find({})
    .toArray()
    connection.close();
    res.send(memberships);
})

app.post('/memberships', async (req, res) => {
  const body = req.body;



  const schema = joi.object({
    name: joi.string().required(),
    price: joi.string().required(),
    description: joi.string().required().min(10),
  })

    const validationResults = schema.validate(body);

    if (validationResults.error) {
      const message = validationResult.error.details[0].message;
      res.status(400).send({
        succes: false,
        error: message
      })
    } else {
      const connection = await mongoClient.connect();
      const insertSubscription = await connection
          .db('subscriptions')
          .collection('services')
          .insertOne({
            id: short.generate(),
            name: body.name,
            price: body.price,
            description: body.description,
          })
        connection.close();
        res.send({
          succes: true,
          result: insertSubscription
        })
    }
})

app.delete('/memberships/:id', async (req, res) => {
  const membershipId = req.params.id
  const connection = await mongoClient.connect();
  const membership = await connection.
      db('subscriptions')
      .collection('services')
      .deleteOne(
          { id: membershipId }
        )
      connection.close();
      res.send(membership);
})

app.get('/users/:order', async (req, res) => {

  let order = 1;


  if (req.params.order) {
    order = req.params.order === ':asc' ? 1 : -1;
  }


  const connection = await mongoClient.connect();
  const allUsers = await connection
      .db('subscriptions')
      .collection('users')
      .aggregate(
        [
          {$lookup: {
            from: 'services',
            localField: 'service_id',
            foreignField: 'id',
            as: 'sub'
            }},
            {$sort: {
           sub: order
          }},
          {$project: {
            name: 1,
            email: 1,
            surname: 1,
            service_id: 1,
            sub: 1,
    }}
          ]
        )
      .toArray();
      connection.close();
      res.send(allUsers);
      console.log(req.params.order)
})

app.post('/users', async (req, res) => {
  const body = req.body;

  const schema = joi.object({
    name: joi.string()
      .max(50)
      .pattern(/\s/, {invert: true})
      .required(),
    surname: joi.string()
      .max(50)
      .pattern(/\s/, {invert: true})
      .required(),
    email: joi.string()
      .email()
      .required(),
    service_id: joi.string()
      .required()
  })

  const validationResult = schema.validate(body);

  if (validationResult.error) {
    const message = validationResult.error.details[0].message;
    res.status(400).send({
      succes: false,
      error: message
    })
  } else {
      const connection = await mongoClient.connect();
      const user = await connection
          .db('subscriptions')
          .collection('users')
          .insertOne({
            name: body.name,
            surname: body.surname,
            email: body.email,
            service_id: body.service_id
          })
      connection.close();
      res.send({
        succes: true,
        result: user
      })
    }
  })




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

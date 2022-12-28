import express from 'express'
import { parse } from 'url'
import { prepareNextApp } from './nextjs'
import todoRouter from './todoRouter'

async function run() {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  const nextApp = await prepareNextApp()
  const nextHandler = nextApp.getRequestHandler()

  app.use('/todos', todoRouter)

  app.get('*', (req, res) => {
    nextHandler(req, res, parse(req.url, true))
  })

  app.listen(process.env.PORT || 3001)
}

run()

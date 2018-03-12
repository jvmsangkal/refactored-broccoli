// @flow

import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import ErrorHandler from './handlers/ErrorHandler'
import ProductRouter from './components/product/ProductRouter'

export default class App {
  express: express$Application

  constructor() {
    this.express = express()
    this.middleware()
    this.routes()
    this.errorHandler()
  }

  middleware(): void {
    this.express.use(morgan('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
  }

  routes(): void {
    const productRouter = new ProductRouter()
    this.express.use(productRouter.path, productRouter.router)
  }

  errorHandler(): void {
    const errorHandler = new ErrorHandler()

    this.express.use(errorHandler.notFound)

    if (this.express.get('env') === 'development') {
      this.express.use(errorHandler.developmentErrors)
    }

    this.express.use(errorHandler.productionErrors)
  }
}

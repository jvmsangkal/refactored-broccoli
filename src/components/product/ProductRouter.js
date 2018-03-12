// @flow
/* eslint-disable class-methods-use-this */

import { Router } from 'express'

export default class ProduceRouter {
  router: Router
  path: string

  constructor(path: string = '/api/product') {
    this.router = Router()
    this.path = path

    this.init()
  }

  getAll(req: $Request, res: $Response): void {
    res.status(200).json({})
  }

  init(): void {
    this.router.get('/', this.getAll)
  }
}

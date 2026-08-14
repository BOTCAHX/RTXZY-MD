
import mongoose, { Schema } from 'mongoose'

interface MongoData {
  _id?: unknown
  data?: unknown
  save?: () => Promise<unknown>
}

export default class mongoDB {
  url: string
  data: unknown
  _data: MongoData | null
  _schema: Schema | undefined
  _model: mongoose.Model<MongoData>
  db: typeof mongoose | undefined
  connection: mongoose.Connection | undefined
  options: Record<string, unknown>

  constructor(url: string, options = { useNewUrlParser: true, useUnifiedTopology: true }) {
    this.url = url
    this.data = {}
    this._data = null
    this._schema = undefined
    this._model = null as unknown as mongoose.Model<MongoData>
    this.db = undefined
    this.options = options
  }
  async read() {
    this.db = await mongoose.connect(this.url, { ...this.options })
    this.connection = mongoose.connection
    let schema = this._schema = new Schema({
      data: {
        type: Object,
        required: true, // whether the field is mandatory
        default: {}
      }
    })
    try { this._model = mongoose.model<MongoData>('data', schema) } catch { this._model = mongoose.model<MongoData>('data') }
    this._data = await this._model.findOne({})
    if (!this._data) {
      this.data = {}
      await this.write(this.data)
      this._data = await this._model.findOne({})
    } else this.data = this._data.data
    return this.data
  }


  async write(data: unknown) {
    if (!data) return data
    if (!this._data) return (new this._model({ data })).save()
    this._model.findById(this._data._id, (err: unknown, docs: MongoData) => {
      if (!err) {
        if (!docs.data) docs.data = {}
        docs.data = data
        return docs.save?.()
      }
    })
  }
}
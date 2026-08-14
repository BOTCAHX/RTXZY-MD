const stringify = (obj: unknown) => JSON.stringify(obj, null, 2)
const parse = (str: string) => JSON.parse(str, (_, v) => {
    if (
        v !== null &&
        typeof v === 'object' &&
        'type' in v &&
        (v as { type?: unknown }).type === 'Buffer' &&
        'data' in v &&
        Array.isArray((v as { data?: unknown }).data)) {
        return Buffer.from((v as { data: number[] }).data)
    }
    return v
})

type Deserialize = (str: string) => unknown
type Serialize = (obj: unknown) => string

class CloudDBAdapter {
    url: string
    serialize: Serialize
    deserialize: Deserialize
    fetchOptions: RequestInit

    constructor(url: string, {
        serialize = stringify,
        deserialize = parse,
        fetchOptions = {}
    }: {
        serialize?: Serialize
        deserialize?: Deserialize
        fetchOptions?: RequestInit
    } = {}) {
        this.url = url
        this.serialize = serialize
        this.deserialize = deserialize
        this.fetchOptions = fetchOptions
    }

    async read() {
        try {
            let res = await fetch(this.url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json;q=0.9,text/plain'
                },
                ...this.fetchOptions
            })
            if (!res.ok) throw res.statusText
            return this.deserialize(await res.text())
        } catch (e) {
            return null
        }
    }

    async write(obj: unknown) {
        let res = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            ...this.fetchOptions,
            body: this.serialize(obj)
        })
        if (!res.ok) throw res.statusText
        return res.text()
    }
}

export default CloudDBAdapter

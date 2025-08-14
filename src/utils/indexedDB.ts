export default class DB {
  private dbName: string
  constructor(dbName: string) {
    this.dbName = dbName
  }
  private openStore() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1)
      request.onsuccess = (event) => {
        console.log('open db success')
        console.log(event)
        // resolve(request.result)
      }
      request.onerror = (event) => {
        console.log('open db error')
        console.log(event)
        // reject(request.error)
      }
      request.onupgradeneeded = (event) => {
        console.log('open db upgradeneeded')
        console.log(event)
      }

    })
  }


}

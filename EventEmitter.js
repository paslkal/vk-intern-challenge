class EventEmitter {
  constructor() {
    this.events = {};
  }

  on( eventName, listener ) {
    if( !this.events[eventName] ) {
       this.events[eventName] = [];
    }
      
    this.events[eventName].push(listener);
  }

  emit(eventName, data) {
    const event = this.events[eventName];
    if( event ) {
      event.forEach(listener => {
         listener.call(null, data);
       });
     }
  }

  off(eventName, listener) {
    this.events[eventName] = this.events[eventName].filter(eventListener => listener != eventListener)
  }
}

const emmiter = new EventEmitter()

const logData = (data) => console.log(data)
emmiter.on('data', logData)
emmiter.emit('data', {mesage: 'Hello world!'})
emmiter.off('data', logData)
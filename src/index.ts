import { IS_MAC, CODES, MODIFIERS, ALIASES } from './helpers'

interface Details {
    key: string
    keyCode: number
    code: string
    altKey: boolean
    ctrlKey: boolean
    metaKey: boolean
    shiftKey: boolean
    which: number
    type: string
    repeat: boolean // .repeat is optional
}

interface Bind {
    bindName: string
    key: string
    desc: string
    keydown: (details: Details) => void
    keyup: (details: Details) => void
}

const binds: Array<Bind> = []

let onAllBindAction: Function = () => {}

const returnEventDetails = (event: Details) => {
    return {
        key: event.key,
        keyCode: event.keyCode,
        code: event.code,
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        shiftKey: event.shiftKey,
        which: event.which,
        type: event.type,
        repeat: event.repeat
    }
}

const onLongPress = (event: Details) => {
    if (event.repeat) {
        const details = returnEventDetails(event)
        const keyName = toKeyName(details.key)
        console.log('longpress event', details, keyName)
    }
}

const onAll = (event: Details) => {
    onLongPress(event)

    const details = returnEventDetails(event)
    const keyName = toKeyName(details.key)
    const isModOnly = MODIFIERS[keyName]

    if (event.repeat || isModOnly) {
        if (isModOnly && !event.repeat) {
            onAllBindAction(event, details)
        }

        return
    }

    const modKeys = Object.keys(MODIFIERS)
        .map((key) => {
            return details[MODIFIERS[key]] ? key : false
        })
        .filter((key) => {
            return key != false
        })

    modKeys.push(keyName.toLowerCase())

    bindAction(modKeys.join('+'), details)

    onAllBindAction(event, details)
}

const bindAction = (hotKey: string, details: Details) => {
    return getKeysBound(hotKey).forEach((bind) => {
        if (event.type === 'keydown' && bind.keydown.constructor === Function) {
            bind.keydown(details)
        }

        if (event.type === 'keyup' && bind.keydown.constructor === Function) {
            bind.keyup(details)
        }
    })
}

export const attachBind = (bind: Bind, el: HTMLElement) => {
    binds.push(bind)
}

export const toKeyName = (name: string) => {
    name = name.toLowerCase()
    name = ALIASES[name] || name
    return name
}

export const getKeysBound = (hotKey: string) => {
    return binds.filter((bind) => {
        return bind.key === hotKey
    })
}

export const getAllBinds = () => {
    return binds
}

export const Keybindings = (options = {}) => {
    const defaults = {
        debug: false,
        el: document.body,
        onAll: null,
        binds: [],
        longPressEnabled: false,
        ...options
    }

    defaults.binds.forEach((bind: Bind) => {
        attachBind(bind, defaults.el)
    })

    if (defaults.onAll.constructor === Function) {
        onAllBindAction = defaults.onAll
    }

    if (defaults.debug) {
        defaults.el.removeEventListener('keydown', onAll)
        defaults.el.removeEventListener('keyup', onAll)

        defaults.el.addEventListener('keydown', onAll)
        defaults.el.addEventListener('keyup', onAll)
    }

    return defaults
}

export default Keybindings

export { IS_MAC as isMac }

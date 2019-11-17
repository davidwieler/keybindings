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
    forceBind?: boolean
}

let defaults = {
    debug: false,
    el: document.body,
    onAll: null,
    binds: [],
    longPressEnabled: false
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
        if (details.type === 'keydown' && bind.keydown && bind.keydown.constructor === Function) {
            bind.keydown(details)
        }

        if (details.type === 'keyup' && bind.keyup && bind.keyup.constructor === Function) {
            bind.keyup(details)
        }
    })
}

export const attachBind = (bind: Bind) => {
    const existingBind = getKeysBound(bind.key)
    const existingBindNamed = getKeysBoundByName(bind.bindName)

    if (existingBindNamed.length) {
        console.warn(
            `A bind already exists named "${existingBindNamed[0].bindName}". Multiple binds with exact names not allowed.`
        )
        return
    }

    if (!existingBind.length || bind.forceBind) {
        binds.push(bind)
    } else {
        console.warn(`A bind already exists for ${bind.key} called ${existingBind[0].bindName}`)
    }
}

export const removeBind = (search: string) => {
    const existingBind = getKeysBound(search)
    const existingBindNamed = getKeysBoundByName(search)

    if (existingBindNamed.length) {
        const index = binds.findIndex((b) => b.bindName === search)
        binds.splice(index, 1)
    } else {
        // console.log('unbinding by key', existingBind)
        if (existingBind.length) {
            existingBind.forEach((bind) => {
                const index = binds.findIndex((b) => b.key == search)
                binds.splice(index, 1)
            })
        }
    }
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

export const getKeysBoundByName = (name: string) => {
    return binds.filter((bind) => {
        return bind.bindName === name
    })
}

export const getAllBinds = () => {
    return binds
}

export const destroyBinds = () => {
    defaults.el.removeEventListener('keydown', onAll)
    defaults.el.removeEventListener('keyup', onAll)
}

export const Keybindings = (options = {}) => {
    const init = {
        ...defaults,
        ...options
    }

    defaults = init

    init.binds.forEach((bind: Bind) => {
        attachBind(bind)
    })

    if (init.onAll && init.onAll.constructor === Function) {
        onAllBindAction = init.onAll
    }

    destroyBinds()

    init.el.addEventListener('keydown', onAll)
    init.el.addEventListener('keyup', onAll)

    return defaults
}

export default Keybindings

export { IS_MAC as isMac }

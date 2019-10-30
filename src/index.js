import { CODES, MODIFIERS, ALIASES } from './helpers'

const returnEventDetails = (event) => {
    return {
        key: event.key,
        keyCode: event.keyCode,
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        shiftKey: event.shiftKey,
        which: event.which,
        type: event.type
    }
}

const onLongPress = (event) => {
    if (event.repeat) {
        console.log('asd')
    }
}

const binds = []

const toKeyName = (name) => {
    name = name.toLowerCase()
    name = ALIASES[name] || name
    return name
}

const parseKeyPress = () => {}

const onAll = (event) => {
    onLongPress(event)

    const details = returnEventDetails(event)
    const keyName = toKeyName(details.key)
    const isModOnly = MODIFIERS[keyName]

    if (event.repeat || isModOnly) {
        return
    }
    console.log('---', event)
    console.log('details', details)

    const modKeys = Object.keys(MODIFIERS)
        .map((key) => {
            return details[MODIFIERS[key]] ? key : false
        })
        .filter((key) => {
            return key != false
        })

    modKeys.push(keyName.toLowerCase())

    bindAction(modKeys.join('+'))
}

const attach = (bind, el) => {
    binds.push(bind)
}

const bindAction = (hotKey) => {
    return binds
        .filter((bind) => {
            return bind.key === hotKey
        })
        .forEach((bind) => {
            if (event.type === 'keydown' && bind.keydown.constructor === Function) {
                bind.keydown()
            }

            if (event.type === 'keyup' && bind.keydown.constructor === Function) {
                bind.keyup()
            }
        })
}

const Keybindings = (options = {}) => {
    const defaults = {
        debug: false,
        el: document.body,
        binds: [],
        ...options
    }

    defaults.binds.forEach((bind) => {
        attach(bind, defaults.el)
    })

    if (defaults.debug) {
        defaults.el.removeEventListener('keydown', onAll)
        defaults.el.removeEventListener('keyup', onAll)

        defaults.el.addEventListener('keydown', onAll)
        defaults.el.addEventListener('keyup', onAll)
    }

    return defaults
}

export default Keybindings

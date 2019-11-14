const keybinds = require('../src/index.ts')

let isOSMac = process.platform === 'darwin'

const map = {}

window.addEventListener = jest.fn((event, cb) => {
    map[event] = cb
})

// global.console = {
//     warn: jest.fn(),
//     log: jest.fn()
// }

keybinds.Keybindings({
    debug: true,
    el: window,
    binds: [
        {
            bindName: 'Bind Test',
            key: 'd',
            desc: 'Initial Bind Test',
            keydown: (event, details) => {
                console.log('keydown test')
            },
            keyup: (event, details) => {
                console.log('keyup test')
            }
        }
    ]
})

// Test that the current platform is checked and matches
test('OS Platform Test', () => {
    const isMac = expect(keybinds.isMac).toBe(isOSMac)
})

// Test that binds are being set using `Keybindings`
test('Intial Bind', () => {
    const binds = keybinds.getAllBinds()
    expect(binds.length).toBe(1)
})

// Test `attachBind` is correctly adding binds
test('Attach Second Bind', () => {
    keybinds.attachBind({
        bindName: 'Second Bind',
        key: 'shift+t',
        desc: 'Second Bind'
    })

    const binds = keybinds.getAllBinds()

    expect(binds.length).toBe(2)
})

// Test removal of binds by bind name
test('Remove Bind By Name', () => {
    keybinds.attachBind({
        bindName: 'Remove Bind By Name',
        key: 'r',
        desc: 'test 2'
    })

    keybinds.removeBind('Remove Bind By Name')

    const binds = keybinds.getAllBinds()

    expect(binds.length).toBe(2)
})

// Test removal of binds by bind key
test('Remove Bind By Key', () => {
    keybinds.attachBind({
        bindName: 'Remove Bind By Key',
        key: 'shift+r',
        desc: 'test 2'
    })

    keybinds.removeBind('shift+r')

    const binds = keybinds.getAllBinds()

    expect(binds.length).toBe(2)
})

// Test event listeners
test('Keydown bind test', () => {
    const log = jest.spyOn(global.console, 'log')

    map.keydown({
        altKey: false,
        code: 'KeyD',
        ctrlKey: false,
        key: 'd',
        keyCode: 68,
        metaKey: false,
        repeat: false,
        shiftKey: false,
        type: 'keydown',
        which: 68
    })

    expect(log).toHaveBeenCalledWith('keydown test')
})

test('keyup bind test', () => {
    const log = jest.spyOn(global.console, 'log')

    map.keydown({
        altKey: false,
        code: 'KeyD',
        ctrlKey: false,
        key: 'd',
        keyCode: 68,
        metaKey: false,
        repeat: false,
        shiftKey: false,
        type: 'keyup',
        which: 68
    })

    expect(log).toHaveBeenCalledWith('keyup test')
})

// Test duplicate bind warning
test('Attach Second Bind With Duplicate Key Warning', () => {
    const log = jest.spyOn(global.console, 'warn')

    keybinds.attachBind({
        bindName: 'Second Bind Duplicate',
        key: 'shift+t',
        desc: 'Second Bind'
    })

    expect(log).toHaveBeenCalledWith('A bind already exists for shift+t called Second Bind')
})

// Test duplicate bind forced same name warning
test('Attach Second Bind Forced With Duplicate Name Warning', () => {
    const log = jest.spyOn(global.console, 'warn')

    keybinds.attachBind({
        bindName: 'Second Bind',
        key: 'shift+t',
        desc: 'Second Bind',
        forceBind: true
    })

    expect(log).toHaveBeenCalledWith(
        'A bind already exists named "Second Bind". Multiple binds with exact names not allowed.'
    )
})

// Test duplicate bind forced
test('Attach Second Bind Forced', () => {
    keybinds.attachBind({
        bindName: 'Second Bind Forced',
        key: 'shift+t',
        desc: 'Second Bind Forced',
        forceBind: true
    })

    const binds = keybinds.getAllBinds()

    expect(binds.length).toBe(3)
})

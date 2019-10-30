// import test from '../src/index'

// console.log('test', test())

Keybindings({
    debug: true,
    binds: [
        {
            bindName: 'newNotebook',
            key: 'shift+e',
            desc: 'test 1',
            keydown: () => {
                console.log('on keydown')
            },
            keyup: () => {
                console.log('on keyup')
            }
        },
        {
            bindName: 'asd',
            key: 'shift+e',
            desc: 'test 1.a',
            keydown: () => {
                console.log('on keydown 1.a')
            },
            keyup: () => {
                console.log('on keyup 1.a')
            }
        },
        {
            bindName: 'test',
            key: 'shift+r',
            desc: 'test 2',
            keydown: () => {
                console.clear()
            },
            keyup: () => {
                console.log('on keyup 2')
            }
        },
        {
            bindName: 'test',
            key: 'mod+k',
            desc: 'test 3',
            keydown: () => {
                console.log('on keydown 3')
            },
            keyup: () => {
                console.log('on keyup 3')
            }
        }
    ]
})

console.log('test')

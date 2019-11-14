import './board.scss'
import KeyBindings, {
    getKeysBound,
    toKeyName,
    attachBind,
    getAllBinds,
    isMac,
    removeBind
} from 'KeyBindings'

// console.log('KeyBindings', KeyBindings, getKeysBound)

KeyBindings({
    debug: true,
    onAll: (event, keyData) => {
        const key = document.querySelectorAll(`[data-key="${keyData.keyCode}"]`)

        // console.log('keyData', keyData)

        // if (keyData.type === 'keydown') {
        //     key[0].classList.add('active')
        // } else {
        //     key[0].classList.remove('active')
        // }
    },
    binds: [
        {
            bindName: 'newNotebook',
            key: 'd',
            desc: 'test 1',
            keydown: (keyData) => {
                console.log('on keydown d', keyData)
            },
            keyup: () => {
                // console.log('on keyup')
            }
        },
        {
            bindName: 'asd',
            key: 'shift+e',
            desc: 'test 1.a',
            forceBind: true,
            keydown: () => {
                // console.log('on keydown 1.a')
            },
            keyup: () => {
                // console.log('on keyup 1.a')
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
                // console.log('on keyup 3')
            }
        }
    ]
})

const boundCheck = getKeysBound('shift+e')
console.log('boundCheck', boundCheck)

attachBind({
    bindName: 'test',
    key: 'shift+t',
    desc: 'test 2',
    keydown: () => {
        console.clear()
        console.log('test outer binds')
    },
    keyup: () => {
        // console.log('on keyup 2')
    }
})

const preRemove = getAllBinds()

console.log('getAllBinds()', preRemove)

console.log('isMac', isMac)

// removeBind('shift+e')

console.log('getAllBinds()', getAllBinds())

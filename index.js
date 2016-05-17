import { createStore, dispatch } from 'redux';

/**
 * action
*/
const CLICK = 'CLICK';
/**
 * @returns plainObject => action
 */
function click() {
    return {
        type: CLICK
    }
}

/**
 * reducer
 * @param state 坐标状态
 * @param action 执行的行为
*/
function coordinates(state = [1, 1], action) {
    switch (action.type) {
        case CLICK:
            return [
                state[0] + 40 * Math.random(),
                state[1] + 40 * Math.random()
            ]
        default:
            return state;
    }
}

/**
 * 创建 Redux 的 Store(存储器)
*/
let store = createStore(coordinates);

/**
 * 这里使用了 Phaser
 * 定义一个游戏场景
 * 可以忽略不管，就是一个 800*600 的 canvas 画布
 * 提前会加载一些游戏素材和游戏创建时候的操作
 */
let game = new Phaser.Game(
    800,
    600,
    Phaser.CANVAS,
    'phaser-example',
    {
        preload: preload,
        create: create
    }
);

/**
 * 定义 plane(飞机) 的移动
 */
function movePlane(plane) {
    game.add.tween(plane).to({
        x: store.getState()[0],
        y: store.getState()[1]
    }, 1000, 'Linear', true);
}

function preload() {
    game.load.image('backdrop', './clouds.png');
    game.load.image('plane', './plane.png');
}

function create() {
    game.stage.backgroundColor = "#DEEFF5";
    game.add.sprite(0, 0, 'backdrop');
    const plane = game.add.sprite(store.getState()[0], store.getState()[1], 'plane');
    plane.inputEnabled = true;
    plane.collideWorldBounds = true;
    store.subscribe(movePlane.bind(null, plane));
    plane.events.onInputDown.add(() => {
        store.dispatch(click())
    }, null);
}

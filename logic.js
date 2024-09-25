const seen = new Set()
let next_round = []
let to_look_at = []
let round_number = 1
// let mapElement = document.querySelector('#map');



function inBounds(x, y) {
    return x >= 0 && x < map.length && y >= 0 && y < map[0].length
}

function get_neighbors(x, y) {
    const neighbors = []
    const posible_positions = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]
    for (const [posible_x, posible_y] of posible_positions) {
        if (inBounds(posible_x, posible_y) 
            && ! seen.has([posible_x, posible_y] 
            && map[posible_x][posible_y] != 1)) {

            neighbors.push([posible_x, posible_y])
            seen.add([posible_x, posible_y])
        }
    }

    return neighbors
}

function round(){
    to_look_at.push(start)

    for (const position of to_look_at) {
        console.log({position})
        const [x, y] = position
        const neighbors = get_neighbors(x, y)
        console.table(neighbors)
        for (const [nx, ny] of neighbors) {
            if (map[nx][ny] == 0) {
                map[nx][ny] = round_number
                mapElement.children[nx].children[ny].classList.add('visited')
                next_round.push([nx, ny])
            } else if (map[nx][ny] == end_constant) {
                mapElement.children[nx].children[ny].classList.add('end')
            }
        }
    }

   //making this function recursive is the only way to get a delat on it
    to_look_at = [...next_round]
    next_round = []
    console.log({to_look_at})
    console.table(map)
    console.log({mapElement})
    const endCell_element = mapElement.children[end[0]].children[end[1]]

    if (to_look_at.length > 0 && !endCell_element.classList.contains('visited')) {
        round_number++
        setTimeout(round, 100)
    }

}

function run() {

    to_look_at.push(start)

    round()
    // while ( && !endCell_element.classList.contains('visited')) {
       
    // }
}

document.querySelector(".bfs").addEventListener("click", () => {
    run()
})
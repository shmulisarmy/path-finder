

        function setMode(mode){
            currentMode = mode
            document.querySelectorAll('.active').forEach(e => e.classList.remove('active'))
            document.querySelector(`.${currentMode}`).classList.add('active')
        }


        function Modes(){
            return /*html*/`
                <div class="modes">
                    ${modes.map(mode => /*html*/`<button
                        class="${mode}"
                        onclick="setMode('${mode}')"
                        >
                        <abbr title="${mode}">
                        ${mode}
                    </abbr>
                        </button>`).join('')}    
                </div>    
            `
        }

        document.querySelector('#modes').innerHTML = Modes()
        const mapElement = document.querySelector('#map');
        


        const cellType = {
            1: 'wall',
            0: 'empty'
        }

        document.addEventListener('click', (event) => {
            const {target} = event;
            if (target.tagName !== 'TD') return

            if (currentMode == "place-start") { 
                if (start) {
                    document.querySelector('.start').classList.remove('start')
                }
                start = [target.parentNode.rowIndex, target.cellIndex]
            
                target.classList.add('start')
                return
            }

            if (currentMode == "place-end") { 
                if (end) {
                    document.querySelectorAll('.end').forEach(e => e.classList.remove('end'))
                }
                target.classList.add('end')
                const rowIndex = target.parentNode.rowIndex
                const cellIndex = target.cellIndex
                end = [rowIndex, cellIndex]
            
                return
            }




            if (currentMode !== 'place-or-remove-wall') return
            const row = target.parentNode.rowIndex
            const col = target.cellIndex
            map[row][col] = map[row][col] === 1 ? 0 : 1
            target.classList.toggle('wall')
        })


       function setup_map(mapElement) {
         for (let i = 0; i < map.length; i++) {
             const tr = document.createElement('tr');
             mapElement.appendChild(tr);
             for (let j = 0; j < map[i].length; j++) {
                 const td = document.createElement('td');
                 const cell = map[i][j]

                 td.textContent = " ";
                 td.classList.add(cellType[cell]);
                 tr.appendChild(td);
             }
         }
       }

       setup_map(mapElement);
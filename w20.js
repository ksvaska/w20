const select = document.getElementById('item');
const number = document.getElementById('number');
const btn = document.querySelector('.btn');
const info = document.querySelector('.info')

function getInfo(){

    return new Promise((resolve, reject)=>{
        let selected = select.options[select.selectedIndex];
        if( 0 > number.value || number.value > 10 || number.value == ''){
            reject(new Error('Введите число от 1 до 10'));
        } else {
            resolve (
                fetch (`http://swapi.dev/api/${selected.value}/${number.value}`)
                .then((response)=>response.json())
                .then((data)=>{
                    info.innerHTML = `<p class="info_text"> ${data.name}</p>`
                    number.value = " ";
                })
                .catch((error)=>{
                    info.innerHTML = `<p class="info_error"> Error:${error}</p>`
                })
            )
            
        }
    }

    )
}

async function showLoading(){
    info.textContent = 'Ищем информацию...';
    try{
        await getInfo();
    } catch(error){
        info.innerHTML = `<p class="info_error">${error}</p>`;
        number.value = " ";
    } finally{
        console.log('Процесс заверешен');
    }
}

btn.addEventListener('click',showLoading);
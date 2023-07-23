(function(){
    let timer

    const buttons = document.querySelectorAll(".timer__controls > button")
    const timeLeft = document.querySelector(".display__time-left")
    const endTime = document.querySelector(".display__end-time")

    const startTime = function(sec){
        clearInterval(timer)
        const now = Date.now()
        const end = now + sec * 1000
        
        //倒數計時
        secCountDown(end)

        //顯示最後時間
        showEndTime(end)
    }

    const secCountDown = function(end) {
        timer = setInterval(function(){
            const secLeft = Math.floor((end - Date.now()) / 1000)
            if( secLeft >= 0 ){
                const displayMin = Math.floor( secLeft / 60 )
                let displaySec = secLeft % 60
                displaySec = displaySec < 10 ? "0" + displaySec : displaySec
                timeLeft.innerText = `${displayMin} : ${displaySec}`
            } else{
                clearInterval(timer)
            }
        }, 16)
    }

    const showEndTime = function(time){
        const endDate = new Date(time)
        let hour = endDate.getHours()
        let min = endDate.getMinutes()
        min = min < 10 ? "0" + min : min
        endTime.innerText = `back be ${hour} : ${min}` 
    }

    const setTimer = function(){
        const sec = parseInt(this.dataset.time)
        startTime(sec);
    }

    buttons.forEach(button => button.addEventListener('click' , setTimer))
    document.querySelector("#custom").addEventListener("submit" , function(e){
        e.preventDefault()
        const value = parseInt(this.minutes.value)
        if(value){
            startTime(value * 60)
            this.reset()
        }
    })
})()
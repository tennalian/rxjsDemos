(function(){
  const div = document.querySelector('.circle');
  const delay = 0;
  let angle = 0;

  const work = (state) => {
    div.style.transform = `rotate(${angle}deg)`;
    Rx.Scheduler.animationFrame.schedule(work, delay, ++angle);
  }

  Rx.Scheduler.animationFrame.schedule(work, delay, angle);
})();
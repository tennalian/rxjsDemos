(function(){
  const text = document.querySelector('.text');
  const btn = document.querySelector('.clicker');
  const interval = document.querySelector('.interval');
  let count = 0;

  const observer1 = {
    next: function(value) {
      const p = document.createElement('p');
      p.innerHTML = value;
      text.append(p);
    },
  };

  const observer2 = {
    next: function(value) {
      count++;
      btn.innerHTML = count;
    },
  };

  const observer3 = {
    next: function(value) {
      interval.innerHTML = value;
    },
  };

  const clickObs = Rx.Observable.fromEvent(document, 'click').subscribe(observer2);
  const intervalObs = Rx.Observable.timer(0, 1000).subscribe(observer3);
  const ofObs = Rx.Observable.of(1, 2, 3).subscribe(observer1);
})();

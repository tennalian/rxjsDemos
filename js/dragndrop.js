(function(){
  const target = document.querySelector('.btn');
  const offset = 175;
  let defaultTarget = {
    x: 0,
    y: 0
  };

  const observer = {
    next: function(e) {
      let x = 0;
      let y = 0;
      if (e.type === 'touchmove') {
        y = e.touches[0].clientY - defaultTarget.y;
        x = e.touches[0].clientX - defaultTarget.x;
      }else {
        y = e.y - defaultTarget.y - offset;
        x = e.x - defaultTarget.x;
      }
      target.setAttribute('style', `top: ${y}px; left: ${x}px`);
    },
  };

  const targetMouseDown = Rx.Observable.merge(
    Rx.Observable.fromEvent(target, 'mousedown'),
    Rx.Observable.fromEvent(target, 'touchstart')
  );

  const docMouseUp = Rx.Observable.merge(
    Rx.Observable.fromEvent(document, 'mouseup'),
    Rx.Observable.fromEvent(document, 'touchend')
  );

  const docMouseMove = Rx.Observable.merge(
    Rx.Observable.fromEvent(document, 'mousemove'),
    Rx.Observable.fromEvent(document, 'touchmove')
  );

  const dragDrop = targetMouseDown.switchMap((e) => {
      if (e.type === 'mousedown') {
        defaultTarget = {
          x: e.offsetX,
          y: e.offsetY
        }
      }
      if (e.type === 'touchstart'){
        defaultTarget = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        }
      }
      return docMouseMove.takeUntil(docMouseUp)
    }).subscribe(observer);
})();

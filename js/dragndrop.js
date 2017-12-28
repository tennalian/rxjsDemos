(function(){
  const target = document.querySelector('.btn');
  let defaultTarget = {
    x: 0,
    y: 0
  };

  const observer = {
    next: function(value) {

      const y = value.y - defaultTarget.y - 175;
      const x = value.x - defaultTarget.x;
      console.log(y, x);
      target.setAttribute('style', `top: ${y}px; left: ${x}px`);
    },
  };

  const targetMouseDown = Rx.Observable.fromEvent(target, 'mousedown')
  const docMouseMove = Rx.Observable.fromEvent(document, 'mousemove')
  const docMouseUp = Rx.Observable.fromEvent(document, 'mouseup')

  const dragDrop = targetMouseDown.switchMap((e) => {
    if (e.type === 'mousedown') {
      defaultTarget = {
        x: e.offsetX,
        y: e.offsetY
      }
    }
    return docMouseMove.takeUntil(docMouseUp)
  }
  ).subscribe(observer);
})();

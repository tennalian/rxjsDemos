(function() {
  const s1 = document.querySelector('.s1');
  const s2 = document.querySelector('.s2');
  const s3 = document.querySelector('.s3');
  const btn = document.querySelector('.button');
  let count = 0;


  const observer1 = {
    next: (v) => s1.innerHTML =  `${v}: ${count*10}`
  }
  const observer2 = {
    next: (v) => s2.innerHTML = `${v}: ${count*20}`
  }
  const observer3 = {
    next: (v) => s3.innerHTML = `${v}: ${count}`
  }

  const subject = new Rx.Subject();
  const sub1 = subject.subscribe(observer1);
  const sub2 = subject.subscribe(observer2);
  const sub3 = subject.subscribe(observer3);

  setInterval(() => {
    count++;
    subject.next('hi there');
  }, 1500)
})()
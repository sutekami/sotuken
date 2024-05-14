import { browser } from "$app/environment";

const baseHandler = (msg, status, durationSec=10) => {
  if ( browser ) {
    const id = crypto.randomUUID();
    const body = document.querySelector('body');
    const tostar = document.createElement('div');
    const closeBtn = document.createElement('span');

    // toastr
    tostar.id = id;
    tostar.className = `toastr ${status}`;
    tostar.innerText = msg;
    tostar.style.setProperty('--duration-sec', `${durationSec}s`)
    body?.appendChild(tostar);

    // closeBtn
    closeBtn.innerText = '✖️'
    closeBtn.className = 'closeBtn'
    closeBtn.addEventListener('click', (event) => {
      tostar.remove();
    })
    tostar.appendChild(closeBtn);

    setTimeout(() => {
      tostar.remove();
    }, durationSec * 1000)
  }
}

const handleError = (msg, durationSec=10) => {
  baseHandler(msg, 'error', durationSec)
}

const handleSuccess = (msg, durationSec=10) => {
  baseHandler(msg, 'success', durationSec)
}

export default { handleError, handleSuccess, };

import {
  DEFAULT_ERR_MSG
} from 'configPath/index';

export function ajaxFulFilledHandle(data={}) {
  return new Promise((resolve, reject) => {
    const success = data.success || false;
    const errMsg = data.errMsg || DEFAULT_ERR_MSG;

    if (success) {
      resolve(data);
    } else {
      console.log('ajax req err' , errMsg);
      reject(data);
    }
  })
}

export function ajaxRejectedHandle(err) {
  console.log('ajax err', err);
  return Promise.reject(err);
}

export const axiosResponseInterceptor = (axios) => {
  axios.interceptors.response.use(
    null,
    error => {
        let config = error.config;
        if (!config || !config.params || !config.params.retryTimes) return Promise.reject(error);
        const { __retryCount = 1, retryDelay = 300, retryTimes } = config.params;
        // 在请求对象上设置重试次数
        config.params.__retryCount = __retryCount;
        // 判断是否超过了重试次数
        if (__retryCount >= retryTimes) {
          console.log('超出重试次数');
          return Promise.reject(error);
        }
        // 增加重试次数
        config.params.__retryCount += 1;
        // 延时处理
        const delay = new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, retryDelay);
        });
        // 重新发起请求
        return delay.then(() => {
          return axios.request(config);
        });
    }
  );
}
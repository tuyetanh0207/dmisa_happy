import axios from "axios";

export const baseUrl = "http://localhost:8090" ;
export const apiV1 = `${baseUrl}/api/v1`;

export const config = function (token) {
    return {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  };

  export const get = function (url, token) {
    return new Promise((resolve, reject) =>
      axios
        .get(url, config(token))
        .then((res) => {
          // return data
          return resolve({ data: res.data });
        })
        .catch((err) => {
          // return err message
          if (!err.response) return reject(err.message);
          return reject(err.response.data);
        })
    );
  };
  

export const post = function (url,data,token) {
    return new Promise((resolve, reject) => {
        axios
        .post(url, data, config(token))
        .then((response) => {
            return resolve({data: response.data});
        })
        .catch((error)=>{
          console.log('error in post request', error.response.data)
            if(!error.response) return reject(error.message);
            return reject(error.response.data);
        })
    });
}

export const put = function (url,data,token) {
    return new Promise((resolve, reject) => {
        axios
        .put(url, data, config(token))
        .then((response) => {
            return resolve({data: response.data});
        })
        .catch((error)=>{
            if (error.response) {
              return reject(error.response.data);
            } else if (error.request) {
              return reject('Network error');
            } else {
              return reject(error.message);
            }
        })
    });
}

export const patch = function (url, data, token) {
    return new Promise((resolve, reject) =>
      axios
        .patch(url, data, config(token))
        .then((res) => {
          // return data
          return resolve({ data: res.data });
        })
        .catch((err) => {
          // return err message
          if (!err.response) return reject(err.message);
          return reject(err.response.data);
        })
    );
  };
  
  export const delele = function (url, token) {
    return new Promise((resolve, reject) =>
      axios
        .delete(url, config(token))
        .then((res) => {
          // return data
          return resolve({ data: res.data });
        })
        .catch((err) => {
          // return err message
          if (!err.response) return reject(err.message);
          return reject(err.response.data);
        })
    );
  };
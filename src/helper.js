import toastr from 'toastr';
import router  from './router';
// import 'toastr/build/toastr.css'; 
// import './assets/css/toastr.css';

export default {
    // shows toastr notification for axios form request
    showErrorMsg(error) {
        console.log(error)
        if (error.hasOwnProperty("error")) {
            toastr.error(error.error);
        } else if (error.hasOwnProperty("response")) {
            if (error.response.status === 422) {
                if (error.response.data.hasOwnProperty('errors')) {
                    if (error.response.data.errors.hasOwnProperty("message")) {
                        console.log(error.response.data.errors.message[0]);
                        toastr.error(error.response.data.errors.message[0]);
                    } else {
                        console.log(error.response.data.errors);
                        Object.keys(error.response.data.errors).forEach((key) => {
                            const value = error.response.data.errors[key];
                            toastr.error(value);
                          });
                        // forEach((key) => {
                        //     this.toastr.error(error.response.data.errors[key])
                        //   });
                    }
                }
                if (error.response.data.hasOwnProperty('message')) {
                    toastr.error(error.response.data.message)
                } else if (error.response.data.hasOwnProperty('error')) {
                    toastr.error(error.response.data.error)
                }
            } else if (error.response.status === 404) {
               toastr.error(error.response.data.message)
               router.push('/');
            }
        }
    },
    getFilterURL(data) {
        return Object.keys(data)
          .map(key => (data[key] ? `${key}=${encodeURI(data[key])}` : ''))
          .filter(Boolean) // Remove empty strings
          .join('&');
      },

    formatDate(date) {
        if (!date)
            return;

        return moment(date).format('YYYY-MM-DD, hh:mm A');
    },
}

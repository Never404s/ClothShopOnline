import http from "k6/http";
import { sleep } from "k6"

// Testing on render

// export default function() {
//     http.get("https://phill-in-the-blank.onrender.com/api/reviews");
//     sleep(1);
// }

// Testing Locally

// export default function() {
//     http.get("http://localhost:8000/api/reviews");
//     sleep(1);
// }

//  Batch test

// export default function() {
//     let requests = [
//       ["GET", "https://phill-in-the-blank.onrender.com/api/reviews"],
//       ["GET", "http://localhost:8000/api/reviews"]
//     ];
  
//     http.batch(requests);
//     sleep(1);
//   }

// export let options = {
//     vus: 1000,
//     iterations: 1000,
// };

//  export default function() {
//      http.get("http://localhost:8000/api/reviews");
// }

// render 1000 users
// export let options = {
//     vus: 1000,
//     iterations: 1000,
// };

//  export default function() {
//      http.get("https://phill-in-the-blank.onrender.com/api/reviews");
// }

export let options = {
    vus:1000,
    iterations: 1000,
};

 export default function() {
     http.get("http://localhost:8000/api/reviews");
}
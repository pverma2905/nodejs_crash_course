const fs = require("fs");
const request = require("request");
const axios = require("axios");

//1-callback

// fs.readFile('./data.txt', 'utf-8', function (err, data) {
//     if (err) throw err
//     console.log(data);
//     fs.writeFile('./output.txt', `Data is modified ${data}`, function (err2) {
//         if (err2) throw err;
//         console.log('Data is saved in new file')
//         let url = 'https://jsonplaceholder.typicode.com/posts';
//         request(url, (error, response, body) => {
//             if (error) console.log(error)
//             const posts = JSON.parse(body);
//             console.log(posts)
//         });
//     });
// })

// 2-promise get by id

// const getSinglePost = (postId) => {
//     return new Promise((resolve, reject) => {
//         axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(res => {
//             const post = res.data;
//             console.log("mmmmmmmmmmmmm", post)
//             resolve(post);
//         }).catch((error) => {
//             reject(error)
//         })
//     })
// }
// getSinglePost(1)

// 2-promise get posts

// axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
//     return res.data
// }).then((response) => {
//     console.log(response)
// }).catch((error) => {
//     console.log("error", error)
// })


//async-await

// const singlePost = async (postId) => {
//     let response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
//     response = response.data
//     console.log(response)
// }
// singlePost(1)

// (() => singlePost(1))() // anonymous function

// (async () => {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
//     let posts = response.data
//     singlePost(posts[0].id)

// })()

//concurrent & parallel api call

async function getPost() {
    const post1 = axios.get('https://jsonplaceholder.typicode.com/posts/1');
    const post2 = axios.get('https://jsonplaceholder.typicode.com/posts/2');
    const post3 = axios.get('https://jsonplaceholder.typicode.com/posts/3');
    const [response1, response2, response3] = await Promise.all([post1, post2, post3]);
    const data1 = response1.data
    const data2 = response2.data
    const data3 = response3.data
    console.log(data1, data2, data3)
}

getPost();




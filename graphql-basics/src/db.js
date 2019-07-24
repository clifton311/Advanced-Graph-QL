// Scaler types - String, Boolean, Int (Whole Numbers), Float (numbers with decimals) , ID
let users = [
  {
    id: '1',
    name: 'Clifton',
    email: 'clifton@gmail.com',
    age: 30
  },
  {
    id: '2',
    name: 'Sarah',
    email: "email"
  },
  {
    id: '3',
    name: 'Blake',
    email: 'Blake@gmail.com'
  }
];

let posts = [
  {
    id: '101',
    title: "Book with Decker",
    body: "Working with decker",
    published: true,
    author: '1'
  },
  {
    id: '102',
    title: "Switch",
    body: "Book about switch places",
    published: true,
    author: '3'
  },
  {
    id: '103',
    title: "Tales of a Gutsy nince",
    body: "Jairay",
    published: false,
    author: '2'
  },
]

let comments = [
  {
    id: '4',
    text: "I am learning GraphQL",
    author: '1',
    post: '101'
  },
  {
    id: '2',
    text:"Man this is pretty hard!",
    author: '3',
    post:'102'
  },
  {
    id: '5',
    text: "I love watching Naruto des ne",
    author: '3',
    post:'102'
  },
  {
    id: '1',
    text:"I am hungry, I want some Burger King",
    author: '2',
    post:'103'
  },
]

const db = {
  users,
  posts,
  comments
}

export { db as default}
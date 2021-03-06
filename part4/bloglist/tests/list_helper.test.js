const listHelper = require('../utils/list_helper')

const blogs = [ 
  { 
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0, 
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])

    expect(result).toBe(0)
  })

  test('of singular blog is equal to the the likes of that blog', () => {
    const result = listHelper.totalLikes([
      { 
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      }
    ])

    expect(result).toBe(7)
  })

  test('of a bigger list is calculated correctly', () => {
    const result = listHelper.totalLikes(blogs)

    expect(result).toBe(26)
  })
})

describe('favorite blog', () => {

  test('with empty list returns empty object', () => {
    const result = listHelper.favoriteBlog([])

    expect(result).toEqual({})
  })

  test('with singular blog returns that blog', () => {
    const result = listHelper.favoriteBlog([
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      }
    ])

    expect(result).toEqual(
      {
        title: "Type wars",
        author: "Robert C. Martin",
        likes: 2,
      }
    )
  })

  test('with big list returns correct blog', () => {
    const result = listHelper.favoriteBlog(blogs)

    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
})

describe('most blogs', () => {

  test('with empty list returns empty object', () => {
    const result = listHelper.mostBlogs([])

    expect(result).toEqual({})
  })

  test('with singular blog returns the author of that blog', () => {
    const result = listHelper.mostBlogs([
      { 
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      }
    ])

    expect(result).toEqual({
      name: "Michael Chan",
      blogs: 1
    })
  })

  test('with big list returns correct blog', () => {
    const result = listHelper.mostBlogs(blogs)

    expect(result).toEqual({
      name: "Robert C. Martin",
      blogs: 2
    })
  })
})

describe('most likes', () => {

  test('with empty list returns empty object', () => {
    const result = listHelper.mostLikes([])

    expect(result).toEqual({})
  })

  test('with singular blog returns the author of that blog', () => {
    const result = listHelper.mostLikes([
      { 
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      }
    ])

    expect(result).toEqual({
      name: "Michael Chan",
      likes: 7
    })
  })

  test('with big list returns correct blog', () => {
    const result = listHelper.mostLikes(blogs)

    expect(result).toEqual({
      name: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})
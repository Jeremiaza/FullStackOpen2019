var _ = require('lodash');
const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let total = 0;
    blogs.forEach(element => {
        total += element.likes;
    });
    return total;
}

const favoriteBlog = (blogs) => {
    let blog;
    blogs.forEach(element => {
        blog = element;
        blogs.forEach(elementSecond => {
            if (blog.likes <= elementSecond.likes) {
                blog = elementSecond;
            }
        });
    });
    return blog;
}

const mostBlogs = (blogs) => {
    function countDuplicates(authors, authorObjects) {
        var current = null;
        for (var i = 0; i < authors.length; i++) {
            if (authors[i] != current) {
                current = authors[i];
            } else {
                authorObjects.forEach((element, index) => {
                    if (element.author === authors[i]) {
                        authorObjects[index].blogs++;
                    }
                });
            }
        }
        return authorObjects;
    }
    let authors = [];
    blogs.forEach(element => {
        authors.push(element.author);
    });
    let authorObjects = [];
    authors2 = _.uniq(authors);
    authors2.forEach(authorName => {
        authorObjects.push({ author: authorName, blogs: 1 });
    });
    return (countDuplicates(authors, authorObjects).sort((a, b) => (a.blogs < b.blogs) ? 1 : -1))[0]

}
const mostLikes = (blogs) => {
    const mostLikedAuthor = Object.entries(blogs.reduce((result, current) => {
        if (result[current.author]) {
            result[current.author] += current.likes;
        } else {
            result[current.author] = current.likes;
        }
        return result;
    }, {})).sort(([, totalLikesA], [, totalLikesB]) => totalLikesB - totalLikesA)[0]

    const mostLikedAuthorObject = {
        author: mostLikedAuthor[0],
        likes: mostLikedAuthor[1],
    }
    return mostLikedAuthorObject;
}
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
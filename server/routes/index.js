var express = require('express')
var router = express.Router()
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()

var article = require('../api/article'),
    comment = require('../api/comment'),
    user = require('../api/user')

router.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://vue2.mmxiaowu.com')
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization")
    res.header("Access-Control-Allow-Credentials", true)
    if (req.method === 'OPTIONS') {
        res.send(200)
    } else {
        next()
    }
})

// 首页
router.get('/', (req, res) => {
    res.render('index.html', { title: '首页' })
})

// 添加管理员
router.get('/admin', (req, res) => {
    res.render('admin.html', { title: '添加管理员', message: '' })
})
router.post('/admin', (req, res) => {
    user.insertUser(req, res)
})

router.get('*', (req, res) => {
    res.render('index.html', { title: '首页' })
})

// API
router.post('/api', multipartMiddleware, (req, res, next) => {
    var action = req.query.action || req.body.action
    var articleArray = ['getAdminArticle', 'getArticle', 'getArticleList', 'article', 'post', 'delete', 'recover', 'modify', ],
        commentArrat = ['postComment', 'comment'],
        userArray = ['login']
    if (userArray.indexOf(action) > -1) {
        user[action](req, res, next)
    } else if (articleArray.indexOf(action) > -1) {
        article[action](req, res, next)
    } else if (commentArrat.indexOf(action) > -1) {
        comment[action](req, res, next)
    } else {
        res.json({
            code: -200,
            message: '参数错误'
        })
    }
})

module.exports = router

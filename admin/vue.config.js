module.exports = {
    outputDir: __dirname + '/../server/admin/',//表示要输出的文件夹的路径
    publicPath: process.env.NODE_ENV === 'production'? '/admin/' : '/'
}
module.exports = function override (config, env) {
    console.log('override')
    let loaders = config.resolve
    loaders.fallback = {
        "stream": false,
        "util": false,
        "tty": false,
        "path": false,
    }

    return config
}
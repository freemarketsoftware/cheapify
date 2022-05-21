let db

function set(_db) {
    db = _db
}

function get() {
    return db
}

module.exports = {
    get,
    set
}
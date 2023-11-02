const obj = {
    id: 1,
    name: 'amit',
    phone: '1234567890',
    fullName: function (lastname) {
        return this.name + " " + lastname
    }
}

module.exports = obj;
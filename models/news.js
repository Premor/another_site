exports.id = 'news';
exports.version = '1.00';

exports.install = (options) => {};

exports.create = (news) => {
    // NoSQL embedded database
    NOSQL('news').insert(news);
};

exports.instant = () => {
    return {id: Utils.GUID(5), title: '', date: new Date(), body: ''}
}

exports.load = (callback) => {
    // NoSQL embedded database
    NOSQL('news').find().contains('id').callback(callback);
}


const Keys = require('./models/keyModel.js');

const fetchExpiredTokens = async () => {
    try {
        const expiredTokens = (await Keys.find({})).filter((key) => {
            const timeNow = new Date(Date.now()).getTime();
            const expireTime = new Date(key.expireAt).getTime();
            return timeNow >= expireTime;
        });
        return expiredTokens;
    } catch (err) {
        console.log('unable to fetch expired tokens, error : ' + err);
        return [];
    }
}

const fetchBlockedTokens = async () => {
    try {
        const unusedTokens = (await Keys.find({ isBlocked: true })).filter((key) => {
            const timeNow = new Date(Date.now()).getTime();
            const allowedTime = new Date(Date(key.createdAt) + (1000 * 60)).getTime(); // 1 minute
            return timeNow >= allowedTime;
        });
        return unusedTokens;
    } catch (err) {
        console.log('unable to fetch blocked tokens, error : ' + err);
        return [];
    }
}

const deleteBlockedTokens = async () => {
    try {
        const unusedTokens = await fetchBlockedTokens();
        if (unusedTokens.length === 0) return; 
        unusedTokens.forEach(async (token) => {
            const id = token._id;
            await Keys.deleteOne({_id: token._id});
            console.log('Token with id ' + id + ' was unused since 60 seconds and has been automatically deleted by the system');
        });
    }
    catch (err) {
        console.log('Unable to delete used token, error : ' + err);
    }
}

const deleteExpiredTokens = async () => {
    try {
        const expiredTokens = await fetchExpiredTokens();
        if (expiredTokens.length === 0) return;
        expiredTokens.forEach(async (token) => {
            await Keys.deleteOne({ _id: token._id });
            console.log('Token with id ' + token._id + ' has expired and has been deleted successfully!');
        });
    } catch (err) {
        console.log('Unable to delete expired tokens, error : ', err);
    }
}

module.exports = { deleteExpiredTokens, deleteBlockedTokens };

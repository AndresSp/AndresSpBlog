module.exports = ( mModel ) => {
    const { _id, __v, ...remaining } = mModel
    return {
        ...{ id: _id },
        ...remaining
    }
}
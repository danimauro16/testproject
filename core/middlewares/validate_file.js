const validateFile = (req, res, next) => {
    const expectedFileType = ['png', 'jpg', 'jpeg'];
    if(!req.files) {
        return res.status(500).json({ ok: false, 'msg': 'Image is required'});
    }

    const fileExtension = req.files.img.mimetype.split('/').pop();
    if (!expectedFileType.includes(fileExtension)) {
        return res.status(500).json({ ok: false, 'msg': 'Image is not valid'});
    }
    next();
}

module.exports = {
    validateFile
}
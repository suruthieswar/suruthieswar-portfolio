module.exports = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Pong! API directory is reachable.",
        method: req.method,
        time: new Date().toISOString()
    });
};

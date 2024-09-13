export default function(err, req, res, next) {
  // Error handling logic
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
};